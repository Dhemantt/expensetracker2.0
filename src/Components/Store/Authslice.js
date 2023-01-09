import {createSlice} from '@reduxjs/toolkit';

const initialState={
    token:'',
    email:'',
    isLoggedin:false,
    emailVerification:false
};
const Authslice = createSlice({
    name:'Auth',
    initialState:initialState,
    reducers:{
        loginHandler :(state,action) => {
            state.token=action.payload.idToken;
            state.email=action.payload.email;
            state.isLoggedin=!!state.token;
        },
        logoutHandler :(state)=>{
            state.token='';
            state.email='';
            state.isLoggedin=!!state.token;
            localStorage.removeItem('token');
            localStorage.removeItem('email');
        },
        getAuth: (state) => {
            const AUTH = localStorage.getItem("token");
            if (AUTH) {
              state.email = localStorage.getItem('email');
              state.token = localStorage.getItem('token');
              state.isLoggedin = !!state.token;
            }
          },
    }
});


export const Authsliceactions = Authslice.actions;
export default Authslice.reducer;



