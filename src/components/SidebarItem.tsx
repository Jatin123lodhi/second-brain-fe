import { ReactElement } from "react"

interface SidebarItemProps{
    icon: ReactElement
    text: string
    onClick: () => void
}

export const SidebarItem = ({icon,text, onClick}:SidebarItemProps) => {
  return (
    <div onClick={onClick} className=" flex gap-4 cursor-pointer items-center  p-2 pl-0">
        <div>{icon}</div>
        <div>{text}</div>
    </div>
  )
}
