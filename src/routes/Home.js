import { useState, useEffect } from 'react'
import { dbService } from '../firebase'
import Twitter from '../components/Twitter'
import Create from '../components/Create'
import '../styles/Home.css'

const Home = ({ userObj }) => {
  const [sokdakText, setSokdakText] = useState([]);

  useEffect(() => {
    dbService.collection("sdbox").onSnapshot((snapshot) => {
      const sdboxArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSokdakText(sdboxArray);
      console.log(sokdakText)
    })
  }, [])

  return (
    <div className='Home'>
      <Create userObj={userObj} />
      <div className='HomeList'>
        {sokdakText.map((sokdakText) => (
          <Twitter key={sokdakText.id}
                   sokdakObj={sokdakText}
                   isOwner={sokdakText.creatorId === userObj.uid}
                   userId={userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home