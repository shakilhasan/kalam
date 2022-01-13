import React, {Component } from 'react';
import Button from '@material-ui/core/Button';
import { useParams, useHistory } from "react-router";
import {
	Container,
	Card,
	CardBody,
	Col,
	Row,
	Label,
	Button,
	Form,
	Input,
} from "reactstrap";
import {socket} from '../services/socket'
const history = useHistory();


const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

class ChatRoom extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			name:'',
			isExist:false,
	    	currentUsername: "User1",
	    	currentUserID: 1,
	    	message: '',
	    	chatRoomData: [
	    	],
	    	initialLoad: true,
	    };
	    //Create Ref for managing "auto-scroll"
	    this.messagesEndRef = React.createRef()
	}

	componentDidMount(){
		// localStorage.removeItem('userID')
		// localStorage.removeItem('username')

		let userIDVal = localStorage.getItem('userID')
		let usernameVal = localStorage.getItem('username')

		//If user does not have a userid and username saved in local storage, create them for them
		if(!userIDVal){
			this.setState({isExist: false})

		}
		else {
			this.setState({isExist: true})
			history.push('/chatRoom');
		}
	}

	handleSubmit(){


	}
	handleChange = event => {
		event.preventDefault();
		this.setState({name: event.target.value})
	}
	render(){

		let {chatRoomData, currentUsername} = this.state

		return (
			<Container>
				<div>Enter Chat Room</div>
				<Input
					name="name"
					type="text"
					className="form-control"
					onChange={this.handleChange}
					value={this.state.name}
				/>
				<Button variant="contained" color="primary" onClick={ () => this.handleSubmit()}>
			 		 Enter Chat Room
				</Button>

			</Container>
		);
	}
}

export default ChatRoom;