const Card = ({ product, bg, handleAddToCart }) => {
  return (
    <div className={`sm:w-[220px] w-[210px] ${!bg && "border-2"}`}>
      <div className="w-full relative ">
        <p className="absolute p-0.5 top-0 left-0 bg-red-500 text-white">
          {product?.hot ? "Hot" : product?.trending ? "Trending" : null}
        </p>
        <img
          src={product?.photo || "/arong-earth-honey.png"}
          alt={product?.name || "No Name"}
          className="w-full h-[200px] object-cover"
        />
        <div
          className={`w-full flex flex-col gap-1.5 ${
            bg ? "bg-white text-black" : "text-white"
          } p-1.5 border-t-2`}
        >
          <div>
            <p className="text-lg line-clamp-1">{product?.name || "Test"}</p>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">
              {product?.price || "200"}&#2547;{" "}
            </span>
            <p>
              {product?.quantity <= product?.sold ? (
                <span className="bg-red-700 p-1 text-sm text-white">
                  Stock Out
                </span>
              ) : (
                <span className="bg-[#2a42f4] p-1 text-sm text-white">
                  In Stock
                </span>
              )}
            </p>
          </div>
          <p className="text-sm text-end">Sold: {product?.sold}</p>
          <div className="flex justify-between items-end">
            {product?.quantity ? (
              <button
                className="bg-blue-600 p-2 active:scale-95 text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              ""
            )}
            <a
              href={`/product/${product?._id}`}
              className="underline underline-offset-4"
            >
              Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
