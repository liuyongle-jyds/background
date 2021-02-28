import React,{Component} from 'react'
import '../../css/login.css'
import $ from 'jquery'
import {setCookie,getCookie} from '../../js/cookie'
import { Link } from 'react-router-dom';
class Login extends Component{//登录模块
    
    onSubmit(e){
        
        let userName = document.querySelector("#userName");
        let password = document.querySelector("#password");
        if(!(userName.value&&password.value)){
            alert("请输入完整信息！");
            return
        }
        $.ajax({
            
            url:'background-app/src/api/login.php',
            type:'post',
            data:{
                userName:userName.value,
                password:password.value
            },
            dataType:'json',
            success:(res)=>{
                if(res.code){//1,登录成功
                    setCookie('login',userName.value);
                    setCookie('grade',res.grade)
                    
                }else{
                    
                    alert('用户名或密码错误！');
                    
                }
            },
            error:function(err){
                alert(err);
                console.log(err);
            },
            timeout:3000

        })
        alert('确认登录')
    }
    
    
    render(){
        
        return(
            <form action="" className='login_box'>
                <p>小白电商后台登录</p>
                <p>
                    <label htmlFor="userName">用户名</label>
                    <input type="text" id='userName'/>
                </p>
                <p>
                    <label htmlFor="password">密 码</label> 
                    <input type="text" id='password'/>
                </p>
                <p>
                    <button id='btn1' onClick={(e)=>this.onSubmit(e)}>
                        登录
                    </button>
                    <button><Link to='register'>注册</Link></button>
                </p>
            </form>
        )
    }
}
export default Login;