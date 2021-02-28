import React,{Component, Fragment} from 'react';
import '../../css/redact.css'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import {getCookie} from '../../js/cookie'
class Redact extends Component{
    constructor(props){
        super(props);
        this.state={
            
            flag:true,
            data:null,
            jump:false
        }
    }
    componentDidMount(){
        if(this.state.flag){// 第一次获取数据
            this.setState({flag:false});
            // localStorage.removeItem('id');
            this.getdata();
        }
        
        
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
    getdata(){
        $.ajax({
            url:'../../background-app/src/api/redactGet.php',
            type:'get',
            data:{
                goods_id:localStorage.getItem('id')
            },
            dataType:'json',
            success:(res)=>{
                if(res.code){
                    this.setState({
                        data:res.data
                    });
                    let dom = document.querySelector('.product_redact .detail');
                    dom.innerHTML=`<p>商品详情</p>${this.state.data.goods_introduce}`;
                    
                }else{
                    console.log(res.data,res.code);
                }
            },
            error:function (err) {
                
                console.log(err);
            }
        })
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
            [...array].forEach((item)=>{
                arr.push(item.value)
            })

            $.ajax({
                url:'../../background-app/src/api/redactPost.php',
                type:'post',
                data:{
                    arr,
                    id:localStorage.getItem('id')
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
            alert('你还不是root用户！')
        }
        

    }
    render(){
        
        return(
            <Fragment>
                <h3>编辑商品</h3>
                <div className="product_redact">
                    
                    
                    <p>
                        <label htmlFor="goods_name">商品名称</label>
                        <input type="text" name="goods_name" id="" defaultValue={this.state.data?this.state.data.goods_name:''}/>
                    </p>
                    <p>
                        <label htmlFor="">图片地址</label>
                        <input type="text" defaultValue={this.state.data?this.state.data.goods_big_logo:''} style={{width:'8rem'}}/>
                        <img src={this.state.data?this.state.data.goods_big_logo:''} alt="" style={{width:'3rem',height:'3rem'}}/>
                    </p>
                    <p>
                        <label htmlFor="goods_price">商品价格</label>
                        <input type="number" name="goods_pricer" id="" defaultValue={this.state.data?this.state.data.goods_price:''}/>
                        <label htmlFor="">元</label>
                    </p>
                    <p>
                        <label htmlFor="goods_number">商品数量</label>
                        <input type="number" name="goods_number" id="" defaultValue={this.state.data?this.state.data.goods_number:''}/>
                    </p>
                    <p>
                        <label htmlFor="cat">商品分类</label>
                        <input type="text" placeholder='一级分类' defaultValue={this.state.data?this.state.data.cat_one_id:''}/>
                        <input type="text" placeholder='二级分类' defaultValue={this.state.data?this.state.data.cat_two_id:''}/>
                        <input type="text" placeholder='三级分类' defaultValue={this.state.data?this.state.data.cat_three_id:''}/>
                    </p>
                    <p>详情结构</p>
                    <p>
                    <textarea name="" id="" cols="100" rows="13"      defaultValue={this.state.data?this.state.data.  goods_introduce:''}></textarea>
                    </p>
                    <p style={{textAlign:'center',marginBottom:'20px'}}><button className='btn' onClick={()=>this.postData()}>{this.typeHtml()}</button></p>
                    <div className='detail'>
                        
                    </div>
                </div>
            </Fragment>
            
            
            
        )
    }
}
export default Redact;