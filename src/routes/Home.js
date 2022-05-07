import "../styles/Home.css"
import SokDak from "../components/Sokdak"
import { useState, useEffect, useRef } from "react"
import { dbService, storageServise } from "../firebase"
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { FaTrashAlt, FaCamera, FaRegPaperPlane } from "react-icons/fa"
import { v4 as uuidv4 } from "uuid"



const Home = ({ userObj }) => {
  const [sokdak, setSokdak] = useState("")
  const [sokdakText, setSokdakText] = useState([]);
  const [file, setFile] = useState("");

  const onSubmit = async(event) => {
    event.preventDefault();
    let fileUrl = "";
    if (file !== "") {
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
    await dbService.collection("sdbox").add(sdTextbucket)
    setSokdak("")
    setFile("");
  }

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSokdak(value);
  };

  useEffect(() => {
    dbService.collection("sdbox").onSnapshot((snapshot) => {
      const sdboxArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSokdakText(sdboxArray);
    })
  }, [])

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
    setFile("");
    fileInput.current.value = "";
  }

  return (
    <div>
      <h1 className="Home_tilte">
        Hi, firends ! 
        <br/>
        Let's hang out together
      </h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className="Home_text_box">
            <textarea
              placeholder="٩(๑❛ワ❛๑)و" 
              maxLength={300}
              onChange={onChange} 
              value={sokdak}
              className="Home_text"
            />
          <div className="Home_img_veiw">
            {file && (
              <>
                <input type="image" img src={file} width="200px" height="auto" className="Home_img" />
                <button onClick={onClearPhoto} className="Home_img_del"><FaTrashAlt /></button>
              </>
            )}
          </div>  
          <div className="Home_text_footer">
            <label htmlFor="file_input" className="Home_icon"><FaCamera /></label>
            <input type="file" 
                   accept="image/*"
                   onChange={onFileChange}
                   ref={fileInput} 
                   id="file_input"
                   style={{display:"none"}} 
            />
            <button className="Home_icon"><FaRegPaperPlane/></button>
          </div>
          </div>
        </form>
        <div>
          {sokdakText.map((sokdakText) => (
            <SokDak key={sokdakText.id}  
                    sokdakObj={sokdakText}
                    isOwner={sokdakText.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home