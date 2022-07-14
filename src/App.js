import AppRouter from "./routes/AppRouter";
import { useState, useEffect } from "react"
import { authService } from "./firebase";


const App = () => {
  const [init, setInit] = useState(false)
  const [isLoggendIn, setIsLoggendIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggendIn(true)
        setUserObj({
          displayName: user.displayName ? user.displayName : user.uid.slice(0, 9),
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setIsLoggendIn(false)
        setUserObj(null)
      }
      setInit(true)
    });
  },[])

  const refreshUser =() => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    })
  }
  return (
    <>
      {init ? <AppRouter isLoggendIn={isLoggendIn} userObj={userObj} refreshUser={refreshUser} /> : ''}
    </>
  )
}

export default App