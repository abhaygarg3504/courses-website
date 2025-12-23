import React, { useEffect, useRef, useState } from 'react'

const Notification = (props) => {
    const [input, setinput] = useState("")

    const inputFocus = useRef();

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(input === props.name){
            props.onDelete(true)
        }
    }

    const handleCancel = () => {
        props.handleCancel(false)
    }


    return (
        <div className={ 'w-full h-screen fixed inset-0 bg-gray-600 bg-opacity-20 left-0 z-[9999]'}>
            <div className={`w-full h-full flex justify-center items-center m-auto sm:w-96  rounded-md py-2`}>
                <div className='h-fit sm:w-96 w-[95%] bg-white text-lg rounded-lg p-6'>
                    <h1 className='text-2xl'>{props.name} Proxy ?</h1>
                    <p className='text-red-500 text-sm py-3'>Warning : This action can not be undone</p>
                    <div className='flex flex-col justify-center items-start gap-3'>
                        <input value={input} ref={inputFocus} className='border-b-2 w-fit border-red-500 text-sm outline-none' onChange={e=>setinput(e.target.value)} type="text" name="delete" id="delete" placeholder={`Type '${props.name}' to proceed`} />
                        <div className='w-full flex justify-end gap-4 text-gray-400 text-sm'>
                            <button className='border-2 rounded-md border-gray-500 py-1 px-2' type='submit' onClick={handleCancel}>Cancel</button>
                            <button className='border-2 rounded-md border-gray-500 py-1 px-2' type='submit' onClick={handleSubmit}>{props.name}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification