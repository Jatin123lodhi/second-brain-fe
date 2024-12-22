import { useRef } from "react"
import Button from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()

  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    console.log(username,password)
    try{
      const res = await axios.post(`${BACKEND_URL}/api/v1/signup`,{username,password})
      if(res.status===200){
        alert('Signup successfull!')
        navigate('/signin')
      }
    }catch(error){
      console.log(error)
      alert("Something went wrong: Username already exists")
    }
  
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="">
        <div className="text-l font-bold">Signup</div>
        <div className=" bg-white shadow-md rounded p-4 flex flex-col gap-2">
            <Input inputRef={usernameRef} placeholder="Username" />
            <Input inputRef={passwordRef} placeholder="Password" />
            <Button onClick={signup} text="Signup" variant="primary" isLoading={false} />
        </div>
        <Link to={"/signin"} className="mt-2 underline">Signin?</Link>
      </div>
    </div>
  )
}

export default Signup