import { GitCompare, RotateCw } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";
import { toast } from "sonner";
const Hero = ({ products, loading }) => {
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
    <div className="flex flex-col justify-evenly bg-gradient-to-r from-zinc-900 to-slate-700 text-white py-3 lg:py-14 lg:px-10 px-2 gap-10">
      {loading ? (
        <p className="w-fit flex flex-col gap-3 text-lg font-semibold px-2 mx-auto text-white">
          <span>
            Initial loading can take up to minute. Please wait ... :{")"}
          </span>

          <RotateCw className="mx-auto animate-spin" />
        </p>
      ) : products.length > 0 ? (
        <>
          <h1 className="md:text-3xl text-xl font-semibold px-2">
            Shop Our Premium product
          </h1>
          <Carousel
            opts={{
              align: "center",
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full flex justify-between items-center p-0 m-0"
          >
            <CarouselContent className={"p-0 m-0"}>
              {products?.length
                ? products.map((product) =>
                    product?.hot ? (
                      <CarouselItem
                        key={product._id}
                        className="basis-1/1  px-2"
                      >
                        <div className="flex lg:flex-row flex-col w-full justify-around gap-8">
                          <div className="flex flex-col gap-10 justify-around">
                            <h1 className="md:text-6xl text-3xl font-semibold">
                              Buy{" "}
                              <span className="text-orange-400">
                                {product?.name}
                              </span>{" "}
                              now in just {product?.price}/- taka
                            </h1>
                            <button
                              className="p-2 active:scale-95 bg-amber-600 w-fit rounded-md"
                              onClick={handleAddToCart(product)}
                            >
                              Add To Cart
                            </button>
                          </div>
                          <img
                            src={product?.photo || "/assets/image.png"}
                            alt=""
                            className="rounded-md xl:w-[400px] xl:h-[390px] sm:w-[350px] sm:h-[350px] mx-auto"
                          />
                        </div>
                      </CarouselItem>
                    ) : null
                  )
                : null}
            </CarouselContent>
          </Carousel>
        </>
      ) : (
        <p className="md:text-2xl text-lg font-semibold px-2 mx-auto">
          No Feature Products Currently available :{"("}
        </p>
      )}
      <div className="flex sm:flex-row flex-col justify-start md:gap-14 gap-7">
        <div className="flex items-center">
          <GitCompare className="mr-2" />
          <div className="pl-2 border-l-2 text-sm border-amber-600">
            <p>Free Shiping</p>
            <p className="italic">On All Order Over 500 tk</p>
          </div>
        </div>
        <div className="flex items-center">
          <GitCompare className="mr-2" />
          <div className="pl-2 border-l-2 text-sm border-amber-600">
            <p>Tested & Proven</p>
            <p className="italic">High Quality Standard</p>
          </div>
        </div>
        <div className="flex items-center">
          <GitCompare className="mr-2" />
          <div className="pl-2 border-l-2 text-sm border-amber-600">
            <p>Customer Services</p>
            <p className="italic">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
