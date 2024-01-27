// App.js
import './App.css';
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import CreateUsers from "./components/CreateUser/CreateUser";
import Createclient from "./components/CreateUser/createclient";
import User from "./components/user/user";
import Client from "./components/Client/client";
import Project from "./components/project/project"
import CreateProject from "./components/Createproject/Createproject";
import Userregister from "./components/register/userreg";




import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
    const [user, setLoginUser] = useState({});

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        {
                            user && user.name ? <Home loginUser={user} setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
                        }
                    </Route>
                    <Route path="/login">
                        <Login setLoginUser={setLoginUser} />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/Userregister">
                        <Userregister />
                    </Route>
                    
                    <Route path="/user">
                        <User loginUser={user} setLoginUser={setLoginUser} />
                    </Route>
                    <Route path="/client">
                        <Client loginUser={user}/>
                    </Route>

                    <Route path="/CreateUser">
                        <CreateUsers />
                    </Route>
                    <Route path="/Createclient">
                        <Createclient />
                    </Route>
       
                    <Route path="/project">
                        <Project loginUser={user} />
                    </Route>


                    <Route path="/home">
                        <Home setLoginUser={setLoginUser}/>
                    </Route>                    
                    <Route path="/Createproject">
                        <CreateProject />
                    </Route>
  
                    
                    
                </Switch>
            </Router>
        </div>
    );
}

export default App;
