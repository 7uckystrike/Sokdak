import "../styles/Navigation.css"
import { authService } from "../firebase"
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  }
  return(
    <button className={"Nav_box"} onClick={onLogOutClick}>
      로그아웃
    </button>
  )
}

export default Navigation