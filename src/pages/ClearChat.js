import React, {Component } from 'react';
import Button from '@material-ui/core/Button';
import { Row, Container } from 'react-bootstrap';

import {socket} from '../services/socket'


const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

class ChatRoom extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
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

	}

	clearChatData(){
		socket.emit("ClearChat")
	}

	render(){

		let {chatRoomData, currentUsername} = this.state

		return (
			<Container>
				<div>Clear Chat</div>

				<Button variant="contained" color="primary" onClick={ () => this.clearChatData()}>
			 		 Clear Chat Data
				</Button>

			</Container>
		);
	}
}

export default ChatRoom;