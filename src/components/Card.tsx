import { ContentType } from "../enum"
import { DeleteIcon } from "../icons/DeleteIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"

interface CardProps {
    title: string
    link: string
    type: ContentType
    id: string
    handleDelete?: () => void
    isSharedView?: boolean
}

export const Card = (props: CardProps) => {
    
    
    return (
        <div className="bg-white rounded max-w-72  shadow-md p-4  ">
            <div className="flex items-center gap-2 justify-between mb-2">
                <div className="flex">
                    {props.type === ContentType.Twitter ? <TwitterIcon /> : <YoutubeIcon/>}
                </div>
                <div className="flex min-w-40 font-medium">{props.title}</div>
                <div className="flex gap-1 items-center">
                    <a href={props.link} target="_blank">
                        <ShareIcon />
                    </a>
                    {!props.isSharedView && 
                    <div onClick={props.handleDelete} className="cursor-pointer">
                        <DeleteIcon />
                    </div>
                    }
                </div>
            </div>
            {
                props.type === ContentType.Youtube ? <iframe
                    className="w-full"
                    src={props.link?.replace('watch?v=','embed/')}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                /> : <div className=" max-h-40 overflow-clip"><blockquote className="twitter-tweet">
                    <a href={props.link.replace('x','twitter')}></a> 
                </blockquote></div>
            }


        </div >
    )
}