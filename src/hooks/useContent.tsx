import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ContentType } from "../enum";

export interface IContent {
    id: string;
    title: string;
    description: string;
    link: string;
    userId: string;
    __v: number;
    type: ContentType
  }
export const useContent = () => {
    const [content, setContent] = useState<IContent[]>([]);
    const fetchContent = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/content`, { headers: { "Authorization": localStorage.getItem('token') } })
          console.log(res.data)
          setContent(res.data)
        } catch (error) {
          console.log(error,'  -----error')
          alert("Something went wrong")
        }
      }
    
      useEffect(() => {
        fetchContent()
      }, [])
  return {content, fetchContent}
}
