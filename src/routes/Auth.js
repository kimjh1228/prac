import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (e) => {
        //비구조화할당
        const {target:{name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" value={email} required onChange={onChange} />
                <input name="password" type="password" placeholder="password" value={password} required onChange={onChange} />
                <input type="submit" value='login' />
            </form>
        </>
    )
}

export default Auth;