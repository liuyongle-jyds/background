import React,{Component, Fragment} from 'react';
import '../css/layout.css'
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { setCookie } from '../js/cookie';
class Layout extends Component{
    constructor(props){
        super(props);

    }
    removeCookie(){
        setCookie('login','');
        setCookie('grade','');
    }
    render(){
        return(
            <Fragment>
                <div id="header">
                    <div className="left">
                        <a href="/" className='clear_fix'>
                            <img src="../background-app/src/images/logo.png" alt=""/>
                            <p>小白电商后台系统</p>
                        </a>
                    </div>
                    <div className="right">
                        <a href='/' onClick={()=>this.removeCookie()} title='退出登录'>欢迎登陆---{this.props.login}！</a>
                    </div>
                </div>
                <div id="container">
                    <div className="nav">
                        <ul className="box">
                            <li><Link to="/">首页</Link></li>
                           
                            <p>商品</p>
                            <ul>
                                <li><Link to="/product">商品管理</Link></li>
                                <li><Link to="/">二级菜单</Link></li>
                            </ul>

                            <p>订单</p>
                            <ul>
                                <li><Link to="/order">订单管理</Link></li>
                                <li><Link to="/">二级</Link></li>
                            </ul>
                            <p>用户</p>
                            <ul>
                                <li><Link to="/user/user1">用户管理</Link></li>
                                <li><Link to="/user/user2">用户申请</Link></li>
                            </ul>
                            
                        </ul>
                    </div>
                    <div className="right">
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        )
    }
}
$(function(){
    $('#container .nav .box p').click(function(){
        $(this).next().slideToggle().siblings('ul').slideUp();
    })
    $('#container .nav .box a').click(function(){
        $('#container .nav .box a').removeClass('active');
        $(this).toggleClass('active');
    })
})
export default Layout;