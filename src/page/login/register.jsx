import React,{Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import classnames from 'classnames'
import '../../css/register.css'
class Register extends Component {
    // 在构造函数当中设置状态
    constructor(props){
      super(props)
      this.state ={
        userName : '',
        password:'',
        email:'',
        errors:{},//用户不合法信息提示
        flag:false
      }
    }
    onChangeInp(e){
        //e.target.name代表你当前输入Input框对应的Name,如email,password
      // e.target.value 代表当前输入的值
      this.setState({
        [e.target.name] : e.target.value
      });

      
    }
    componentDidUpdate(){
        if(this.state.userName&&this.state.password&&this.state.email&&$('.register form .error').length==0){
            $('.register form .post button').addClass('active')
        }else{
            $('.register form .post button').removeClass('active')
        }
        
    }
    onBlurInp(e){
        switch(e.target.name){
            case 'userName':
                let reg = /^[a-z0-9_\-\u4e00-\u9fa5]+$/i;
                if(!reg.test(e.target.value)){
                    let errors = this.state.errors;
                    if(e.target.value){
                        errors.userName = '只能填写数字、字母、_、-和中文'
                    }else{
                        errors.userName = '这是必填项'
                    }
                    
                    this.setState({
                        errors
                    })
                    return
                }
                $.ajax({
            
                    url:'../background-app/src/api/register.php',
                    type:'post',
                    data:{
                        userName:this.state.userName,
                        
                    },
                    dataType:'json',
                    success:(res)=>{
                        if(res.code){
                            let errors = this.state.errors;
                            errors.userName = ''
                            this.setState({
                                errors
                            })
                        }else{
                            let errors = this.state.errors;
                            errors.userName = '用户名已存在！'
                            this.setState({
                                errors
                            })
                        }
                        
                    },
                    error:(err)=>{
                        console.log(err);
                        
                    },
                    timeout:3000
        
                })
                
                break
            case 'password':
                let reg1  = /^\w{8,14}$/;
                if(!reg1.test(e.target.value)){
                    let errors = this.state.errors;
                    if(e.target.value){
                        errors.password = '只能填写数字字母下划线，8-14位'
                    }else{
                        errors.password = '这是必填项'
                    }
                    
                    this.setState({
                        errors
                    })
                    return
                }
                let errors1 = this.state.errors;
                errors1.password = ''
                this.setState({
                    errors:errors1
                });
                break
                
            case 'email':
                let reg2  = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(!reg2.test(e.target.value)){
                    let errors = this.state.errors;
                    if(e.target.value){
                        errors.email = '邮箱格式错误'
                    }else{
                        errors.email = '这是必填项'
                    }
                    
                    this.setState({
                        errors
                    })
                    return
                }
                let errors2 = this.state.errors;
                errors2.email = ''
                this.setState({
                    errors:errors2
                })
                break
                
        }
    }
    //提交对应的内容
    onSubmit(e){
        e.preventDefault()
        if(!$('.register form .post button').hasClass('active')){
            return
        }
     
      // 发送请求
      $.ajax({
            
            url:'background-app/src/api/registerPost.php',
            type:'post',
            data:{
                userName:this.state.userName,
                password:this.state.password,
                email:this.state.email
            },
            dataType:'json',
            success:(res)=>{
                this.setState({
                    userName:'',
                    password:'',
                    email:''
                })
                alert('提交数据成功,等待管理员审核！')
            },
            error:function(err){
                console.log(err);
            },
            timeout:3000

        })
      
    } 
    render() {
   // 解构出errors信息
      const {errors} = this.state;
      
  return (
       <div className="register">
           <p>已有账号，去<Link to='/'>登录</Link></p>
           <form onSubmit={(e)=>this.onSubmit(e)}>

               <p>
                   <label htmlFor="userName">用户名</label>
                   <input type="text" 
                        className={classnames("",{ 'is-invalid':errors.userName })}
                        name="userName"
                        value={this.state.userName}
                        onChange={(e)=>this.onChangeInp(e)}
                        onBlur={(e)=>this.onBlurInp(e)}
                   />
                   { errors.userName && ( <i className="error">{errors.userName} </i>)}
               </p>
               <p>
                   <label htmlFor="password">密 码</label>
                   <input type="text" 
                        className={classnames("",{ 'is-invalid':errors.password })}
                        name="password"
                        value={this.state.password}
                        onChange={(e)=>this.onChangeInp(e)}
                        onBlur={(e)=>this.onBlurInp(e)}
                   />
                   { errors.password && ( <i className="error">{errors.password} </i>)}
               </p>
               <p>
                   <label htmlFor="email">邮 箱</label>
                   <input type="text" 
                        className={classnames("",{ 'is-invalid':errors.password })}
                        name="email"
                        value={this.state.email}
                        onChange={(e)=>this.onChangeInp(e)}
                        onBlur={(e)=>this.onBlurInp(e)}
                   />
                   { errors.email && ( <i className="error">{errors.email} </i>)}
               </p>
                
                
                <p className='post'><button>注册</button></p>

                
                
       </form>
   </div>
   )
    }
}
export default Register;