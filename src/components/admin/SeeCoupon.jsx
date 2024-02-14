import React, { useEffect, useState } from 'react'
import { getCoupon } from '../../api/apiAdmin'
import { userInfo } from '../../utils/auth'
const SeeCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        const { token } = userInfo();
        getCoupon(token)
            .then(response => {
                setCoupons(response.data);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])
    return (
        <>
            {coupons && coupons?.map((item) => (
                <div className="card mb-3" key={item?._id}>
                    <div className="card-header">
                        {item?.code}
                    </div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>Events: {item?.events}</p>
                            <footer className="blockquote-footer">Discount: <cite title="Source Title">{item?.discount}%</cite></footer>
                        </blockquote>
                    </div>
                </div>
            ))}
        </>
    )
}

export default SeeCoupon