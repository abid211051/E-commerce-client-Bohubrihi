import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { ShowError, ShowSuccess, ShowLoading } from "../../utils/messages";
import { getCategories, createProduct } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";
import { toast } from "sonner";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    trending: 0,
    hot: 0,
    loading: false,
    disabled: false,
    formData: null,
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    quantity,
    trending,
    hot,
    loading,
    formData,
    disabled,
  } = values;

  useEffect(() => {
    getCategories()
      .then((response) => {
        setValues({
          ...values,
          categories: response.data.category,
          formData: new FormData(),
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          closeButton: true,
          richColors: true,
          position: "top-right",
        });
      });
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      disabled: true,
    });
    let newform = new FormData();
    newform.append("photo", formData);
    newform.append("name", values.name);
    newform.append("description", values.description);
    newform.append("price", values.price);
    newform.append("quantity", values.quantity);
    newform.append("category", values.category);
    newform.append("trending", values.trending);
    newform.append("hot", values.hot);
    const { token } = userInfo();
    createProduct(token, newform)
      .then((response) => {
        toast.success("Product Created", {
          richColors: true,
          closeButton: true,
          position: "top-right",
        });
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          trending: 0,
          hot: 0,
          loading: false,
          disabled: false,
        });
      })
      .catch((error) => {
        toast.error("Something went Wrong", {
          richColors: true,
          closeButton: true,
          position: "top-right",
        });
        setValues({
          ...values,
          error: errMsg,
          loading: false,
          disabled: false,
        });
      });
  };

  const productForm = () => (
    <form className="sm:w-[550px] mx-auto" onSubmit={handleSubmit}>
      <h4>Photo:</h4>
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold">
          <input
            type="file"
            name="photo"
            onChange={(e) =>
              setValues({ ...values, formData: e.target.files[0] })
            }
            accept="image/*"
            className="bg-muted p-2 rounded-md active:scale-95"
            required
          />
        </label>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold">Name:</label>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          className="border-2 p-2 rounded-md"
          value={name}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold">Description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          className="border-2 p-2 rounded-md"
          value={description}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold">Price:</label>
        <input
          name="price"
          onChange={handleChange}
          className="border-2 p-2 rounded-md"
          type="number"
          value={price}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold">Quantity:</label>
        <input
          name="quantity"
          onChange={handleChange}
          className="border-2 p-2 rounded-md"
          type="number"
          value={quantity}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold">Category:</label>
        <select
          name="category"
          value={category}
          onChange={handleChange}
          className="border-2 p-2 rounded-md"
          required
        >
          <option value="font-semibold">----Select Category----</option>
          {categories &&
            categories.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex gap-4 items-center p-2">
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="trending"
            value={trending}
            checked={trending}
            className="w-4"
            onChange={(e) =>
              setValues({
                ...values,
                trending: trending ? 0 : 1,
              })
            }
          />
          <label htmlFor="">Trending</label>
        </div>
        <div className="flex gap-1">
          <input
            type="checkbox"
            name="hot"
            value={hot}
            checked={hot}
            className="w-4"
            onChange={(e) =>
              setValues({
                ...values,
                hot: hot ? 0 : 1,
              })
            }
          />
          <label htmlFor="">Hot</label>
        </div>
      </div>
      <button
        className="p-2 w-full bg-black text-white rounded-md active:scale-95"
        type="submit"
        disabled={disabled}
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Layout title="Add a new product">
      <div className="p-2">
        <div className="">
          <ShowLoading loading={loading} />
          {productForm()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
