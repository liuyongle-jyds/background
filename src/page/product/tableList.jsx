import React,{Component,Fragment}from 'react';
import $ from 'jquery'
class TableList extends Component {
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
    selectAll(e){
        if(e.target.checked){
            $(e.target).addClass('selectAll');
            $('.product_list tbody input').prop('checked',true);
        }else{
            $(e.target).removeClass('selectAll');
            $('.product_list tbody input').prop('checked',false);
        }

    }
	render () {
		// 表头信息
		let tableHeader = (			
			<tr>
                <th><input type="checkbox" onClick={(e)=>this.selectAll(e)}/></th>
                <th>id</th>
                <th>名称</th>
                <th>数量</th>
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

export default TableList;