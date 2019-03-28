import React from 'react'
import { BrowserRouter, Router, Route, Link, Switch } from 'react-router-dom'


class TodoApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			// 陣列
			// 預設的tag設定為空值
			text: ""
		};

		// bind + this 確保會執行，如果沒綁定會出現undefined
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.markItemCompleted = this.markItemCompleted.bind(this);
		this.handleDeleteItem = this.handleDeleteItem.bind(this);	
	}


	handleTextChange(event) {
		this.setState({
			text: event.target.value
		});
	}

	handleAddItem(event) {
		event.preventDefault();

		var newItem = {
			id: Date.now(),
			text: this.state.text,
			done: false
			// 預設都是false未完成
		};

		this.setState((prevState) => ({
			items: prevState.items.concat(newItem),
			text: ""
		}));
	}

	markItemCompleted(itemId) {
		var updatedItems = this.state.items.map(item =>{
			if (itemId === item.id)
				item.done = !item.done;

			return item;
		});

		// State Updates are Merged
		this.setState({
			items: [].concat(updatedItems)
		});
	}


	handleDeleteItem(itemId) {
		var updatedItems = this.state.items.filter(item => {
			return item.id !== itemId;
		});

		this.setState({
			items: [].concat(updatedItems)
		});
	}

	render() {
		
		return (
			<div>
				<h3>我的待辦事項</h3>
				<div>
					<div>
						<TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
					</div>
				</div>
				<form>
					<div>
						<input type="text" className="" onChange={this.handleTextChange} value={this.state.text} />
					</div>
					<div>
						<button onClick={this.handleAddItem}>{"新增待辦事項 +"}</button>
					</div>
				</form>

						<div>
							<ul>
								<li>
									<Link to="/">All</Link>
								</li>
								<li>
									<Link to="/complete">Complete</Link>
								</li>
								<li>
									<Link to="/incomplete">Incomplete</Link>
								</li>
							</ul>
							{/* <Switch> */}
							{/* onItemCompleted={} */}
								<Route exact path='/' render={()=><TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem}/>}></Route>
								<Route  path='/complete' render={()=><Complete items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem}/>}></Route>
								{/* <Route path='/incomplete' component={Incomplete}></Route> */}
							{/* </Switch> */}
						</div>
					
			</div>
		);
	}
}

// 單一 li item物件
class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.markCompleted = this.markCompleted.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	markCompleted(event) {
		this.props.onItemCompleted(this.props.id);
	}
	deleteItem(event) {
		this.props.onDeleteItem(this.props.id);
	}

	render() {
		// console.log(this.props.completed);
		// 上面這會顯示true or false
		var itemClass="to_do_list_li ";
		if(this.props.completed){
			itemClass += "done";
		}else{
			itemClass += "undone";
		}
		// 這裡可以改寫成下面這樣	
		// var itemClass = "to_do_list_li " + (this.props.completed ? "done" : "undone");
		// if判斷狀況：condition ? value-if-true : value-if-false
		
		return (
			<li className={itemClass} ref={li => this._listItem = li}>
				<label>
					<input type="checkbox" onChange={this.markCompleted} /> {this.props.text}
				</label>
				<button type="button" className="" onClick={this.deleteItem}>x</button>
			</li>
		);
	}
}


class TodoList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {		
		return (
			<ul className="list_show">
					{console.log('嗨你有看到我嗎',this.props.items)}
					{this.props.items.map(item => (
					<TodoItem id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
					))}
				</ul>				
		);
	}
}


class Complete extends React.Component {
	constructor(props) {
		super(props);
	}
		render() {
			{console.log('all item',this.props.items)}
			{console.log('hello',this.props.items[1].done)}
			{console.log('array',this.props.items.length)}

			// for(let i =0; i<this.props.items.length;i++){
			// 	if(this.props.items[i].done === "true"){
			// 		// {console.log('tryme',this.props.items[i].done)}
			// 		return (
			// 			<ul className="list_show">
			// 					{this.props.items.map(item => (
			// 					<TodoItem id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
			// 					))}
			// 				</ul>				
			// 		);
			// 	}
			// }
			
			
		}
	}


	class Incomplete extends React.Component {
		constructor(props) {
			super(props);
		}	
			render() {
				console.log(this.props.completed);
				if(this.props.completed==="false"){
					return (
						<ul className="list_show">
								{this.props.items.map(item => (
								<TodoItem id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
								))}
							</ul>				
					);
				}				
			}
		}
export default TodoApp;

// react-router是為了不要讓畫面一直重新Render（F5），用React的原因是他有虛擬DOM，不用一直操控DOM物件


