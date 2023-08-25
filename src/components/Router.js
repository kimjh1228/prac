import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Home from "../routes/Home"
import Auth from "../routes/Auth"
import Profile from "../routes/Profile"
import Navigation from "../components/Navigation";

const AppRouter = ({isLogin, userObj}) => {
    return(
        <Router>
            {isLogin && <Navigation userObj={userObj}/>}
            <Routes>
                {isLogin ?(
                    <>
                        <Route path="/" element={<Home userObj={userObj}/>}></Route>  
                        <Route path="/profile" element={<Profile userObj={userObj}/>}></Route>  
                    </>
                )
                 : 
                (<Route path="/" element={<Auth />}></Route>)
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;