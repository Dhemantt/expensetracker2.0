import {configureStore} from '@reduxjs/toolkit';

import AuthsliceReducer from './Components/Store/Authslice';
import ExpensesliceReducer from './Components/Store/Expenseslice';

import ProfilesliceReducer from './Components/Store/Profileslice';

const store = configureStore({
    reducer:{
        auth:AuthsliceReducer,
        UserProfile:ProfilesliceReducer,
        Expense:ExpensesliceReducer,

    }
});

store.subscribe(() => {
    console.log(store.getState());
  });

export default store;