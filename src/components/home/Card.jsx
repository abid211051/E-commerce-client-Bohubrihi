import React from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../utils/config';

const Card = ({ product, handleAddToCart }) => {
    const titleStyle = {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        maxHeight: "2em",
        lineHeight: "1em"
    }
    const imgStyle = {
        height: 250,
        objectFit: "cover",
        objectPosition: "0px 0px"
    }
    return (
        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12 mb-3">
            <div className="card">
                <img
                    src={product.photo}
                    alt={product.name}
                    style={imgStyle}
                    className="card-img-top"
                />
                <div className="card-body">
                    <div style={{ minHeight: "3em" }}>
                        <p style={titleStyle} className='fs-5 fw-medium'>{product.name}</p>
                    </div>
                    <span style={{ fontSize: 20 }}>{product.price}&#2547; </span>
                    <div className='flex mt-2'>
                        <p><span className="text-light px-2 bg-primary py-1">Sold: {product.sold}</span></p>
                        <p>{product.quantity <= product.sold ? (<span className="text-light px-2 py-1 bg-danger rounded-5">Stock Out</span>) : (<span className="text-light px-2 py-1 bg-success rounded-5">In Stock</span>)}</p>

                    </div>
                    <div className='flex justify-content-between'>
                        <a href={`/product/${product._id}`}>
                            <button className="btn btn-outline-warning btn-sm">View Product</button>
                        </a>
                        {product.quantity ? <>
                            &nbsp;<button className="btn btn-outline-primary btn-sm" onClick={handleAddToCart} >Add to Cart</button>
                        </> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;