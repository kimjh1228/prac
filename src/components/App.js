import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from "../fbase"

const App = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=> {
      if(user){
        setIsLogin(true);
        setUserObj(user);
      }else{
        setIsLogin(false);
      }
      setInit(true);
    });
  },[]);

  return (
    <>
      {init ? <AppRouter  isLogin = {Boolean(isLogin)} userObj = {userObj}/> : "initializing..."}
    </>
  )
}

export default App;
