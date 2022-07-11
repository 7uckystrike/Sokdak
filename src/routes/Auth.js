import React, { useState } from 'react'
import { authService, firebaseinstance } from '../firebase' 
import { RiTwitterLine } from 'react-icons/ri'
import '../styles/Auth.css'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => {
    const {target: {name, value}} = e;
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    let data
    try {
      if(newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch(error) {
      setError(error.message)
    }
  }

  const toggleAccount = () => setNewAccount((prev)=> !prev)

  const onSocialClick = async(e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === 'google') {
      provider = new firebaseinstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data)
  }

  return(
    <div className='Login_main_div'>
      <RiTwitterLine className='Login_twt_logo' />
      <p className='Login_twt_title'>
        Clone Twitter
      </p>
      <form onSubmit={onSubmit} className='Login_form'>
        <input 
          name='email'
          type='email'
          placeholder='email@example.com'
          required
          value={email}
          onChange={onChange}
          className='Login_input'
        />
        <input 
          name='password'
          type='password'
          placeholder='6글자 이상'
          required
          value={password}
          onChange={onChange}
          className='Login_input'
        />
        <input 
          type='submit'
          value={newAccount ? '회원가입' : '로그인'}
          className='Login_submit'
        />
        {error}
      </form>
      <p onClick={toggleAccount} className='Login_join'>{newAccount ? '로그인' : '회원가입'}</p>
      <span></span>
      <button name='google' onClick={onSocialClick}>구글로 로그인</button>
    </div>  
  )
}

export default Auth
