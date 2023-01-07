import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Components/UI/Profile';
import EmailVerification from './Components/UI/EmailVerification';
import Authontication from './Components/UI/Authontication';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Components/Store/Profileslice';
import { useEffect } from 'react';
import { Authsliceactions } from './Components/Store/Authslice';
import Expense from './Components/UI/Expense';

function App() {
  const {isLoggedin,token} = useSelector(state=>state.auth);
  // const {emailVerified} = useSelector(state=>state.UserProfile)
  const {Name,pic,emailVerified}=useSelector(state=>state.UserProfile);

  const navigate= useNavigate();
  const dispatch = useDispatch();

  const Profilecomplete = Name && pic && emailVerified;

  useEffect(()=>{
    dispatch(Authsliceactions.getAuth())
    if (isLoggedin) {
      dispatch(getUser(token)) 
    }
  })

  useEffect(()=>{
    if(!isLoggedin){
      navigate('/')
    }
    else if (Profilecomplete) {
      navigate('/expense')
    }
    else if (emailVerified === true) {
        navigate('/profile')
    }
    else if(isLoggedin && !emailVerified){
      navigate('/emailVerify')
    }
    
},[emailVerified])

  return (
    <>
      <div className="App">
        
            <Routes>
              {isLoggedin && <Route path='/' element={<Authontication />} />}
              <Route path='/profile' element={<Profile />} />
              <Route path='/emailVerify' element={<EmailVerification/>} />
              <Route path='*' element={<Authontication />} />
              <Route path='/expense' element={<Expense/>} />
            </Routes>          
      </div>
    </>
  );
}

export default App;
