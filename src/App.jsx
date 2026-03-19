import { useEffect } from "react"
import { autApi } from "./services/api";

function App() {

  useEffect(() => {
    const payload = {
      email: "test@gmail.com",
      password: "124"
    }
    const data = autApi.login(payload);
    console.log("data", data);
  }, []);

  return (
    <div className='min-w-screen min-h-screen'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, architecto!
    </div>
  )
}

export default App
