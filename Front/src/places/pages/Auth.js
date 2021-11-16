import React,{useState,useContext} from 'react';
import { Link,useHistory } from 'react-router-dom';
import Button from '../../shared/components/UI/Button';
import ImageUpload from '../../shared/components/UI/ImageUpload';
import Input from '../../shared/components/UI/Input';
import Modal from '../../shared/components/UI/Modal';
import AuthContext from '../../shared/context/auth-context';

const Auth = (props)=>{
    const[inputs,setInputs] = useState({
        email:"",
        password:"",
        emailValid:false,
        passwordValid:false,
        name:"",
        nameValid:false,
        image:null
    });
    const history = useHistory();
    const context = useContext(AuthContext);
    const[pageState,setPageSate] = useState("Login");
    const[error,setError] = useState({valid:false,msg:""});
    const handleInput = (inputState,lable)=>{
        if(lable === "Email"){
            setInputs(()=>{
                return{...inputs,email:inputState.value,emailValid:inputState.valid}
            })
        }
        else if(lable === "Password"){
            setInputs(()=>{
                return{...inputs,password:inputState.value,passwordValid:inputState.valid}
            })
        }
        else if(lable === "Name"){
            setInputs(()=>{
                return{...inputs,name:inputState.value,nameValid:inputState.valid}
            })
        }
        else if(lable === "Image"){
            setInputs(()=>{
                return{...inputs,image:inputState}
            })
        }

    }
    let revers = pageState === "Login"?"SignUp":"Login";
    const submit= async(event)=>{
        event.preventDefault();
        //we will send form-data and no json beacuse of image
        let resData;
        if(pageState === "Login"){
           try{
            console.log("in login")
          const response = await fetch("http://localhost:5000/api/users/login",{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email : inputs.email,
                    password:inputs.password 
                  }),
            })
             resData = await response.json();
            console.log("response",response);
            if(response.ok !=true){
                throw new Error(resData.msg);
            }
            
        }catch(e){
   
           return setError({valid:true,msg:e.message});
        }
        }
        else if (pageState === "SignUp"){
            try{
                //we will send form-data and no json beacuse of image
                const formData = new FormData();
                formData.append('name',inputs.name);
                formData.append('password',inputs.password);
                formData.append('email',inputs.email);
                formData.append('image',inputs.image);
                console.log(inputs.image);
            //     if(true){
            //        const formData2 = new FormData();
            //        formData2.append('image',inputs.image);

            //         const response =  await fetch('http://localhost:5000/api/users/test',{
            //     method:'POST',
                
            //     body:formData2,
            // })
            // return;
            //     }
         const response =  await fetch('http://localhost:5000/api/users/signup',{
                method:'POST',
                
                body:formData,
            })
             resData = await response.json();
             if(response.ok !=true){
                throw new Error(resData.msg);
            }
        }catch(e){
            return setError({valid:true,msg:e.message});
        }
        }
        context.login(resData.userId,resData.token);
        
        history.push('/');
    }
   const changePage = (event)=>{
    event.preventDefault();
    if(pageState === "Login"){
        setPageSate("SignUp")
    }
    else if(pageState === "SignUp"){
        setPageSate("Login")
    }
   }
   const handleCloseDelete = ()=>{
       setError({valid:false,msg:""})
   }
   const handleFile = (id,myFile)=>{
        console.log(myFile);
   }
   let checkDisable = pageState === "SignUp"? inputs.passwordValid === false || inputs.emailValid === false || !inputs.image:
   inputs.passwordValid === false || inputs.emailValid === false;
   console.log(inputs);
    const connected = false;
    if(connected === false){
        return(
            <form className = 'place-form'>
                <h2>{pageState}</h2>
                {pageState === 'Login'?null:
                <Input
        type = "text"
        lable = "Name"
        validators = {["MAX","MIN","EMPTY"]}
        element = "input"
        errMsg = "Must Have Valid Title"
        onChange = {handleInput}
        currentInput = ""
         valid = {inputs.emailValid}
       
        />
                }
                {pageState === 'Login'?null:
                <ImageUpload
                onInput = {handleInput}
                />
                }
            <Input
        type = "email"
        lable = "Email"
        validators = {["MAX","MIN","EMPTY"]}
        element = "input"
        errMsg = "Must Have Valid Title"
        onChange = {handleInput}
        currentInput = ""
         valid = {inputs.emailValid}
       
        />
         <Modal
            showModal = {error.valid}
            closeModal = {()=>{}}
            header = {"Error"}
            footer = {<Button type ="submit" onClick = {handleCloseDelete}>OK</Button>
            }
            >
                <div>
                    <h3>
                        {error.msg}
                    </h3>
                </div>
            </Modal>
          <Input
        type = "password"
        lable = "Password"
        validators = {["MAX","MIN","EMPTY"]}
        element = "input"
        errMsg = "Must Have Valid Title"
        currentInput = ""
         valid = {inputs.passwordValid}
        onChange = {handleInput}
        />
        <Link className = "a" to = "/">
        <Button
        className = "main-navigation__title"
         onClick = {submit}
         disabled = {checkDisable}
        >
        {pageState}
        </Button>
        </Link>
        {pageState === "Login"?<p>dont have a User yet? click Hear to Sign Up</p>
        :<p>already have a user? click here to Login</p>    
    }
        <Button
        onClick = {changePage}
        >
        Switch to {revers}</Button>
        </form>
        )
    }
    else{
        return(
            <div>
    
            </div>
        ) 
    }
    
}

export default Auth;