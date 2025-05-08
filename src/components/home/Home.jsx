import { useState, useEffect } from "react";
import Layout from "../Layout";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getTrendingHot } from "../../api/apiProduct";

import Hero from "./hero";
import Card from "./Card";
import { toast } from "sonner";
import Footer from "./footer";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { addToCart } from "../../api/apiOrder";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getTrendingHot()
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((err) => {
        toast.error(err.message, {
          closeButton: true,
          richColors: true,
          position: "top-right",
        });
      });
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
    <Layout title="Home Page" className="">
      <Hero products={products} />
      <div className="">
        <div className="sm:p-10 p-2 w-full min-h-[300px] bg-gradient-to-bl from-red-900 via-zinc-900 to-zinc-900 gap-5">
          <div className="flex justify-between gap-3 items-start">
            <p className="text-white sm:text-4xl text-2xl mb-6 uppercase font-semibold">
              Trending Products
            </p>
            <a
              href="/allproduct"
              className="text-orange-50 underline underline-offset-4 sm:text-base text-sm"
            >
              All PRODUCTS
            </a>
          </div>
          {products.length ? (
            <Carousel
              opts={{
                align: "center",
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full py-3 flex justify-between items-center"
            >
              <CarouselContent>
                {products.length &&
                  products.map((product) =>
                    product.trending ? (
                      <CarouselItem
                        key={product._id}
                        className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <Card
                          product={product}
                          bg={null}
                          handleAddToCart={handleAddToCart(product)}
                        />
                      </CarouselItem>
                    ) : null
                  )}
              </CarouselContent>
            </Carousel>
          ) : null}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
