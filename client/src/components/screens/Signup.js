import React, { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
//As we are sending data from react to nodejs 
//we made the "proxy":"http://localhost:5000", to package.json

const Signin = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState(undefined)
     useEffect(()=>{
    if(url){
        uploadFields()
    }
     },[url])

    const uploadPic = ()=>{
        const data = new FormData()
        // const uri = FileSystem.documentDirectory + 'photos/Photo_' + id + '.jpg';
        data.append("file", image)
        data.append("upload_preset", "Instagram-Clone")
        data.append("cloud_name", "cloudri")
        fetch("https://api.cloudinary.com/v1_1/cloudri/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    	
    const uploadFields = ()=>{
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Data", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/Signup", {  //instead of putting full link giving this file path only to ensure connection as we are using React(3000 Port) & Nodejs(5000) Port seperately 
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res => res.json())  //passing resonse to Json
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#2e7d32 green darken-3" })
                    history.push('/signin')

                }
            }).catch(err => {
                console.log(err)
            })
    }
    const PostData = () => {
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
        

    }
    return (
        <div className="mycard ">
            <div className="card auth-card input-field">
                <h2><span>I</span>nstagram</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #42a5f5 blue darken-1">
                        <span>Upload Pic</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

                <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                    onClick={() => PostData()}
                >SignUp

                </button>

                <h5>
                    <Link to='/Signin'>Already have an account ? </Link>

                </h5>



            </div>
        </div>
    )
}

export default Signin;