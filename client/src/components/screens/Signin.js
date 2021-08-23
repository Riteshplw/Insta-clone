import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App'
import M from 'materialize-css';

const Signin = () => {
        const history = useHistory()
        const {state,dispatch} = useContext(UserContext)
        const [password,setPassword] = useState("")
        const [email,setEmail] = useState("")
        const PostData=() =>{
            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html: "Invalid Data",classes:"#c62828 red darken-3"})
                return
            }
            fetch("/Signin",{  //instead of putting full link giving this file path only to ensure connection as we are using React(3000 Port) & Nodejs(5000) Port seperately 
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    
                    password,
                    email
                 })
            }).then(res=>res.json())//passing resonse to Json
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html: data.error,classes:"#c62828 red darken-3"})
                }
                else{
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({html:"SignedIn Successfully",classes:"#2e7d32 green darken-3"})
                    history.push('/') 

                }
            }).catch(err=>{
                console.log(err)
            })
            
        }
    return (
        <div className="mycard ">
            <div className="card auth-card input-field">
                <h2><span>I</span>nstagram</h2>
                <input
                    type="text"
                    placeholder="email"
                    value= {email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value= {password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" 
                    onClick={()=>PostData()}
                >SignUp
            
                </button>

                <h5>
                    <Link to='/Signup'>Dont have an account ? </Link>
                    
                </h5>

            </div>
        </div>
    )
}

export default Signin;