import { useEffect, useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import Button from "./Button"
import { Input } from "./Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ContentType } from "../enum"
import { IContent } from "../hooks/useContent"

interface CreateContentModalProps {
    open: boolean
    onClose: () => void
    onSuccess: () => void
    actionType: 'Add' | 'Edit'
    initialContent: IContent | null
}


export const CreateContentModal = ({ open, onClose, onSuccess, actionType, initialContent }: CreateContentModalProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type,setType] = useState<ContentType>(ContentType.Youtube)

    useEffect(()=>{
        if(actionType === 'Edit' && initialContent){
            if(titleRef.current) titleRef.current.value = initialContent.title
            if(linkRef.current) linkRef.current.value = initialContent.link
            setType(initialContent.type)
        } 
    },[actionType,initialContent])

    const handleSubmit = async () =>{
        const title = titleRef.current?.value
        const link = linkRef.current?.value
        try{
            
            const res = actionType === 'Add' ? 
             await axios.post(`${BACKEND_URL}/api/v1/content`,{title,link,type},
                {
                    headers: {
                        "authorization" : localStorage.getItem('token')
                    }
                }
            ) :
             await axios.put(`${BACKEND_URL}/api/v1/content/${initialContent?.id}`,{title,link,type},
                {
                    headers: {
                        "authorization" : localStorage.getItem('token')
                    }
                }
            )
            if(res.status==200){
                onSuccess()
                onClose()
            }
        }catch(error){
            alert('Something went wrong')
        }
    }

    return open && <div onClick={onClose} className="h-screen w-screen fixed top-0 left-0 bg-gray-600 opacity-90 flex justify-center items-center">
            <div onClick={(e)=>e.stopPropagation()}  className="bg-white p-4 rounded opacity-100">
                <div className="flex justify-between items-center">
                    {actionType} content
                    <button onClick={onClose} >
                        <CrossIcon />
                    </button>
                </div> 
                <div className="flex flex-col gap-2 mt-3">
                    <Input inputRef={titleRef}  placeholder="Title" />
                    <Input inputRef={linkRef} placeholder="Link" />
                    <div className="flex items-center gap-2">
                        <span>Content type: </span>
                        <Button onClick={() => setType(ContentType.Youtube)} text="youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} />
                        <Button onClick={() => setType(ContentType.Twitter)} text="twitter" variant={type === ContentType.Twitter ? "primary" : "secondary" } />
                    </div>
                    <Button onClick={handleSubmit} text="Submit" variant="primary" />
                </div>
            </div>
    </div>
}

