import React,{useState,useContext} from 'react'
import Button  from './../../shared/components/UI/Button';
import './PlaceItem.css'
import Modal from '../../shared/components/UI/Modal'
import Map from '../../shared/components/UI/Map';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../shared/context/auth-context';

const PlaceItem = (props)=>{
    const context = useContext(AuthContext);
    const [showMap,setShowMap] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const history = useHistory();
    const handleShowMap = ()=>{
        setShowMap(true)
    }
    const handleCloseMap = ()=>{
        setShowMap(false);
    }
    const handleShowDelete = ()=>{
        console.log("active")
        setShowDelete(true)
    }
    const handleCloseDelete = async(event)=>{
        setShowDelete(false);
         console.log(event.target.innerHTML);
         const buttonType = event.target.innerHTML
         if(buttonType === 'No'){
             return;
         }
         else{
            const response = await fetch(`http://localhost:5000/api/places/${props.id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${context.token}`,
                },
            })
            
            history.push('/');
         }

    }
    const Key = 'AIzaSyCOaIaByGKKP_WNf3ifid2n2XgG7bXfkpI';
    console.log("visitorId",props.visitorId);
    console.log("creatorId",props.creatorId)
    return(
        <div>
           <Modal
           showModal = {showMap}
           closeModal = {handleCloseMap}
           header = {props.address}
           footer = {<Button onClick = {handleCloseMap}>CLOSE</Button>}
           >
               <div className = "map-container">
                    
                    <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCOaIaByGKKP_WNf3ifid2n2XgG7bXfkpI"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `250px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    coordinates = {props.coordinates}
                    />
               </div>
            </Modal>
            <Modal
            showModal = {showDelete}
            closeModal = {handleCloseDelete}
            header = {"Delete Place"}
            footer = {<div><Button type ="button" name="yes" onClick = {handleCloseDelete}>Yes</Button>
            <Button type ="button" name="no" onClick = {handleCloseDelete}>No</Button></div>}
            >
                <div>
                    <h3>
                        Are You Sure You Want TO Delete?
                    </h3>
                </div>
            </Modal>
                
           
           
           <li className = "place-item">
           
               <div className = 'card'>
               
               <div className = "place-item__image">
                   <img src = {props.image}/>
               </div>
               <div className = "place-item__info">
                   <h2>{props.title}</h2>
                   <h3>{props.address}</h3>
                   <p>{props.desc}</p>
               </div>
            <div className = "place-item__actions">
                <Button inverse onClick = {handleShowMap}>VIEW ON MAP</Button>
                {props.visitorId === props.creatorId?<Button to = {`/places/${props.id}`}>EDIT</Button>:null}
                {props.visitorId === props.creatorId?<Button onClick = {handleShowDelete} danger>DELETE</Button>:null}
                

            </div>
            </div>
           </li>
        </div>
    )

}
export default PlaceItem;