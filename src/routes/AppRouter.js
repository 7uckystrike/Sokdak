import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from './Auth'
import Home from "./Home"
import Navigation from "../components/Navigation";

const AppRouter = ({ isLoggendIn, userObj }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {isLoggendIn && <Navigation userObj={userObj} />}
      <>
        {isLoggendIn ? (
          <Routes>
            <Route path="/" element={<Home userObj={userObj}/>} />
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