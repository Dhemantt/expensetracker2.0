import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Navbars from './Navbars'
import { Authsliceactions } from '../Store/Authslice';
import { useNavigate } from 'react-router-dom';


const EmailVerification = () => {

  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const EmailVerify = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       idToken: token,
    //       requestType: 'VERIFY_EMAIL'
    //     })
    //   })

    //   if (res.ok) {
    //     console.log(res.json(), res, "email verify page")
    //     dispatch(Authsliceactions.logoutHandler())
    //     navigate('/')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM',{
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
      <Navbars />
      <form onSubmit={EmailVerify}>
        <Button type='submit'>Email verify</Button>
      </form>

    </>

  )
}

export default EmailVerification