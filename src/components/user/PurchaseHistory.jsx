import React, { useEffect, useState } from 'react'
import { paymentHistory } from '../../api/apiOrder'

const PurchaseHistory = ({ token }) => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        paymentHistory(token)
            .then(response => setTransactions(response.data))
            .catch(err => console.log(err.message))
    }, [])
    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            {transactions && transactions?.map((item) => {
                return (
                    <div className="card text-left mb-2 p-0" key={item._id}>
                        <div className="card-header m-0 p-1 py-2">
                            <span className='fw-bold'>Transaction ID: </span>{item.transactionId}
                        </div>
                        <div className="card-body m-0 p-1">
                            <div className='mb-2'>
                                {item?.cartitems.map((prod) => (
                                    <span key={prod._id} className='text-bg-dark p-1 rounded-2 me-2'><span className='fs-5'>{prod.count}</span>*<span className='fs-5'>{prod.product.name}</span></span>
                                ))}
                            </div>
                            <p className="card-text p-0 m-0">{item.customer.deliveryAddress.address1}, {item.customer.deliveryAddress.postcode}</p>
                            <p className='fw-bold m-0 p-0'>Total Cost: <span className='fw-normal fs-5'>{parseFloat(item.price).toFixed(2)}</span><span className='fs-3'>৳</span></p>
                            <div className="">
                                <span className='fw-bold'>Payment Status:</span> <span className={item.paymentStatus !== 'Success' ? 'text-warning p-1 fw-bold' : 'text-success fw-bold p-1'}>{item.customer.paymentType} [{item.paymentStatus}]</span >
                            </div>
                        </div>
                        <div className="card-footer text-body-secondary m-0 p-1">
                            Order Date: {item.orderTime}
                        </div>
                    </div>
                )
            })}
        </div >

    )
}

export default PurchaseHistory