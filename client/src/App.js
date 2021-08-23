import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'
//making the API so imported useEffect and createContext
export const UserContext = createContext()

const Routing =()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
    <switch>
    <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Signin">
        <Signin />
      </Route>
      <Route path="/Signup">
        <Signup />
      </Route>
      <Route exact path="/Profile">
        <Profile />
      </Route>   
      <Route path="/create">
        <CreatePost />
      </Route> 
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route> 
      </switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value= {{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
         <Routing/>
    </BrowserRouter> 
    </UserContext.Provider>     
  );
}

export default App;
