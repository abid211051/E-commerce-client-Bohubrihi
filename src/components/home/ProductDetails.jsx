import { useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link } from "react-router-dom";
import { getProductDetails } from "../../api/apiProduct";
import { ShowSuccess, ShowError, ShowLoading } from "../../utils/messages";
import { addToCart } from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";
import ReviewForm from "../user/ReviewForm";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});

  const id = props.match.params.id;
  useEffect(() => {
    getProductDetails(id)
      .then((response) => setProduct(response.data.product))
      .catch((err) =>
        toast.error(err.message, {
          closeButton: true,
          richColors: true,
          position: "top-right",
        })
      );
  }, []);

  const handleAddToCart = (product) => () => {
    if (isAuthenticated()) {
      const user = userInfo();
      const cartItem = {
        user: user._id,
        product: product._id,
        price: product.price,
      };
      addToCart(user.token, cartItem)
        .then((reponse) => {
          toast.success("Item Added to the Cart", {
            closeButton: true,
            richColors: true,
            position: "top-right",
          });
        })
        .catch((err) => {
          toast.error(err.message, {
            closeButton: true,
            richColors: true,
            position: "top-right",
          });
        });
    } else {
      toast.error("Please Login First", {
        closeButton: true,
        richColors: true,
        position: "top-right",
      });
    }
  };

  return (
    <Layout title="Product Page">
      <div className="lg:px-14 lg:py-5 px-2">
        <nav aria-label="breadcrumb" className="py-3">
          <ol className="flex gap-2">
            <li className="">
              <Link to="/">Home</Link>
            </li>
            <li>{">"}</li>
            <li className="">
              <a href="#">Product</a>
            </li>
            <li>{">"}</li>
            <li className=" active" aria-current="page">
              {product.category ? product.category.name : ""}
            </li>
          </ol>
        </nav>
        <div className="w-full grid md:grid-cols-5 gap-4 md:justify-around">
          <div className="md:col-start-1 md:col-span-2 bg-white flex flex-col items-center gap-3">
            <img
              src={product.photo || "/assets/image.png"}
              alt={product.name}
              className=""
            />
          </div>
          <div className="md:col-start-3 md:col-span-3 flex flex-col gap-4">
            <h3 className="text-3xl font-medium">{product.name}</h3>
            <span style={{ fontSize: 20 }} className="font-medium">
              &#2547;{product.price}
            </span>
            <hr />
            <div className="flex gap-2 items-center">
              <span>Rating: </span>
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
              <Star size={14} />
            </div>
            <p>
              {product.quantity ? (
                <span className="p-1.5 bg-green-500 rounded-md text-white">
                  In Stock
                </span>
              ) : (
                <span className="p-1.5 bg-red-500 rounded-md text-white">
                  Out of Stock
                </span>
              )}
            </p>
            {product.quantity ? (
              <>
                &nbsp;
                <button
                  className="p-2 bg-black text-white rounded-md active:scale-95"
                  onClick={handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </>
            ) : null}
          </div>
        </div>
        <Tabs defaultValue="details" className="w-full mt-10">
          <TabsList className={"w-full h-10"}>
            <TabsTrigger value="feedbacks" className={"p-2"}>
              Feedbacks
            </TabsTrigger>
            <TabsTrigger value="details">Description</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <p className="text-lg text-gray-700 py-3">{product.description}</p>
          </TabsContent>
          <TabsContent value="feedbacks">
            <ReviewForm id={id} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProductDetails;
