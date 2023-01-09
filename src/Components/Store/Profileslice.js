import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    Name:'',
    pic:'',
    emailVerified:false,
};

const Profileslice=createSlice({
    name:'UserProfile',
    initialState:initialState,
    reducers:{
        
        setUser:(state,action)=>{
            state.Name=action.payload.name;
            state.pic=action.payload.photoUrl;
            state.emailVerified=action.payload.emailVerified;
        }
    }
});

export const ProfileAction = Profileslice.actions;

export default Profileslice.reducer;

export const getUser = (idToken) => {
    return async (dispatch) => {
  
      const getUserData = async () => {
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC0RDZKXtBK31ap08ih55b94_LzkK9eJYM`,
          {
            idToken: idToken,
          }
        );
  
        if (res.status === 200) {
            console.log(res)
          const userDetails = {
            name: res.data.users[0].displayName,
            photoUrl: res.data.users[0].photoUrl,
            emailVerified: res.data.users[0].emailVerified,
          };

          console.log("slice page",userDetails)
  
          dispatch(ProfileAction.setUser(userDetails));
        }
      };
      try {
        await getUserData();
      } catch (error) {
        // console.log(error);
        // dispatch(ProfileAction.setResErr("Something went wrong"));
      }
    };
  };
  

