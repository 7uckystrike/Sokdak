import { authService } from "../firebase"
import { useNavigate } from "react-router-dom";
import { RiTwitterLine } from 'react-icons/ri'

import '../styles/Navigation.css'

const Navigation = () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  }

  const onHomeClick = () => {
    navigate('/')
  }

  const onProfileClick = () => {
    navigate('/profile')
  }


  return(
    <div className='Nav-div'>
      <div className='Nav-content'>
        <div>
          <button className='Nav-logo' onClick={onHomeClick}>홈</button>
        </div>
        <div>
          <button className='Nav-profile' onClick={onProfileClick}>내정보</button>
        </div>
        <div>
          <button className='Nav-logout' onClick={onLogOutClick}>로그아웃</button>
        </div>
      </div>
    </div>
  )
}

export default Navigation