import React,{Component, Fragment} from 'react';
import $ from 'jquery'
import {Link} from 'react-router-dom'
import { getCookie } from '../../js/cookie';
class Add extends Component{
    constructor(props){
        super(props);
        this.state={
            jump:false
        }
    }
    componentDidMount(){
         
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return
      }
      }
    componentDidUpdate(){
        if(this.state.jump){
            document.querySelector('.product_redact .btn a').click();
        }
        
    }
    
    typeHtml(){
        if(this.state.jump){
            return <Link to='../product'>提交</Link>
        }else{
            return <Fragment>提交</Fragment>
        }
        
    }
    postData(){
        if(getCookie('grade')=='root'){
            let array = document.querySelectorAll('.product_redact input,.product_redact textarea');
            let arr = [];
            let flag = true;
            [...array].forEach((item,index)=>{
                arr.push("'"+item.value+"'");
                if((!item.value)&&item.value==0){
                    flag = false;
                }
            })
            if(flag){
                let text = arr.join(',');
                let str = `${text},${new Date().getTime()},${new Date().getTime()}`//add_time和upd_time
                $.ajax({
                    url:'../../background-app/src/api/add.php',
                    type:'post',
                    data:{
                        str
                    },
                    dataType:'json',
                    success:(res)=>{
                        if(res.code){
                            this.setState({
                                jump:true
                            });
                            
                        }else{
                            console.log(res.code);
                        }
                    },
                    error:function (err) {
                        
                        console.log(err);
                    }
                })
            }else{
                alert('请输入完整信息！')
            }
            
        }else{
            alert('你还不是root用户！')
        }
        

    }
    render(){
        
        return(
            <Fragment>
                <h3>添加商品</h3>
                <div className="product_redact">
                    
                    
                    <p>
                        <label htmlFor="goods_name">商品名称</label>
                        <input type="text" name="goods_name" id=""/>
                    </p>
                    <p>
                        <label htmlFor="">图片地址</label>
                        <input type="text" style={{width:'8rem'}}/>
                        
                    </p>
                    <p>
                        <label htmlFor="goods_price">商品价格</label>
                        <input type="number" name="goods_pricer" id=""/>
                        <label htmlFor="">元</label>
                    </p>
                    <p>
                        <label htmlFor="goods_number">商品数量</label>
                        <input type="number" name="goods_number" id=""/>
                    </p>
                    <p>
                        <label htmlFor="cat">商品分类</label>
                        <input type="text" placeholder='一级分类' />
                        <input type="text" placeholder='二级分类' />
                        <input type="text" placeholder='三级分类'/>
                    </p>
                    <p>详情结构</p>
                    <p>
                    <textarea name="" id="" cols="100" rows="13"></textarea>
                    </p>
                    <p style={{textAlign:'center',marginBottom:'20px'}}><button className='btn' onClick={()=>this.postData()}>{this.typeHtml()}</button></p>
                    
                </div>
            </Fragment>
            
            
            
        )
    }
}
export default Add;