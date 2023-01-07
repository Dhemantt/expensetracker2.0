import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Navbars from './Navbars'
import {Authsliceactions} from '../Store/Authslice';
import { useNavigate } from 'react-router-dom';


const EmailVerification = () => {

  const {token} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const EmailVerify=(e)=>{
    e.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC3wXKuuXRo8nk25KJYsqL0H1BjvZKPcOE',{
      method:'POST',
      body:JSON.stringify({
        idToken:token,
        requestType:'VERIFY_EMAIL'
      })
    }).then(res=>{
      console.log("i am email page",res)
      if(res.ok){
       
        dispatch(Authsliceactions.logoutHandler())
        navigate('/')
      }
    }).catch(err=>{console.log(err)})
  }

  return (
    <>
    <Navbars/>
    <form onSubmit={EmailVerify}>
      <Button type='submit'>Email verify</Button>
    </form>
    
    </>
    
  )
}

export default EmailVerification