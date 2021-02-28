import React,{Component, Fragment} from 'react';
import '../../css/user1.css'
import Pagination from '../../pagination/index'
import $ from 'jquery'
import {getCookie} from '../../js/cookie.js'
class User1 extends Component{
    constructor(props){
        super(props);
        this.state={
            current:1,
            length:5,
            total:0,
            list:[],
            isTrue:true

        }
    }
    componentDidMount(){
        
        if(!this.state.total){
            this.getdata();
        }
        
    }
    componentWillReceiveProps(){
        this.setState({
            isTrue:false
        })
    }
    
    onClickAll(e){
        if(e.target.classList=='btn1'){
            if(getCookie('grade')!='root'){
                alert('你还不是root用户！')
                return
            }
            let id = e.target.getAttribute('index');
            this.delete(id)
            return
        }
        if(e.target.classList=='btn2'){
            if(getCookie('grade')!='root'){
                alert('你还不是root用户！')
                return
            }
            if($(e.target).parent().prev().text()=='root'){
                alert('已经是root用户！');
                return
            }
            
            let id = e.target.getAttribute('index');
            this.promote(id)
            return
        }
    }
    delete(id){
        $.ajax({
            url:'../../background-app/src/api/deleteUser1.php',
            type:'get',
            data:{
                id
            },
            dataType:'json',
            success:(res)=>{
                this.getdata();
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    promote(id){
        $.ajax({
            url:'../../background-app/src/api/promoteUser1.php',
            type:'get',
            data:{
                id
            },
            dataType:'json',
            success:(res)=>{
                this.getdata();
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    getdata(page){
        
        $.ajax({
            url:'../../background-app/src/api/getUser1.php',
            type:'get',
            data:{
                current: page||this.state.current,
                length:this.state.length
            },
            dataType:'json',
            success:(res)=>{
                this.setState({total:res.total,list:res.list,current:page||1}) ;
                let tbody = document.querySelector('.user1_tbody');
                let str = '';
                this.state.list.forEach((item,index)=>{
                    str += `
                                <tr key=${item.id}>
                                <td>${item.userName}</td>
                                <td>${item.email}</td>
                                <td class='user1_grade'>${item.grade}</td>
                                <td>
                                    <button index=${item.id} class='btn1'>删除用户</button>
                                    <button index=${item.id} class='btn2'>提高等级</button>
                                </td>
                        </tr>
                    `
                })
                tbody.innerHTML = str
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    render(){
        let tbody = this.state.list.map(item=>{
            <tr key={item.id}>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.grade}</td>
                    <td>
                        <button>删除用户</button><button>提高等级</button>
                    </td>
                </tr>
        })
        
        return(
            <div className='user1' onClick={(e)=>this.onClickAll(e)}>
                <table className='user1_table'>
                    <thead>
                        <tr>
                            <th>用户名</th>
                            <th>邮箱</th>
                            <th>权限</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody className='user1_tbody'>
                        {this.state.isTrue?
                            <tr>
                                <td colSpan={3}>加载中...</td>
			                </tr>
                            :
                            <tr>
                                <td colSpan={3}>没有找到相应的结果！</td>
			                </tr>
                        }
                    </tbody>
                </table>
                <div className='user1_paginaton'>
                    <Pagination 
                        current={ this.state.current } 
                        total={this.state.total}
                        pageSize={this.state.length}
                        onChange={ page => {
                            const domY = document.querySelector('#container .right');
                            
                            this.getdata(page);
                            
                            domY.scrollTo(0,0)
                            
                        }} />
                </div>
            </div>
        )
    }
}
export default User1;