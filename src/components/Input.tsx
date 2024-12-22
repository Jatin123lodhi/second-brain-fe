interface InputProps{
    onChange?: () => void
    placeholder: string
    inputRef: any
}
export const Input = ({onChange,placeholder,inputRef}: InputProps) => {
    return <input ref={inputRef} className="px-4 p-2 border border-gray-400 rounded" onChange={onChange} placeholder={placeholder} />
}