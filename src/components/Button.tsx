import { ReactElement } from "react"

interface ButtonProps {
    variant: "primary" | "secondary"
    text: string,
    startIcon?: ReactElement
    onClick?: () => void
    isLoading?: boolean
}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const Button = (props: ButtonProps) => {
    const {
        text,
        variant,
        startIcon,
        onClick,
        isLoading
    } = props
    return <button disabled={isLoading} onClick={onClick} className={variantClasses[variant] + ` px-4 py-2 rounded-md flex items-center justify-center gap-2  ${isLoading && "opacity-50"}`}>
        {startIcon}{text}
    </button>
}

export default Button