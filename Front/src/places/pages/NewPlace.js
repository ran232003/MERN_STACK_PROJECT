import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router-dom';
import Button from '../../shared/components/UI/Button';
import ImageUpload from '../../shared/components/UI/ImageUpload';
import Input from '../../shared/components/UI/Input';
import AuthContext from '../../shared/context/auth-context';
import './NewPlace.css';
const NewPlace = ()=>{
    const context = useContext(AuthContext);
    const history = useHistory();
    const [inputs,setInputs] = useState({
        title:"",
        description:"",
        image:null,
        titleIsValid:false,
        address:"",
        addressIsValid:false,
        descriptionIsValid:false
    })
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(inputs.titleIsValid&&inputs.descriptionIsValid){
            const formData = new FormData();
            formData.append("title",inputs.title);
            formData.append("desc",inputs.description)
            formData.append("address",inputs.address)
            formData.append("creatorId",context.userId)
            formData.append("image",inputs.image);
            const response = await fetch("http://localhost:5000/api/places",{
                method:"POST",
                headers:{
                    "Authorization" : `Bearer ${context.token}`,
                },
                body:formData,
            })
            // const response = await fetch("http://localhost:5000/api/places",{
            //     method:"POST",
            //     headers:{
            //         'Content-Type': 'application/json'
            //     },
            //     body:JSON.stringify({
            //         title:inputs.title,
            //         desc:inputs.description,
            //         address:inputs.address,
            //         creatorId:context.userId,
            //         image:"testing"
            //     })
            // })
            history.push('/');
            console.log(inputs)
        }
        else{
            console.log("not ok"); 
            console.log(inputs)
        }

    }
    const handleInput = (inputState,lable)=>{
        if(lable === "Title"){
            setInputs(()=>{
                return {...inputs,title:inputState.value,titleIsValid:inputState.valid}
            })
        }
        else if(lable === "Description"){
            setInputs(()=>{
                return {...inputs,description:inputState.value,descriptionIsValid:inputState.valid}
            })
        }
        else if(lable === "Address"){
            setInputs(()=>{
                return {...inputs,address:inputState.value,addressIsValid:inputState.valid}
            })
        }
        else if(lable === "Image"){
            setInputs(()=>{
                return {...inputs,image:inputState}
            })
        }
    }
  
    console.log("new place");
    return(
        <form className = "place-form">
        <Input
        type = "text"
        lable = "Title"
        validators = {["MAX","MIN","EMPTY"]}
        element = "input"
        errMsg = "Must Have Valid Title"
        onChange = {handleInput}
        currentInput = ""
        valid = {false}
        // onChange = {}
        />
        <ImageUpload
        onInput = {handleInput}
        />
         <Input
        type = "text"
        lable = "Description"
        validators = {["MAX","MIN","EMPTY"]}
        element = "textarea"
        errMsg = "Must Have Valid Title"
        onChange = {handleInput}
        currentInput = ""
        valid = {false}
        // onChange = {}
        />
        <Input
        type = "text"
        lable = "Address"
        validators = {["MAX","MIN","EMPTY"]}
        element = "input"
        errMsg = "Must Have Valid Title"
        onChange = {handleInput}
        // onChange = {}
        />
        <Button
        onClick = {handleSubmit}
        disabled = {inputs.descriptionIsValid === false || inputs.titleIsValid === false || inputs.addressIsValid === false}
        >Submit</Button>
        </form>
    )
}
export default NewPlace