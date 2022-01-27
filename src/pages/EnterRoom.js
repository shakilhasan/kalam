import React, { useState , useEffect} from "react";
// import Button from '@material-ui/core/Button';
import { useParams, useHistory } from "react-router-dom";
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

const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

const EnterRoom =()=> {
	const history = useHistory();
	const [name, setName] = useState('');
	const [isExist, setIsExist] = useState(false);
	const [currentUsername, setCurrentUsername] = useState("User1");
	const [currentUserID, setCurrentUserID] = useState(1);
	const [message, setMessage] = useState('');
	const [chatRoomData, setChatRoomData] = useState([]);
	const [initialLoad, setInitialLoad] = useState(true);

	//Create Ref for managing "auto-scroll"
	const [messagesEndRef, setMessagesEndRef] = useState(React.createRef());

	useEffect(() => {
		// localStorage.removeItem('userID')
		// localStorage.removeItem('username')

		let userIDVal = localStorage.getItem('userID')
		let usernameVal = localStorage.getItem('username')
		console.log("userIDVal....",userIDVal)
		//If user does not have a userid and username saved in local storage, create them for them
		if (userIDVal) {
			setIsExist(true)
			// history.push('/chatRoom');
		} else {
			setIsExist(false)
		}
	}, [])


	const handleSubmit = (e) => {
		const userData = {userID: name, username: name};
		localStorage.setItem('userID', userData.userID)
		localStorage.setItem('username', userData.username)
		//Notify Socket server is not ready to chat
		socket.emit("UserEnteredRoom", userData)
		history.push('/chatRoom');
	}
	const handleChange = event => {
		console.log("handleChange")
		console.log("handleChange...",event.target.value)
		event.preventDefault();
		setName(event.target.value)
	}

	return (
		<Container>
			<div>Enter Chat Room</div>
			<Input
				name="name"
				type="text"
				className="form-control"
				onChange={handleChange}
				value={name}
			/>
			<Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>
				Enter Chat Room
			</Button>

		</Container>
	);

}
export default EnterRoom;