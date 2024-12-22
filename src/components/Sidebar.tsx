import { useNavigate } from "react-router-dom"
import { ContentType } from "../enum"
import { Logo } from "../icons/Logo"
import { Logout } from "../icons/Logout"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"
interface SidebarProps{
  handleFilter: (type: ContentType) => void
}
export const Sidebar = ({handleFilter}: SidebarProps) => {
  const navigate = useNavigate();
  const handleLogout =  () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }
   
  return (
    <div className="fixed left-0 top-0 h-screen shadow-md bg-white w-60 p-2 pl-4">
        <div onClick={() => handleFilter(ContentType.All)} className="flex gap-2 items-center hover: border cursor-pointer">
          <div><Logo/></div>
          <div>Second Brain</div>
        </div>
        <div className="flex flex-col  mt-4">
            <SidebarItem onClick={() => handleFilter(ContentType.Twitter)} icon={<TwitterIcon/>} text="Twitter"/>
            <SidebarItem onClick={() => handleFilter(ContentType.Youtube)} icon={<YoutubeIcon/>} text="Youtube"/>
            <SidebarItem onClick={handleLogout} icon={<Logout/>} text="Logout"/>
        </div>
    </div>
  )
}
