import React, { useRef, useState } from "react";
import { authService, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const passwordInput = useRef();
    const emailInput = useRef();
    
    const onChange = (e) => {
        //비구조화할당
        const {target:{name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount){
                data = await createUserWithEmailAndPassword(authService,email,password);
            }else{
                data = await signInWithEmailAndPassword(authService,email,password);
                return;
            }
        } catch (error) {
            switch(error.code){
                case "auth/weak-password" : {
                    alert("비밀번호는 6자리 이상 입력");
                    passwordInput.current.focus();
                    setPassword("");
                    break;
                }
                case "auth/email-already-in-use" : {
                    alert("이미 가입된 이메일");
                    emailInput.current.focus();
                    setEmail("");
                    setPassword("");
                    break;
                }
                case "auth/user-not-found" :{
                    alert("등록되지 않은 이메일 입니다. 가입 먼저 해주쎄오.");
                    setEmail("");
                    setPassword("");
                    toggleAccount();
                    break;
                }
            }   
        }
    }
    
    const toggleAccount = ()=>{ setNewAccount((prev)=>!prev);}

    //소셜로그인
    const onSocialClick = async(e) =>{
        const {target:{name}} = e;
        let provider;
        try {
            if(name === "google"){
                provider = new GoogleAuthProvider(); 
            }else if(name === "gitHub"){
                provider = new GithubAuthProvider();
            }
            await signInWithPopup(authService, provider);
        } catch (error) {
            alert(error.message);            
        }
    }
    
    return(
        <>
            <form onSubmit={onSubmit}>
                <div style={{display: 'flex', flexDirection: 'column', width: '50%'}}>
                    <input name="email" type="email" placeholder="Email" value={email} required onChange={onChange} ref={emailInput}/>
                    <input name="password" type="password" placeholder="password" value={password} required onChange={onChange} ref={passwordInput}/>
                    <input type="submit" value={newAccount ? "create Account" : "Login"} />
                </div>
            </form>
            <span onClick={toggleAccount}>{newAccount? "signUp" : "create Account"}</span>
            <button onClick={onSocialClick} name="google">google</button>
            <button onClick={onSocialClick} name="gitHub">gitHub</button>

        </>
    )
}

export default Auth;