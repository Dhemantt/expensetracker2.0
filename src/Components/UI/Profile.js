import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Profile() {


  const { token } = useSelector(state => state.auth);
  const { Name, pic, emailVerified } = useSelector(state => state.UserProfile);

  const NameInputRef = useRef();
  const ImgUrlRef = useRef();

  const navigate = useNavigate()
  const Profilecomplete = Name && pic && emailVerified;

  const [complete, setComplete] = useState(Profilecomplete);

  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if (submit === true) {
      navigate('/expense')
    }
  }, [submit])


  const Cprofile = (e) => {
    e.preventDefault();

    const enteredName = NameInputRef.current.value;
    const enteredImg = ImgUrlRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM', {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        displayName: enteredName,
        photoUrl: enteredImg,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        console.log("User has successfully login")
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    }).then(data => {

      setSubmit(true)
    })
      .catch((err) => {
        alert(err.message);
      });

  }
  const cancelProfile=(e)=>{
    e.preventDefault();
    if (Profilecomplete) {
      navigate('/expense')
    }else{
      setComplete(false)
    }
  }


  return (
    <>
      {!complete && (<div style={{ background: "black", display: "inline" }}>
        <h4 style={{ textAlign: "left", margin: "2%", textDecoration: "none", color: "gray" }}>Welcome to Expesense Tracker</h4>
        <h6 style={{ paddingLeft: "75%" }}>Your profile is incomplete.<p style={{ cursor: "pointer", display: "inline", color: "blue", }} onClick={() => setComplete(true)}>Complete now</p></h6>
        <div style={{ borderBottom: 1, height: 2, position: "absolute", width: "100%", backgroundColor: "black" }} />
      </div>
      )}

      {complete && (
        <form onSubmit={Cprofile}>
          <div>
            <h4 style={{ textAlign: "left", margin: "2%", textDecoration: "none", color: "gray" }}>Winner never quite,Quiter never win.</h4>
          </div>
          <div style={{ borderBottom: 1, height: 2, position: "absolute", width: "100%", backgroundColor: "black" }} />
          <div >
            <h4 style={{ textAlign: "left", paddingLeft: "20%", marginTop: "5%" }}>Contact Details
              <Button variant="outline-danger" onClick={cancelProfile} style={{ display: "inline", marginLeft: "60%" }}>Cancel</Button></h4>
          </div>
          <div>

            <label style={{ margin: "2%", fontWeight: "bold" }}>Full Name : </label>
            <input type='text' style={{ width: "25%" }} ref={NameInputRef} required></input>

            <label style={{ margin: "2%", fontWeight: "bold" }}>Profile Photo URL : </label>
            <input type='text' style={{ width: "25%" }} ref={ImgUrlRef} required></input>
          </div>
          <div style={{ marginLeft: "15%", borderBottom: 1, height: 2, flexDirection: "left", width: "100%", backgroundColor: "black" }} />
          <div>
            <Button variant="danger" style={{ marginLeft: "-45%", marginTop: "3%" }} type="submit">Update</Button>
          </div>
        </form>
      )}
    </>
  )
}

export default Profile;