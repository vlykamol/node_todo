
export default function TextInput({icon, className, ...rest}){
  return (
    <div className='flex gap-2 bg-zinc-100 px-4 py-2 rounded-md border-[1px] border-zinc-400'>
      <div>{icon}</div>
      <div className='w-full'>
        <input className={`bg-transparent focus:outline-none w-full ${className}`} {...rest} />
      </div>
    </div>
  )
}
