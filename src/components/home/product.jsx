import { useEffect, useState } from "react";
import Layout from "../Layout";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import SortBy from "./SortBy";
import { prices } from "../../utils/prices";
import {
  getCategories,
  getFilteredProducts,
  getProducts,
} from "../../api/apiProduct";
import { addToCart } from "../../api/apiOrder";
import { ArrowDownUp, ArrowDownWideNarrow, RotateCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Card from "./Card";
import LoadMoreLess from "./LoadMoreLess";
import SearchBar from "./SearchBar";
import { Carousel, CarouselContent } from "../ui/carousel";
import { authenticate, isAuthenticated, userInfo } from "../../utils/auth";
import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";

export default function AllProduct() {
  const que = new URLSearchParams(window.location.search);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("sold");
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });

  useEffect(() => {
    setLoading(true);
    getProducts(sortBy, order, limit, skip, search)
      .then((response) => {
        setProducts(response.data.product);
        if (response.data.count <= skip || skip < 0) {
          setSkip(0);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message, {
          closeButton: true,
          richColors: true,
          position: "top-right",
        });
        setLoading(false);
      });
  }, [order, sortBy, skip]);

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response.data.category))
      .catch((err) =>
        toast.error(err.message, {
          closeButton: true,
          richColors: true,
          position: "top-right",
        })
      );
    if (que.size > 0) {
      authenticate(que.get("token"), () => {});
    }
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

  const handleFilters = (myfilters, filterBy) => {
    const newFilters = { ...filters };
    if (filterBy === "category") {
      newFilters[filterBy] = myfilters;
    }

    if (filterBy === "price") {
      const data = prices;
      let arr = [];
      for (let i in data) {
        if (data[i].id === parseInt(myfilters)) {
          arr = data[i].arr;
        }
      }
      newFilters[filterBy] = arr;
    }
    setFilters(newFilters);

    getFilteredProducts(skip, limit, newFilters, order, sortBy, search)
      .then((response) => setProducts(response.data.product))
      .catch((err) => setError("Failed to load products!"));
  };

  const handleSortAndOrder = (val) => {
    if (Object.keys(val)[0] === "asc_desc") {
      const newOrder = Object.values(val)[0];
      setOrder(newOrder);
    }
    if (Object.keys(val)[0] === "prod_cond") {
      const newSort = Object.values(val)[0];
      setSortBy(newSort);
    }
  };

  const handlemoreAndLess = (val) => {
    if (val === "prev") {
      setSkip((prev) => prev - 5);
    } else if (val === "next") {
      setSkip((prev) => prev + 5);
    }
  };

  const handleSearch = (prod, searchval) => {
    if (prod === null) {
      setSearch(searchval);
    } else {
      setProducts(prod);
      setSearch(searchval);
    }
  };

  return (
    <Layout>
      <SearchBar
        handleSearch={handleSearch}
        sortBy={sortBy}
        order={order}
        limit={limit}
        skip={skip}
      />
      <div className="min-h-screen  grid lg:grid-cols-4 gap-5 md:p-5 p-2 bg-gradient-to-r from-zinc-900 to-slate-700">
        <div className="lg:col-start-1 lg:col-span-1 h-fit text-white flex lg:flex-col flex-row gap-10 lg:border-2 p-2 justify-start rounded-lg">
          <div className="w-full h-fit">
            <h5 className="text-xl border-b-2 w-fit mb-2">Browse By</h5>
            <Carousel
              opts={{
                align: "center",
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                }),
              ]}
              orientation={`${
                window.innerWidth < 1024 ? "horizontal" : "vertical"
              }`}
              className="w-full flex items-center justify-center"
            >
              <CarouselContent className="lg:h-[250px]">
                <CheckBox
                  categories={categories}
                  handleFilters={(myfilters) =>
                    handleFilters(myfilters, "category")
                  }
                />
              </CarouselContent>
            </Carousel>
            <div className="lg:block hidden">
              <div className="flex items-center border-b-2 w-fit mb-4">
                <ArrowDownWideNarrow />
                <h5 className="text-xl">Filter By Price</h5>
              </div>
              <RadioBox
                prices={prices}
                handleFilters={(myfilters) => handleFilters(myfilters, "price")}
              />
            </div>
            <div className="lg:hidden flex justify-between my-4 border-2 p-1.5 rounded-lg">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={
                    "lg:hidden flex text-sm items-center gap-1 bg-muted p-2 rounded-md text-black"
                  }
                >
                  <ArrowDownWideNarrow size={18} />
                  <h5>Filter By Price</h5>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <RadioBox
                    prices={prices}
                    handleFilters={(myfilters) =>
                      handleFilters(myfilters, "price")
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className={
                    "flex text-sm items-center gap-1 bg-muted p-2 rounded-md text-black"
                  }
                >
                  <ArrowDownUp size={18} />
                  <h5>Sort By</h5>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <SortBy handleSortAndOrder={handleSortAndOrder} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="lg:col-start-2 lg:col-span-3">
          <div className="w-full flex flex-wrap gap-8 justify-center items-center">
            {loading ? (
              <p className="w-fit flex flex-col gap-3 text-lg font-semibold px-2 mx-auto text-white">
                <span>
                  Initial loading can take up to minute. Please wait ... :{")"}
                </span>

                <RotateCw className="mx-auto animate-spin" />
              </p>
            ) : products?.length ? (
              products.map((product) => (
                <Card
                  product={product}
                  key={product._id}
                  bg={true}
                  handleAddToCart={handleAddToCart(product)}
                />
              ))
            ) : (
              <p className="md:text-2xl text-lg font-semibold px-2 mx-auto text-white">
                No Products Currently available :{"("}
              </p>
            )}
          </div>
          <div>
            <LoadMoreLess handlemoreAndLess={handlemoreAndLess} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
