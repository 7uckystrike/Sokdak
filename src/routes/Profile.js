import React, { useState } from 'react'
import { GrStreetView } from 'react-icons/gr'
import '../styles/Profile.css'



const Profile = ({ userObj, refreshUser }) => {

  const [newDisplayName, setNewDispalyName] = useState(userObj.displayName)

  const onSubmit = async (e) => {
    e.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      });
      refreshUser();
    }
  }

  const onChange = (e) => {
    const {
      target: { value }, 
    } = e;
    setNewDispalyName(value)
  }


  return(
    <div className='Profile'>
      <div className='Profile-content'>
      <p className='User-icon'><GrStreetView /></p>
       <p className='User-name'>{userObj.displayName}</p>
       <form onSubmit={onSubmit}>
          <input 
            type='text' 
            value={newDisplayName} 
            onChange={onChange} 
            placeholder='수정할 닉네임을 입력하세요'
            className='User-name-edit'  />
          <input 
            type='submit'
            value={'완료'}
            className='User-btn'/>
        </form>
      </div>

    </div>
  )
}

export default Profile




