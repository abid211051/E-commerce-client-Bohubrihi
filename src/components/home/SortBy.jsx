import React from 'react'

const SortBy = ({ handleSortAndOrder }) => {
    const handleChange = (e) => {
        if (e.target.name === 'asc_desc') {
            handleSortAndOrder({ 'asc_desc': e.target.value });
        }
        if (e.target.name === 'prod_cond') {
            handleSortAndOrder({ 'prod_cond': e.target.value });
        }
    }
    return (
        <>
            <div className='mb-4'>
                <h5>Order By:</h5>
                <div className="form-check">
                    <input className="form-check-input" onChange={handleChange} defaultChecked value={'desc'} type="radio" name="asc_desc" />
                    <label className="form-check-label">
                        High to Low
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" onChange={handleChange} value={'asc'} type="radio" name="asc_desc" />
                    <label className="form-check-label">
                        Low to High
                    </label>
                </div>
            </div>
            <div>
                <h5>Sort By:</h5>
                <div className="form-check">
                    <input className="form-check-input" onChange={handleChange} value={'price'} type="radio" name="prod_cond" />
                    <label className="form-check-label">
                        Price
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" onChange={handleChange} defaultChecked value={'sold'} type="radio" name="prod_cond" />
                    <label className="form-check-label">
                        Sold
                    </label>
                </div>
            </div>
        </>
    )
}

export default SortBy