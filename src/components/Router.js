import React, { useState } from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Home from "../routes/Home"
import Auth from "../routes/Auth"

const AppRouter = () => {
    const [isLogin, setIsLogin] = useState(false);
    return(
        <Router>
            <Routes>
                {isLogin ?(
                  <Route path="/" element={<Home />}></Route>  
                )
                 : 
                (<Route path="/" element={<Auth />}></Route>)
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;