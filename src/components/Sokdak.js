import "../styles/Sokdak.css"
import { dbService } from "../firebase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { FaCheck, FaHighlighter, FaTrashAlt, FaUndoAlt } from "react-icons/fa"
import { useState } from "react"

const Sokdak = ({ isOwner, sokdakObj }) => {
  const [edit, setEdit] = useState(false)
  const [newText, setNewText] = useState("")

  const newTextRef = doc(dbService, "sdbox", `${sokdakObj.id}`)

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
    const ok = window.confirm("삭제삭제 슥싹슥싹");        
    if(ok) {
       await deleteDoc(newTextRef)
  }}

  const onChange = (event) => {
    const {
      target: { value }
    } = event;
    setNewText(value)
  }

  return(
    <>
      {edit ? (
        <>
          <form onSubmit={onSubmit} className="Sokdak_box">
            <textarea onChange={onChange}
                   value={newText} 
                   className="Sokdak_edit"
                   maxLength={300}
                   required 
            />
              <div className="Sokdak_edit_box">
                <button className="Sokdak_edit_btn"><FaCheck /></button>
                <button className="Sokdak_edit_btn" onClick={toggleEdit}><FaUndoAlt /></button>
              </div>
          </form>
        </>
      ) : (
        <>
          <div className="Sokdak_box">
            <div className="Sokdak_text">
              {sokdakObj.text}
            </div>
            <div>
              {sokdakObj.fileUrl && <img src={sokdakObj.fileUrl} width="400px" height="auto" />} 
            </div>
            <div className="Sokdak_btn">
              {isOwner && (
                <>
                  <button onClick={toggleEdit} style={{marginRight:"10px"}}><FaHighlighter /></button>
                  <button onClick={onDeleteClick}><FaTrashAlt /></button>
                </>
              )}
            </div>
          </div>
        </>
      )}  
    </>
  )}

export default Sokdak