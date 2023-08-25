import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { query, getDocs, collection, where, orderBy} from "firebase/firestore"

const Profile = ({userObj}) => {
    const navigate = useNavigate();
    const [myProfile, setMyProfile] =useState("");
    const LogOut = () => {
        authService.signOut();
        navigate('/');
    }

    const getMyNweet = async()=>{
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setMyProfile(doc.data());
        });
    }

    useEffect(()=>{
        getMyNweet();
    },[]);

    return(
        <>
            {myProfile && <div style={{padding:20}}>
                {myProfile.imgUrl && <img src={myProfile.imgUrl} width={150} height={100}/> }
                <h4>{myProfile.text}</h4>
                </div>}
            <button onClick={LogOut}>LogOut</button>
        </>
    )
    
}

export default Profile;