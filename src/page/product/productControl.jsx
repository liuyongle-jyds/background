import React,{Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery'
import Pagination 	from '../../pagination/index';
import TableList from './tableList'
import '../../css/ProductControl.css'
import {getCookie} from '../../js/cookie.js'
class ProductControl extends Component{
    constructor(props){
        super(props);
        this.state={
            current:1,
            length:15,
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
    checkIn(){
        let inp = (document.querySelectorAll('.product_list tbody input'));
        let arr = [...inp];
        let res = arr.every((item)=>{
            return item.checked == true
        });
        let all =  document.querySelector('.product_list td, .product_list thead input');
        all.checked = res;
        if(res){
            all.classList.add('selectAll');
        }else{
            all.classList.remove('selectAll');
        }

        
    }
    getdata(page){
        
        $.ajax({
            url:'../background-app/src/api/getdata.php',
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
    
    
    changeState(demo,num){
        if(getCookie('grade')=='root'){
            
            if($('.product_list .selectAll').length){
                //全部上下架
                if(!this.state.seach){
                    this.changeAjax(demo,num,'all');
                }else{
                    let arr = [];
                    this.state.list.forEach(function(item){
                        arr.push(item.goods_id)
                    })
                    let str = arr.join(',');
                    str = `(${str})`;
                    this.changeAjax('seach',num,str);
                }
                
            }else{
                
                    let arr = [];
                    $('.product_list tbody input').each(function(index,item){
                        if($(this).prop('checked')){
                            arr.push($(this).attr('index'));
                        }
                    })
                    let str = arr.join(',');
                    str = `(${str})`;
                    this.changeAjax(str,num);
                
                
            }
            $('.product_list input').prop("checked",false).removeClass('selectAll')
        }else{
            alert('你还不是root用户！')
        }
        
    }
    
    changeAjax(demo,num,flag){
        $.ajax({
            url:'../background-app/src/api/changeState.php',
            type:'get',
            data:{
                demo,
                num,
                flag:flag||''
            },
            dataType:'json',
            success:(res)=>{
                if(res.code){
                    
                    if(this.state.seach){
                        this.seachAjax(this.state.current,this.state.key,this.state.check)
                    }else{
                        
                        this.getdata(this.state.current);

                    }
                    alert('已完成！')
                }
                
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        })
    }
    seachAjax(page,value,check){
        $.ajax({
            url:'../background-app/src/api/seachData.php',
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
                
            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
    jumpTo(){
        if(getCookie('grade')=='root'){
            return <Link to='/product/redact'>编辑/查看</Link>
        }else{
            return <Fragment>编辑/查看</Fragment>
        }

    }
    jumpToA(){
        if(getCookie('grade')=='root'){
            return <Link to='/product/add'>添加商品</Link>
        }else{
            return <Fragment>添加商品</Fragment>
        }
    }
    clickAdd(){
        if(getCookie('grade')=='visitor'){
            alert('你还不是root用户！');
        }
    }
    setId(res){
        if(getCookie('grade')=='root'){
            localStorage.setItem('id',res);
        }else{
            alert('你还不是root用户！');
        }
        
    }
    seachData(){
            $('.product_list input').prop("checked",false).removeClass('selectAll')
            let text = document.querySelector('#container .right .seachList input');
            
            if(text.value){
                if(/\D/.test(text.value)){//按关键字查询
                    this.seachAjax(1,text.value,'word');
                }else{//按id查询
                    this.seachAjax(1,text.value*1,'id');
                }
            }
        
        
    }
    render(){
        let tbody = (
            this.state.list.map((item)=>(
                <tr key={item.goods_id}>
                    <td><input onClick={()=>this.checkIn()} index={item.goods_id} type="checkbox"/></td>
                    <td>{item.goods_id}</td>
                    <td>{item.goods_name}</td>
                    <td>{item.goods_number}</td>
                    <td>{item.goods_state==2?'在售':'已下架'}</td>
                    <td onClick={()=>this.setId(item.goods_id)}>{this.jumpTo()}</td>
                </tr>
            ))
        )
        
        return(
            <Fragment>
                <div className='seachList'>
                    <input type="text" placeholder='输入关键字或id'/>
                    <button onClick={()=>this.seachData()}>查 询</button>
                    <button onClick={()=>this.changeState('allin',2)}>上 架</button>
                    <button onClick={()=>this.changeState('allout',0)}>下 架</button>
                    <button onClick={()=>this.clickAdd()}>{this.jumpToA()}</button>
                    <button onClick={()=>this.changeState('','del')}>删 除</button>
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
                            if($('.product_list .selectAll')){
                                $('.product_list .selectAll').prop('checked',false).removeClass('selectAll')
                            }
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

export default ProductControl;