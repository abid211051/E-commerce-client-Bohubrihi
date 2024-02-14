import React, { useEffect, useState } from 'react'
import { getReview, postReview } from '../../api/apiReview';
import { userInfo } from '../../utils/auth';
import Reviews from './Reviews';
import { ShowError, ShowSuccess } from '../../utils/messages'

const ReviewForm = ({ id }) => {
    const [reviews, setReviews] = useState([]);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        getReview(id)
            .then(response => setReviews(response.data))
            .catch(err => console.log(err.message))
    }, [])
    const handleReview = (e) => {
        e.preventDefault();
        try {
            const review = {
                prodid: id,
                name: e.target.fname.value,
                ratings: e.target.rating.value,
                feedback: e.target.feed.value
            }
            postReview(userInfo().token, review)
                .then(respose => {
                    setSuccess('Product Added successfully')
                    setReviews([...reviews, respose.data])
                })
                .catch(err => setErr(err.message));
        } catch (error) {
            setErr(error.message)
        }

    }
    return (
        <div className='row container mt-4'>
            <ShowError error={err} />
            <ShowSuccess success={success} msg={success} />
            <h5>Send FeedBack:</h5>
            <form className='col-md-6' onSubmit={handleReview}>
                <div className="mb-2">
                    <label className="form-label m-0">Name:</label>
                    <input type="text" required className="form-control" name='fname' onChange={() => {
                        setErr(false);
                        setSuccess(false);
                    }} />
                </div>
                <div className="mb-2">
                    <label className="form-label m-0 d-block">Ratings:</label>
                    <label className="form-label m-0">1</label>
                    <input type="radio" className="me-2" name='rating' value={1} defaultChecked />
                    <label className="form-label m-0">2</label>
                    <input type="radio" className="me-2" name='rating' value={2} />
                    <label className="form-label m-0">3</label>
                    <input type="radio" className="me-2" name='rating' value={3} />
                    <label className="form-label m-0">4</label>
                    <input type="radio" className="me-2" name='rating' value={4} />
                    <label className="form-label m-0">5</label>
                    <input type="radio" className="" name='rating' value={5} />
                </div>
                <div className="mb-2">
                    <label className="form-label m-0" >FeedBack:</label>
                    <textarea rows={5} className="form-control" name='feed' required onChange={() => {
                        setErr(false);
                        setSuccess(false);
                    }} />
                </div>
                <button type="submit" className="btn btn-outline-dark">Submit</button>
            </form>
            <div className='mt-3 row container'>
                <h5>All Reviews:</h5>
                <hr />
                {reviews && reviews?.map(data => <Reviews key={data._id} data={data} />)}
            </div>
        </div>
    )
}

export default ReviewForm