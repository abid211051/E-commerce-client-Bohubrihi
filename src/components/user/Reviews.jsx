import React from 'react'

const Reviews = ({ data }) => {
    let star = [];
    for (let i = 0, j = 0; i < 5; i++, j++) {
        if (j < parseInt(data.ratings)) {
            star.push(<span className='text-warning fs-4' key={i}>&#9733;</span>)
        }
        else {
            star.push(<span className='fs-4' key={i}>&#9734;</span>)
        }
    }
    return (
        <>
            <div className="alert alert-success" role="alert">
                <h5 className="">Name: {data.name}</h5>
                <p>{data.feedback}</p>
                <hr className='m-0' />
                <p className="mb-0 fs-5 p-0">
                    {star}
                </p>
            </div>
        </>
    )
}

export default Reviews