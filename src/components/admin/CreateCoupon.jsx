import React, { useState } from 'react'
import Layout from '../Layout'
import { ShowError, ShowLoading, ShowSuccess } from '../../utils/messages'
import { createCoupon } from '../../api/apiAdmin';
import { userInfo } from '../../utils/auth';

const CreateCoupon = () => {
    const [values, setValues] = useState({
        loading: false,
        error: false,
        success: false,
        msg: null
    })
    const [code, setCode] = useState((Math.random().toString(36).substring(3, 6) + (new Date().getTime()).toString(36)).split('sif').join(''));
    const generatecode = () => {
        const cc = (Math.random().toString(36).substring(3, 6) + (new Date().getTime()).toString(36)).split('sif').join('');
        setCode(cc);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            loading: true,
            error: false,
            success: false,
        })
        const data = {
            events: e.target.event.value,
            discount: parseInt(e.target.discount.value),
            expirein: e.target.expirein.value,
            code
        }
        const { token } = userInfo();
        createCoupon(token, data)
            .then(respose => {
                setValues({
                    loading: false,
                    error: false,
                    success: true,
                    msg: respose.data
                })
            })
            .catch(err => {
                setValues({
                    ...values,
                    loading: false,
                    error: 'Something went wrong',
                    success: false,
                })
            })
    }
    return (
        <Layout title="Add a new category">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h3>Create Coupon</h3>
                    <ShowLoading loading={values.loading} />
                    <ShowError error={values.error} />
                    <ShowSuccess success={values.success} msg={values.msg} />
                    <button onClick={generatecode} className='btn btn-outline-dark'>Regenerate Code</button>
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Code:</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={code}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Event:</label>
                            <input
                                type="text"
                                name="event"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Discount:</label>
                            <input
                                type="number"
                                name="discount"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Expiration Date:</label>
                            <input
                                name="expirein"
                                className="form-control"
                                type="date"
                                required

                            />
                        </div>
                        <button className="btn btn-outline-primary" type="submit">Create Coupon</button>
                    </form>
                </div >
            </div >
        </Layout >
    )
}

export default CreateCoupon