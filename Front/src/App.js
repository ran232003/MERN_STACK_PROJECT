import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";
import Place from './places/pages/Place';
import MainNav from './shared/components/Navigation/MainNav';
import Users from './user/pages/Users';
import "./App.css"
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './places/pages/Auth';
import AuthContext from './shared/context/auth-context';


function App() {
  const[isLoggIn,setIsLoggIn] = useState(false);
  const[token,setToken] = useState();
  const[logoutModal,setLogoutModal] = useState(false);
  const[creatorId,setCreatorId] = useState("")
  const login = (id,token,time)=>{
    //the browser isnt functioning good. so im adding 2 hours + 3 hours for exp
    if(!time){
      const tokenExpDate = new Date(new Date().getTime()+1000*60*5*60)
      time = tokenExpDate;
    }
    
    setIsLoggIn(true);
    setToken(token)
    setCreatorId(id)
    localStorage.setItem('userData', JSON.stringify({
      creatorId:id,
      token:token,
      isLoggIn:true,
      tokenExpDate:time,
    }));

  }
  const logout = (action)=>{
    console.log(action)
    if(action === "logout"){
      setIsLoggIn(false);
      setCreatorId(null)
      setToken(null);
      localStorage.removeItem("userData");
    }
    else{
      setIsLoggIn(true);
      
    }
    setLogoutModal(false);
   
  }
  const logoutModalHandler = ()=>{
    setLogoutModal(true);
  
  }
  useEffect(()=>{
    let user = localStorage.getItem("userData");
    let currentTime = new Date(new Date().getTime());
    if(user){
      user = JSON.parse(user);
      user.tokenExpDate = new Date(user.tokenExpDate);

      if(user.tokenExpDate > currentTime){
        login(user.creatorId,user.token,user.tokenExpDate);
      }
      else{
        logout("logout");
      }
      
    }
    
  },[])
  console.log("isLoggIn",isLoggIn)
  return(
    <AuthContext.Provider value={{isLoggIn:isLoggIn,
    login:login
    ,logout:logout,logoutModal:logoutModal,logoutModalHandler:logoutModalHandler,
    userId:creatorId,token:token}}>
    <Router>
      <div className = "nav">
      <MainNav/>
      </div>
      <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:pid" exact>
            <UpdatePlace/>
          </Route>
          <Route path="/login" exact>
            <Auth/>
          </Route>
          <Redirect to="/" />
        </Switch>
      
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
