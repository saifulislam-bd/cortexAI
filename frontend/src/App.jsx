import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./utils/firebase";
import { api } from "./utils/axios";

function App() {
  const handleLogin = async (token) => {
    const { data } = await api.post("/auth/login", { token });
    console.log(data);
  };
  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const token = await data.user.getIdToken();
      await handleLogin(token);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black  h-screen w-full flex items-center justify-center">
      <button
        onClick={googleLogin}
        className="bg-white rounded-2 w-50 h-10 cursor-pointer hover:bg-amber-400 duration-150"
      >
        Continue with Google
      </button>
    </div>
  );
}

export default App;
