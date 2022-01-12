import React, {Component } from 'react';
import { Row, Container } from 'react-bootstrap';

let styles = {
  currentUserTextContainer: {
  	marginBottom: 20,
  	flex: 0,
  	justifyContent: 'flex-end',
  	display: 'flex',
  	marginLeft: '25%',
  },
  textBubble: {
  	padding: 10,
  	backgroundColor: '#0071BC',
  	justifyContent: 'flex-start',
  	flex: 0,
  	display: 'flex',
  	borderRadius: 8,
  	textAlign: 'right',
  	color:'white'
  },
  usernameText:{
  	fontSize:9
  }
}

 class CurrentUserText extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	username: '',
	    	message: '',
	    };

	}

	componentDidMount(){
		var {message, username, timestamp} = this.props

		if(username){
			this.setState({username: username})
		}

		if(message){
			this.setState({message: message})
		}

	}

	componentWillUnmount(){
	}

	
	render(){
		const {username, message} = this.state

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

export default CurrentUserText;