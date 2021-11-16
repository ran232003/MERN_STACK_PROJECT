import React,{useEffect, useState,useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/UI/Button';
import Input from '../../shared/components/UI/Input';
import places, { updatePlaces } from '../../shared/util/dummyPlaces';
import Ring from "react-cssfx-loading/lib/Ring";
import './UpdatePlace.css'
import AuthContext from '../../shared/context/auth-context';

    

const UpdatePlace = (props)=>{
    const context = useContext(AuthContext)
    const placeId = 1//useParams().pid;
    const placeId2 = useParams().pid;
    const[test,setTest] = useState({});
    let dbPlace;// = getPlace(placeId2);
    const getPlace = async()=>{
        const response = await fetch(`http://localhost:5000/api/places/${placeId2}`,{
   
           })
           let data = await response.json();
           setInputs(()=>{
               return {...inputs,title:data.place.title,desc:data.place.desc}
           });
           setTest(data.place);
       }
       useEffect(()=>{
           console.log("hi");
           getPlace();
       },[])
 
    let oldPlace = places.find((place)=>{
        if(place.id === placeId){
            return place;
        }
    })
    const[inputs,setInputs] = useState({
        title:"",
        desc:"",
        TitleValid:true,
        descValid:true
    })
   
    const handleInput = (inputState,lable)=>{
        if(lable === "Description"){
            setInputs(()=>{
                return{...inputs,desc:inputState.value,descValid:inputState.valid}
            })
        }
        else if(lable === "Title"){
            setInputs(()=>{
                return{...inputs,title:inputState.value,TitleValid:inputState.valid}
            })
        }

    }
    const submit = async(event)=>{
       event.preventDefault();
       //updatePlaces(inputs,placeId);
       const response = await fetch(`http://localhost:5000/api/places/${placeId2}`,{
           method:'PATCH',
           headers:{
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${context.token}`,
        },
        body:JSON.stringify({
            title:inputs.title,
            desc:inputs.desc,
            
        }),
       })


    }
    console.log("out function",dbPlace);
    console.log("test",test);
    console.log("inputs",inputs);

    if(inputs.title.trim().length<=1){
    return(
        <div className = "center">
        <h2>update place</h2>
        <Ring />
        </div>
    )
    }
    else{
   
        return <form className = 'place-form'>
         
            <Input
        type = "text"
        lable = "Title"
        validators = {["MAX","MIN","EMPTY"]}
        element = "input"
        errMsg = "Must Have Valid Title"
        onChange = {handleInput}
        currentInput = {inputs.title}
        valid = {inputs.TitleValid}
        // onChange = {}
        />
          <Input
        type = "text"
        lable = "Description"
        validators = {["MAX","MIN","EMPTY"]}
        element = "textarea"
        errMsg = "Must Have Valid Title"
        onChange = {handleInput}
        currentInput = {inputs.desc}
        valid = {inputs.descValid}
        // onChange = {}
        />
        <Button
        className = "main-navigation__title"
        onClick = {submit}
        disabled = {inputs.descValid === false || inputs.TitleValid === false}
        >
        <Link className = "a" to = "/">Update</Link>
        </Button>
        </form>
    }
}

export default UpdatePlace