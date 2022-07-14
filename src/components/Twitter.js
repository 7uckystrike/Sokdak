import { useState } from 'react'
import { dbService, storageServise } from '../firebase';
import { doc, deleteDoc, updateDoc }from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import { BiEdit, BiTrash, BiPlus, BiRightArrowAlt } from 'react-icons/bi'


import '../styles/Twitter.css'

const Twitter = ({ isOwner, sokdakObj }) => {
  const [edit, setEdit] = useState(false)
  const [newText, setNewText] = useState(sokdakObj.text)
  const [button, setButton] = useState("🤍")

  const newTextRef = doc(dbService, 'sdbox', `${sokdakObj.id}`)
  const ImageRef = ref(storageServise, sokdakObj.attachmentUrl);

  const toggleEdit = () => {setEdit((prev) => !prev)}

  const onSubmit = async(event) => {
    event.preventDefault();
    setEdit(false);
    console.log(sokdakObj.id, newText);
    await updateDoc(newTextRef, {
      text: newText,
    })
  }

  const onDeleteClick = async () => { 
    const ok = window.confirm('정말 지우시겠습니까?');        
    if(ok) {
       await deleteDoc(newTextRef)
       await deleteObject(ImageRef)
  }}

  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewText(value)
  }
  // 좋아요
  const onHeartClick = () => {
    if(button === "🤍") {
      setButton("💛")
    } else {
      setButton("🤍")
    }
  }



  //시계
  const getTweetDate = () => {
    const createdDate = new Date(sokdakObj.createdAt);
    const year = createdDate.getFullYear();
    const month = createdDate.getMonth() + 1;
    const date = createdDate.getDate();
    const hours = String(createdDate.getHours()).padStart(2, '0');
    const minutes = String(createdDate.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${date} ${hours}:${minutes}`;
  };

  return(
    <div>
      {edit ? (
        <div>
          <form onSubmit={onSubmit}>
            <div className='Edit-div'>
              <textarea onChange={onChange}
                        value={newText} 
                        className='Edit-area'
                        minLength='1'
                        maxLength='120'
                        required 
              />
            </div>
            <div className='Edit-btn'>
              <button className='Btn-icon'><BiPlus /></button>
              <button className='Btn-icon' onClick={toggleEdit}><BiRightArrowAlt /></button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className='Twitter-main'>
            <div className='Twitter-content'>
              <div className='Twitter-view'>
                <p className="Twitter-nickname">{sokdakObj.creatorName}</p> 
                <p className="Twitter-date">{getTweetDate()}</p>
              </div>
                {isOwner && (
                  <div className='Twitter-view'>
                    <button onClick={toggleEdit} className='Btn-icon' style={{marginRight:'5px'}}><BiEdit /></button>
                    <button onClick={onDeleteClick} className='Btn-icon'><BiTrash /></button>              
                  </div>
                 )}
              </div>
            <div className='Twitter-title'>
              {sokdakObj.text}
            </div>
            <div>
              {sokdakObj.fileUrl && <img src={sokdakObj.fileUrl} width="250px" height="auto" />} 
            </div>
            <div className='Twitter-like'>
                <div>
                  <button className='Btn-heart' onClick={onHeartClick}>{button}</button>
                </div> 
            </div>           
          </div>
        </>  
      )}
    </div>
  )}

export default Twitter