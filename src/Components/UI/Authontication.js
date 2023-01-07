import React, { useRef, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import { Authsliceactions } from '../Store/Authslice';


function Authontication() {

    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let enteredConfirmPassword;
        if (!isLogin) {
            enteredConfirmPassword = confirmPasswordInputRef.current.value;
        }

        if (!isLogin && (enteredPassword !== enteredConfirmPassword)) {
            alert("please enter valid password!")
            return
        }


        let url;
        if (!isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3wXKuuXRo8nk25KJYsqL0H1BjvZKPcOE'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3wXKuuXRo8nk25KJYsqL0H1BjvZKPcOE'
        }
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
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
            if (!isLogin) {
                dispatch(Authsliceactions.loginHandler({ idToken: data.idToken, email: data.email }))
                localStorage.setItem('token', data.idToken);
                localStorage.setItem('email', data.email);
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }

        })
            .catch((err) => {
                alert(err.message);
            });
    }
    const forgotPass = (e) => {
        e.preventDefault();

        if (!emailInputRef.current.value) {
            alert("enter the email first")
            return
        } else {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC3wXKuuXRo8nk25KJYsqL0H1BjvZKPcOE', {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: emailInputRef.current.value,
                })
            }).then(res => {
                console.log(res)
            })
        }

    }


    return (
        <>
            <Card style={{ width: "25%", marginLeft: "40%", marginTop: "15%", borderColor: "black", boxShadow: "1rem" }}>
                <section >
                    <h3 style={{ color: 'dark' }}>{isLogin ? 'Sign Up' : 'Login'}</h3>
                    <form onSubmit={submitHandler}>
                        <div>
                            <div>
                                <input type="email" placeholder="Email" required
                                    style={{ width: "90%", marginBottom: "3%", borderRadius: "0.5rem" }} ref={emailInputRef} />
                            </div>
                            <div>
                                <input type="password" placeholder="Password" required id='myPassword'
                                    style={{ width: "90%", marginBottom: "3%", borderRadius: "0.5rem" }} ref={passwordInputRef} />
                            </div>
                            {isLogin === false ? <div>
                                <input type="password" placeholder="Confirm Password"
                                    style={{ width: "90%", marginBottom: "5%", borderRadius: "0.5rem" }} ref={confirmPasswordInputRef} />
                            </div> : ''}

                            <div className="d-grid gap-2">
                                <Button variant="primary" size="sm" style={{ margin: "5%", borderRadius: "1rem" }}
                                    type="submit" >{isLogin ? 'Signup' : 'Login'}</Button>
                            </div>

                            {isLogin === false ? <div>
                                <p style={{ width: "90%", marginBottom: "5%", textDecoration: "none", cursor: "pointer" }}
                                    onClick={forgotPass} > forgot password </p>
                            </div> : ''}

                        </div>
                    </form>
                </section>
            </Card>
            <Card style={{ width: "25%", backgroundColor: "aqua", marginLeft: "40%", marginTop: "2%", borderColor: "black" }}>
                <Button variant="outline-info" type="submit" onClick={switchAuthModeHandler}>
                    {isLogin ? 'Have an account? Login' : 'Create new account'}</Button>
            </Card>
        </>
    )
}

export default Authontication;