import React from 'react'

function Error({message}) {
    return (
        <div>
            <p className='text-red-500 ml-2 text-sm'>{message}</p>
        </div>
    )
}

export default Error
