import React from 'react'

const LoadMoreLess = ({ handlemoreAndLess }) => {
    const handlechange = (value) => {
        handlemoreAndLess(value)
    }
    return (
        <>
            <div className='flex justify-content-around'>
                <button type="button" className="btnwidth" onClick={() => handlechange('prev')}>
                    <img src="./assets/left.png" alt="" className='w-50' />
                    <span className='fs-5'>Prev</span>
                </button>
                <button type="button" className="btnwidth" onClick={() => handlechange('next')}>
                    <span className='fs-5'>Next</span>
                    <img src="./assets/right.png" alt="" className='w-50' />
                </button>
            </div>
        </>
    )
}

export default LoadMoreLess;