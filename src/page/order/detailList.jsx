import React,{Component,Fragment}from 'react';
class DetailList extends Component {
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
	
		let listBody = this.props.children;

		
		let listInfo = (
			<p>
				
				{ this.state.isFirstLoad ? '正在加载...' : '没有找到相应的结果！' }
				
			</p>
		);
		
		return (
			<Fragment>
				{
					listBody.length ? listBody : listInfo
				}					
			</Fragment>						
		);
	}
}

export default DetailList;