import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {getCookie} from './js/cookie.js'
import Login from './page/login/login.jsx'
import './css/common.css'
import Home from './page/home/home'
import User1 from './page/user/user1'
import User2 from './page/user/user2'
import Redact from './page/product/redact'
import Add from './page/product/add'
import Order from './page/order/order'
import Detail from './page/order/detail'
import ProductControl from './page/product/productControl'
import Layout from './component/layout.jsx'
import Register from './page/login/register'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

class Root extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        
        if(getCookie('login')){
            return(
                
                <Router>
                    <Layout  login={getCookie('login')}>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            
                            <Route path='/user/user1' component={User1}/>
                            <Route path='/user/user2' component={User2}/>
                            <Route path='/product/redact' component={Redact}/>
                            <Route path='/product/add' component={Add}/>
                            <Route path='/product' component={ProductControl}/>
                            <Route path='/order/detail' component={Detail}/>
                            <Route path='/order' component={Order}/>
                        </Switch>
                    </Layout>
                </Router>
                
                
            )
        }else{
            
            return(
                <Router>
                    
                        <Switch>
                            <Route path='/register'  render={(props) => <Register {...props} />}/>
                            <Login></Login>
                            
                        </Switch>
                    
                </Router>
                
            )
        }    
    }
}
ReactDOM.render(
    <Root/>,
    document.getElementById('root')
)