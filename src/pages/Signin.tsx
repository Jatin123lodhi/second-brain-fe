import axios from "axios"
import Button from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const navigate = useNavigate()


  const signin = async () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    console.log(username,password)
    try{
      const res = await axios.post(`${BACKEND_URL}/api/v1/signin`,{username,password})
      localStorage.setItem('token',res.data.token)
      navigate('/dashboard')

    }catch(error){
      alert("somethin went wrong")
    }
     
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="">
        <div className="text-l font-bold">Signin</div>
        <div className=" bg-white shadow-md rounded p-4 flex flex-col gap-2">
            <Input inputRef={usernameRef}  placeholder="Username" />
            <Input inputRef={passwordRef} placeholder="Password" />
            <Button onClick={signin} text="Signin" variant="primary" isLoading={false} />
        </div>
        <Link to={"/signup"} className="mt-2 underline">Signup?</Link>
      </div>
    </div>
  )
}

export default Signin