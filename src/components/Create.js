import { useState, useRef } from 'react'
import { dbService, storageServise } from '../firebase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { BiCamera, BiPencil, BiXCircle } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid'

import '../styles/Create.css'

const Create = ({ userObj }) => {
  const [sokdak, setSokdak] = useState('')
  const [file, setFile] = useState('');

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSokdak(value);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    let fileUrl = '';
    if (file !== '') {
      const fileRef = ref(storageServise, `${userObj.uid}/${uuidv4()}`)
      const uploadFile = await uploadString(fileRef, file, "data_url")
      fileUrl = await getDownloadURL(uploadFile.ref)
    }
    
    const sdTextbucket = {
      text: sokdak,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl
    }
  
    console.log(sdTextbucket)
    await dbService.collection('sdbox').add(sdTextbucket)
    setSokdak('')
    setFile('');
  }

  const onFileChange = (event) => {
    const {
      target : { files },
    } = event
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget : { result },
      } = finishedEvent;
      setFile(result)
    }
    reader.readAsDataURL(theFile);
  }

  const fileInput = useRef();

  const onClearPhoto = () => {
    setFile('');
    fileInput.current.value = '';
  }

return (
  <>
    <form onSubmit={onSubmit} className='Create-form'>
      <textarea
        placeholder='무슨 일이 일어나고 있나요?'
        minLength='1' 
        maxLength='120'
        onChange={onChange}
        value={sokdak}
        className='Create-area'
        required
      />
      <div className='File-box'>
        {file && (
          <>
            <input 
              type='image' 
              img src={file} 
              className='File-img' 
            />
            <button 
              onClick={onClearPhoto} 
              className='Btn-cancel'>
              <BiXCircle  />
            </button>
          </>
        )}
      </div>
      <div className='Create-img'>
        <label 
          htmlFor='file-input'
          className='Create-icon'>
          <BiCamera />
        </label>
        <input type='file'
               id='file-input'
               accept='image/*'
               onChange={onFileChange}
               ref={fileInput}
               style={{display:"none"}} 
        />
        <button className='Create-icon'>
          <BiPencil />
        </button>
      </div>
    </form>
  </>
)}















export default Create