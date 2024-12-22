import { useEffect, useState } from "react";
import { Card } from "../components/Card"
import { IContent } from "../hooks/useContent"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";

export const SharedBrain = () => {
  const [content, setContent] = useState<IContent[]>([]);
  const { id } = useParams()
  const fetchContent = async () => {
    try{
    const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${id}`)
    setContent(res.data.content)
    }catch(error){
      console.log('Something went wrong')
    }
  }

  useEffect(()=>{
    fetchContent()
  },[])

  return (
    <div className='flex gap-2 flex-wrap p-4 justify-center mt-4'>
      {content?.map(c => <Card isSharedView={true} link={c.link} title={c.title} key={c._id} type={c.type} id={c._id} />)}
    </div>
  )
}
