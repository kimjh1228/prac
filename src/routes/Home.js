import React ,{ useEffect, useState }from "react";
import { dbService , storageService} from "../fbase";
import { collection, addDoc , onSnapshot, query, orderBy} from "firebase/firestore";
import Nweet from "../components/Nweet";
import {ref, uploadString, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [img, setImg] = useState("");
    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
            setNweets(nweetArr);
        });
    }, []);
        
        
    const onSubmit = async(e) =>{
        e.preventDefault();
        let imgUrl = "";
        if(img !== ""){
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, img, "data_url");
            imgUrl = await getDownloadURL(response.ref);
        }
        const nweetObj ={
            text : nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            imgUrl : imgUrl
        }
        await addDoc(collection(dbService, "nweets"),nweetObj);
        setNweet("");
        setImg("");
    }

    const onchange = (e) =>{
        const {target :{value}}=e;
        setNweet(value);
    } 

    const changeImg =(e)=>{
        const {target:{files}} = e;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = ( e =>{
            const {currentTarget:{result}} = e;
            setImg(result);
        })
        reader.readAsDataURL(file);
    }
    const clearImg = () =>{
        setImg("");
    }
    
    return(
        <>
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input onChange={onchange} type="text" placeholder="what" value={nweet}></input>
                    <input type="file" accept="image/*" onChange={changeImg}/>
                    <input type="submit" value="Nweet"/>
                    {img && <div> <img width={50} height={50}  src={img}/><button onClick={clearImg}>delImg</button> </div>}
                </div>
            </form>
            <div>
                {nweets.map((nweet)=>
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                )}
            </div>
        </div>
        </>
    )
}

export default Home;
