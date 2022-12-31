import React, {Component } from 'react';
import { Row, Container } from 'react-bootstrap';

let styles = {
  currentUserTextContainer: {
  	marginBottom: 10,
  	flex: 0,
  	justifyContent: 'center',
  	display: 'flex',
  },
  textBubble: {
  	padding: 0,
  	justifyContent: 'center',
  	flex: 0,
  	display: 'flex',
  	borderRadius: 4,
  	fontSize: 12,
  	color: 'rgba(107,142,148,0.25)'
  },
  usernameText:{
  	fontSize: 9
  }
}

class ChatNotification extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	username: '',
	    	message: '',
	    };

	}

	componentDidMount(){
		var {message, timestamp} = this.props

		if(message){
			this.setState({message: message})
		}

	}

	componentWillUnmount(){
	}

	
	render(){
		const {message} = this.state

		let {chatRoomData} = this.state

		return (
			<Row style={styles.currentUserTextContainer}>
				<Container>
					<Row style={styles.textBubble}>
						{message}
					</Row>
				</Container>
			</Row>
		);
	}
}

export default ChatNotification;