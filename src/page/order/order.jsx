import React,{Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery'
import Pagination 	from '../../pagination/index';
import TableList from './tableList1'
import '../../css/order.css'

import {getCookie} from '../../js/cookie.js'
class Order extends Component{
    constructor(props){
        super(props);
        this.state={
            current:1,
            length:5,
            total:0,
            list:[],
            seach:false,
            key:null,
            check:''
        }
    }
    
    componentDidMount(){
        if(!this.state.total){
            // 第一次获取数据
            this.getdata();
        }
        
    }
    
    getdata(page){
        
        $.ajax({
            url:'../background-app/src/api/orderGet.php',
            type:'get',
            data:{
                current: page||this.state.current,
                length:this.state.length
            },
            dataType:'json',
            success:(res)=>{
                this.setState({total:res.total,list:res.list,current:page||1}) ;
                
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    
    
    seachAjax(page,value,check){
        $.ajax({
            url:'../background-app/src/api/orderSeach.php',
            type:'get',
            data:{
                current: page||this.state.current,
                length:this.state.length,
                key:value,
                check
            },
            dataType:'json',
            success:(res)=>{
                this.setState({total:res.total,list:res.list,current:page||1,seach:true,key:res.key,check:res.check}) ;
                console.log(res.list,res.total);
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    jumpTo(){
        if(getCookie('grade')=='root'){
            return <Fragment>
                        <Link to='order/detail'>订单详情</Link>
                    </Fragment>
                
                    
        }else{
            return <Fragment>
                        订单详情
                    </Fragment>
        }

    }
    
    
    setData(res){
        
        if(getCookie('grade')=='root'){
            localStorage.setItem('data',res);
        }else{
            alert('你还不是root用户！');
        }
        
    }
    seachData(){
        
            let text = document.querySelector('#container .right .seachList input');
            
            if(text.value){
                if(/\D/.test(text.value)){//按关键字查询
                    this.seachAjax(1,text.value,'word');
                }else{//按id查询
                    this.seachAjax(1,text.value*1,'id');
                }
            }
        
        
    }
    shipments(id,state){
        if(!(getCookie('grade')=='root')){
            alert('你还不是root用户！')
            return
        }
        if(state==2){
            alert('已发货！');
            return
        }
        $.ajax({
            url:'../background-app/src/api/shipments.php',
            type:'get',
            data:{
                id
            },
            dataType:'json',
            success:(res)=>{
                if(this.state.seach){
                    this.seachAjax(this.state.current,this.state.key,this.state.check)
                }else{
                    this.getdata(this.state.current);
                }
                alert('已发货！');
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    delete(id){
        if(!(getCookie('grade')=='root')){
            alert('你还不是root用户！')
            return
        }
        
        $.ajax({
            url:'../background-app/src/api/orderDelete.php',
            type:'get',
            data:{
                id
            },
            dataType:'json',
            success:(res)=>{
                if(this.state.seach){
                    this.seachAjax(this.state.current,this.state.key,this.state.check)
                }else{
                    this.getdata(this.state.current);
                }
                alert('已删除！');
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    render(){
        let tbody = (
            this.state.list.map((item,index)=>(
                <tr key={item.id}>
                    
                    <td>{item.order_id}</td>
                    <td>{item.name}</td>
                    <td>{item.total_price}</td>
                    <td>{item.order_time}</td>
                    <td>{item.state==2?'已发货':'待发货'}</td>
                    <td className='order_td'>
                        <button onClick={()=>this.setData(item.data)}>
                            {this.jumpTo()}
                        </button>
                        <button onClick={()=>this.shipments(item.id,item.state)}>发货</button>
                        <button onClick={()=>this.delete(item.id)}>删除</button>
                        
                    </td>
                </tr>
            ))
        )
        
        return(
            <Fragment>
                <div className='seachList'>
                    <input type="text" placeholder='输入关键字或id'/>
                    <button onClick={()=>this.seachData()}>查 询</button>
                </div>
                <table className='product_list'>
                    <TableList>
                        { tbody }
                    </TableList>
                </table>
                <div className='ProductControl_paginaton'>
                    <Pagination 
                        current={ this.state.current } 
                        total={this.state.total}
                        pageSize={this.state.length}
                        onChange={ page => {
                            const domY = document.querySelector('#container .right');
                            if(this.state.seach){
                                this.seachAjax(page,this.state.key,this.state.check)
                            }else{
                                this.getdata(page);
                            }
                            
                            domY.scrollTo(0,0)
                            
                        }} />
                </div>
            </Fragment>
            
        )
    }
}

export default Order;