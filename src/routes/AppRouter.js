import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from './Auth'
import Home from './Home'
import Profile from "./Profile";
import Navigation from "../components/Navigation";

const AppRouter = ({ isLoggendIn, userObj, refreshUser }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {isLoggendIn && <Navigation userObj={userObj} />}
      <>
        {isLoggendIn ? (
          <Routes>
            <Route path="/" element={<Home userObj={userObj}/>} />
            <Route path="/:uid" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
          </Routes>
        ) : (
          <>
            <Auth />
          </>
        )}
      </>
    </Router>
  )
}

export default AppRouter;