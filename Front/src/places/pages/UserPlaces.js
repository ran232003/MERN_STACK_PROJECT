import React, { useContext, useEffect, useState } from 'react'
import PlaceList from '../components/PlaceList'
import { useParams } from 'react-router-dom'
import places from '../../shared/util/dummyPlaces'
import AuthContext from '../../shared/context/auth-context'


const UserPlaces = (props)=>{
    const context = useContext(AuthContext);
    const[userPlaces,setUserPlaces] = useState([]);
    //const id = useParams().userId
    const id = useParams().userId;
    const visitorId = context.userId;
    console.log("user places",id)
    const getUserPlaces = async()=>{
        const response = await fetch(`http://localhost:5000/api/places/user/${id}`);
        if(response.ok){
            const resJson = await response.json();
            setUserPlaces(resJson.userPlaces)
            console.log("userPlaces",userPlaces,typeof userPlaces);
        }
    }
    useEffect(()=>{
        getUserPlaces();
    },[id])
    console.log(userPlaces);
    return(
        <div>
           <PlaceList
           //items = {places.filter((item)=>{return item.creatorId == id})}
           items = {userPlaces}
           id = {visitorId}
           />
        </div>
    )

}
export default UserPlaces;