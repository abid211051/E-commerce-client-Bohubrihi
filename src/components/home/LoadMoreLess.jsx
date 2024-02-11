import React from 'react'

const LoadMoreLess = ({ handlemoreAndLess }) => {
    const handlechange = (value) => {
        handlemoreAndLess(value)
    }
    return (
        <>
            <div className='flex justify-content-center'>
                <button type="button" className="btn btn-info me-5" onClick={() => handlechange('prev')}>Previous</button>
                <button type="button" className="btn btn-warning" onClick={() => handlechange('next')}>More</button>
            </div>
        </>
    )
}

export default LoadMoreLess;