import { authService, firebaseinstance} from "../firebase"
import { FaStreetView } from "react-icons/fa"
import "../styles/Login.css"

const Login = () => {
  const onGoogleClick = async(event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseinstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data)
  }

  return(
    <div className="Login_box">
      <FaStreetView className="Login_icon" />
      <p className="Login_text">Wel.c SokDak SokDak</p>
      <br/>
      <button onClick={onGoogleClick} name="google">
        입 장
      </button>
    </div>
  )
}

export default Login