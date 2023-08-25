import React, { useState } from "react";
import { dbService, storageService  } from "../fbase";
import {doc, deleteDoc, updateDoc} from "firebase/firestore"
import {ref, deleteObject} from "firebase/storage"
const Nweet = ({nweetObj, isOwner}) =>{
    const [eddit, setEddit] = useState(false);
    const [newWeet, setNweet] = useState(nweetObj.text);
    
    let userDoc = doc(dbService,`nweets`, nweetObj.id);
    const delBtnClick =()=>{
        const ok = window.confirm("삭제?");
        if(ok){
            try {
                deleteDoc(userDoc);
                deleteObject(ref(storageService, nweetObj.imgUrl));
            } catch (error) {
                console.log(error);                
            }
        }
    }
    const toggleEddit=()=>{
        setEddit((prev)=>!prev);
    }
    const onchange =(e)=>{
        const {target:{value}} =e;
        setNweet(value);
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        updateDoc(userDoc, { text: newWeet });
        setEddit(false);
    }
    return(
        <>
        {eddit ? <><form onSubmit={onSubmit}><input type="text" value={newWeet} placeholder="eddit" required onChange={onchange}/>
                        <input type="submit" value="updateText"/>
                    </form>
                    <button onClick={toggleEddit}>cancle</button></> : 
            <div style={{padding:20}}>
                <div key={nweetObj.id}>
                    {nweetObj.imgUrl && <img src={nweetObj.imgUrl} width={200} height={100} />}
                    <h4>{nweetObj.text}</h4>
                </div>
                {isOwner && <><button onClick={delBtnClick}>Delete nweet!</button>
                <button onClick={toggleEddit}>edit nweet!</button></>
                }
            </div>
        }
        </>
    )
}

export default Nweet;