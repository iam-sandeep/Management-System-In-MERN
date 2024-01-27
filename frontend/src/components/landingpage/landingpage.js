// src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../login/login'; 
import './landingpage.css';


const LandingPage = () => {

  return (
    <div className="landing-page">
      <header>
       
        <nav>

            
          <ul>
            <li className='h2'>Task Management System</li> 
            <li className='widthcol'></li> 
            <li className='widthcol'></li> 
            <li className='widthcol'></li> 
            <li className='widthcol'></li> 




            
            <li className='element'><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <section>
        <h1>Implementing a robust task management system enhances productivity, collaboration, and organization</h1>
      </section>
      <section className="colorful-images">
        <div className="image-container">
          <img src="https://d3vnc3w6v6jm99.cloudfront.net/hJ7pqBYZln.jpg" alt="Colorful Image 1" />
        </div>
        <div className="image-container">
          <img src="https://www.thenews.com.pk//assets/uploads/tns/2020-05-24/662272_1363861_tns4_tns.jpg" alt="Colorful Image 2" />
        </div>
        <div className="image-container">
          <img src="https://img.etimg.com/thumb/msid-63145281,width-210,height-158,imgsize-114815,resizemode-75/software-it-thinkstock.jpg" alt="Colorful Image 3" />
        </div>
      </section>
      <footer>
        <p>&copy; 2024 Task Management System</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
