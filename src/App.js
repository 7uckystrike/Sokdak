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
        setUserObj(user)  
      } else {
        setIsLoggendIn(false)
      }
      setInit(true)
    });
  },[])
  return (
    <>
      {init ? <AppRouter isLoggendIn={isLoggendIn} userObj={userObj} /> : "로그인중..."}
    </>
  )
}

export default App