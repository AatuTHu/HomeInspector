import { View, Text } from 'react-native'
import {useState} from 'react'
import Login from './Login'
import SignUp from './SignUp';
import Profile from './Profile';

export default function ProfileScreen({isLoggedIn,setIsLoggedIn}) {

  const [form, setForm] = useState(1);

  const switchForm = () => {
    switch (form) {
      case 1:
        return (<Login setForm = {setForm} setIsLoggedIn = {setIsLoggedIn}/>);
      case 2:  
        return (<SignUp setForm = {setForm} setIsLoggedIn = {setIsLoggedIn}/>);
      default:
        break;
    }
  }
 
  if(isLoggedIn == false ) {
    return (
     <>{switchForm()}</>
    )
  } else {
    return (
     <><Profile/></>
    )
  } 
}