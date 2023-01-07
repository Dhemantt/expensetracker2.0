import {configureStore} from '@reduxjs/toolkit';

import AuthsliceReducer from './Components/Store/Authslice';

import ProfilesliceReducer from './Components/Store/Profileslice';

const store = configureStore({
    reducer:{
        auth:AuthsliceReducer,
        UserProfile:ProfilesliceReducer
    }
});

store.subscribe(() => {
    console.log(store.getState());
  });

export default store;