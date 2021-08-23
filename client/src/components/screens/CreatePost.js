import React, { useState ,useEffect} from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom'
const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    
    useEffect (()=>{
        if(url){

        
        fetch("/createpost", {  //instead of putting full link giving this file path only to ensure connection as we are using React(3000 Port) & Nodejs(5000) Port seperately 
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                body,
                pic: url
            })
        }).then(res => res.json())//passing resonse to Json
            .then(data => {
                // console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Post Created Suceessfully", classes: "#2e7d32 green darken-3" })
                    history.push('/')

                }
            }).catch(err => {
                console.log(err)
            })
        }

    },[url]) 

    const postDetails = () => {
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

    return (
        <div className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #42a5f5 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                onClick={() => postDetails()}
            >Submit Post

            </button>
        </div>
    )
}

export default CreatePost;