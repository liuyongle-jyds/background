import React,{Component,Fragment}from 'react';
import $ from 'jquery'
class TableList1 extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isFirstLoad: true
		}
	}
	componentWillReceiveProps () {
		// 列表只有在第一次加载的时候isFirstLoad为true -> 表示正在加载，其他为false
		this.setState({
			isFirstLoad: false
		})
	}
    
	render () {
		// 表头信息
		let tableHeader = (			
			<tr>
                <th>订单号</th>
                <th>买家</th>
                <th>总价</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
		);
		let listBody = this.props.children;

		// 列表加载信息
		let listInfo = (
			<tr>
				<td colSpan={6} >
					{ this.state.isFirstLoad ? '正在加载...' : '没有找到相应的结果！' }
				</td>
			</tr>
		);
		
		return (
			<Fragment>
			
				<thead>{ tableHeader }</thead>
				<tbody>
					{
						listBody.length ? listBody : listInfo
					}
				</tbody>
										
			</Fragment>						
		);
	}
}

export default TableList1;