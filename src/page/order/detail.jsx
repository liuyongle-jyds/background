import React,{Component,Fragment}from 'react';
import $ from 'jquery'
import DetailList from './detailList'
import '../../css/detail.css'
class Detail extends Component {
	constructor (props) {
		super(props);
        this.state={
            parameter:JSON.parse(localStorage.getItem('data'))||[],
            data:[],
            isTrue:true
        }
		
	}
	componentDidMount(){
        if(this.state.isTrue){
            this.getData();
            this.setState({
                isTrue:false
            })
        }
    }
    getData(){
        let arr = [];
        this.state.parameter.forEach(item=>{
            arr.push(item.goods_id)
        })
        let str = arr.join(',');
        str = `(${str})`;
        $.ajax({
            url:'../background-app/src/api/detailGet.php',
            type:'get',
            data:{
                str
            },
            dataType:'json',
            success:(res)=>{
                this.setState({
                    data:res.data
                })
                console.log(res.data);

            },
            error:function(err){
                console.log(err);
                
            },
            timeout:3000
        
        })
    }
	render () {
		let bodyHtml = (
            this.state.data.map((item,index)=>{
                return <Fragment key={index}>
                            <dl className='clear_fix'>
                                <dt>
                                    <img src={item.goods_small_logo} alt=""/>
                                </dt>
                                <dd>
                                    <p>
                                        商品：{item.goods_name}
                                    </p>
                                    <p>
                                        单价：{item.goods_price}￥
                                    </p>
                                    <p>
                                        数量：{this.state.parameter[index].num}
                                    </p>
                                    <p>
                                        库存：{(item.goods_number)*1>=(this.state.parameter[index].num)*1?'有货,余量'+item.goods_number:'库存不足,余量'+item.goods_number}
                                    </p>
                                    <p>
                                        总价：{((this.state.parameter[index].num)*(item.goods_price)).toFixed(2)}￥
                                    </p>
                                </dd>
                                
                            </dl>
                         </Fragment>
            })
        )
		return (
            <Fragment>
                <h3>订单详情</h3>
                <div className='product_redact clear_fix'>
                    <DetailList>
                        {bodyHtml}
                    </DetailList>
                </div>
            </Fragment>					
		);
	}
}

export default Detail;