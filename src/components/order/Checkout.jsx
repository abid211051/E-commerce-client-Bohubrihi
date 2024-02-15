import React, { useState, useEffect } from 'react';
import { applyCoupon, getCartItems, getProfile, offlinepayment, onlinepayment } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import Layout from '../Layout';
import { ShowError, ShowSuccess } from '../../utils/messages';
const Checkout = () => {
    // zddlsj2wamv
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [coupon, setCoupon] = useState({
        code: '',
        discount: 0
    })
    const [orderItems, setOrderItems] = useState([]);
    const [values, setValues] = useState({
        phone: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        state: ''
    });

    const {
        phone,
        address1,
        address2,
        city,
        postcode,
        state
    } = values;

    const loadCart = () => {
        getCartItems(userInfo().token)
            .then(response => setOrderItems(response.data))
            .catch((err => console.log(err)));
    }

    useEffect(() => {
        getProfile(userInfo().token)
            .then(response => setValues(response.data))
            .catch(err => { })
        loadCart();
    }, []);

    const makePayment = (type) => {
        if (type === "online") {
            onlinepayment(userInfo().token, { coupon: coupon.code })
                .then(response => {
                    // window.location.replace(`${response.data.url}`)
                    console.log(response.data)
                })
                .catch(err => console.log(err.message))
        }
        else if (type === "offline") {
            offlinepayment(userInfo().token, { coupon: coupon.code })
                .then(response => {
                    window.location.replace(`${response.data.url}`)
                })
                .catch(err => console.log(err.message))
        }
    }
    const handleCoupon = (e) => {
        e.preventDefault();
        const coupon = e.target.coupon.value;
        if (coupon !== '') {
            applyCoupon(userInfo().token, { coupon: coupon })
                .then(response => {
                    setCoupon({
                        code: response.data.code,
                        discount: response.data.discount
                    });
                })
                .catch(err => setErr(err.message))
        }
    }
    const getOrderTotal = () => {
        const arr = orderItems.map(cartItem => cartItem.price * cartItem.count);
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    }
    const shippinDetails = () => (
        <>
            To,
            <br /> <b>{userInfo().name}</b>
            <br /> Phone: {phone}
            <br /> {address1}
            {address2 ? (<><br />{address2}</>) : ""}
            <br /> {city}-{postcode}, {state}
        </>
    )

    if (address1 && city && phone && postcode && state) return (<>
        <Layout title="Checkout" description="Complete your order!" className="container">
            <ShowError error={err} />
            <ShowSuccess />
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Order</a></li>
                    <li className="breadcrumb-item"><a href="#">Cart</a></li>
                    <li className="breadcrumb-item"><a href="#">Shipping Address</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                </ol>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-5" style={{ height: 'auto' }}>
                            <div className="card-header">Shipping Details</div>
                            <div className="card-body">
                                {shippinDetails()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{ height: 'auto' }}>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    {orderItems.map(item => (<li key={item._id} className="list-group-item" align="right">{item.product ? item.product.name : ""} x {item.count} = ৳ {item.price * item.count} </li>))}
                                </ul>
                            </div>
                            <div className="card-footer">
                                <span className="float-left"><b>Order Total</b></span>
                                <span className="float-right"><b>৳ {getOrderTotal() - (coupon.discount !== 0 ? (getOrderTotal() * (coupon.discount / 100)) : 1)}</b></span>
                            </div>
                            <div className='p-1'>
                                <form action="" onSubmit={handleCoupon}>
                                    <input type="text" className=' me-1' name='coupon' />
                                    <button type='submit'>Coupon</button>
                                </form>
                            </div>
                        </div>
                        <br />
                        <button className='btn btn-warning me-2 mb-2' onClick={() => makePayment('offline')}>Cash on Delivery</button>
                        <button className='btn btn-success' onClick={() => makePayment('online')}>Online Payment</button>
                    </div>
                    <p className='text-danger txtalign'>*There will be 10 taka extra charge for cash on delivery</p>
                </div>
            </div>
        </Layout>
    </>);
    else return <></>
}

export default Checkout;