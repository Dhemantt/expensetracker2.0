import React, {useEffect } from 'react'
import Authontication from './Components/UI/Authontication';
import Navbars from './Components/UI/Navbars';
import Profile from './Components/UI/Profile';
import { useSelector } from 'react-redux';

const  HomePage = () => {
  const {isLoggedin} = useSelector(state=>state.auth);

  useEffect(()=>console.log("home page",isLoggedin))
  return (
    <>
      <Navbars />
      {!isLoggedin && (<Authontication />)}
      {isLoggedin && <Profile/>}      
    </>
  )
}

export default HomePage;