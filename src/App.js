import React,{ useEffect } from 'react';
import './App.css';
import {BrowserRouter , Route} from 'react-router-dom'
import HomePage from './container/HomePage';
import LoginPage from './container/LoginPage';
import RegisterPage from './container/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { useSelector,useDispatch } from 'react-redux';
import { isLoggedInUser } from './action';


function App() {

const auth = useSelector(state=> state.auth);
const dispatch = useDispatch();
useEffect(()=>{
  if(!auth.authenticated){
    dispatch(isLoggedInUser())
  }
},[])
  return (
    <div>
      <BrowserRouter>
      {/* only the loggedIn user can see */}
      <PrivateRoute exact path="/" component={HomePage} />
        
        <Route exact path="/login"  component={LoginPage} />
        <Route exact path="/signup"  component={RegisterPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
