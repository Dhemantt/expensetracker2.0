import React, { useRef, useState } from 'react'
// import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import style from './Authontication.module.css';

import { Authsliceactions } from '../Store/Authslice';


function Authontication() {

    const dispatch = useDispatch();
    const {isLoggedin} = useSelector(state=>state.auth)
    const [isLogin, setIsLogin] = useState(false);
    const [responseError, setResponseError] = useState(false);
    // const [isLoading, setisLoading] = useState(false)

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };


    const submitHandler = async (event) => {
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
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM'
        }

        try {

            const res = await fetch(url,
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
                })

            const data = await res.json();

            if (res.ok) {
                console.log("User has successfully login")
            }
            else {
                let errorMessage = 'Authentication failed!';
                setResponseError(true);
                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
            }
          
            if (isLogin) {
                dispatch(Authsliceactions.loginHandler({
                     idToken: data.idToken,
                      email: data.email 
                    }))
                localStorage.setItem('token', data.idToken);
                localStorage.setItem('email', data.email);
                setIsLogin(true)
                console.log("this is login page", isLoggedin)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const forgotPass = async (e) => {
        e.preventDefault();

        if (!emailInputRef.current.value) {
            alert("enter the email first")
            return
        } else {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM', {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: emailInputRef.current.value,
                })
            })
            alert("Reset link has been sent to Entered Email, Thanks")
            console.log(res)
        }

    }

    return (
        <>
            <section className={style.formContainer}>
                <form onSubmit={submitHandler} className={style.formContainer}>
                    {isLogin ? <h1>Login</h1> : <h1>REGISTER</h1> }
                    <div>
                        <input type="email" placeholder="Email"
                            className={style.formControl}
                            ref={emailInputRef} required />
                    </div>
                    <div>
                        <input type="password" placeholder="Password"
                            className={style.formControl}
                            ref={passwordInputRef} required />
                    </div>
                    {!isLogin && <div>
                        <input type="password" placeholder="Confirm Password"
                            className={style.formControl}
                            ref={confirmPasswordInputRef} required />
                    </div>}
                    <div className={style.formControl}>
                        <button
                            type="submit"
                            id="btnLogin"
                            className={style.btnLogin}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </button>
                        { isLogin === true ?
                        <div>
                            <button
                          type="button"
                          className={style.btnRegister}
                          onClick={forgotPass}>
                           forgot your password? Reset it.
                        </button>
                        </div> : ''}
                        <button
                            type="button"
                            className={style.btnRegister}
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin ? " Create a new account" : "Have an account! Login Now"}
                        </button>
                        {responseError && (
                            <p className={style.forErrorMsgs}>{responseError}</p>
                        )}
                    </div>
                </form>
            </section>


            {/* <Card style={{ width: "25%", marginLeft: "40%", marginTop: "15%", borderColor: "black", boxShadow: "1rem" }}>
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
            </Card> */}
        </>
    )
}

export default Authontication;