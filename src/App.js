import './App.css';

import ChatRoom from './pages/ChatRoom'
import ClearChat from './pages/ClearChat'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App" style={{justifyContent:'center', display: 'flex'}}>

        <Switch>

          <Route exact path="/">
            <ChatRoom/>
          </Route>

          <Route exact path="/clearChat">
            <ClearChat/>
          </Route>


        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
