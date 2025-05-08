import React, { useState } from "react";
import Layout from "../Layout";
import { ShowError, ShowSuccess, ShowLoading } from "../../utils/messages";
import { Link } from "react-router-dom";
import { createCategory } from "../../api/apiAdmin";
import { userInfo } from "../../utils/auth";
import { toast } from "sonner";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
  });

  const { name, error, success, loading } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
    });

    const { token } = userInfo();
    createCategory(token, { name: name })
      .then((response) => {
        toast.success("New Category Created", {
          richColors: true,
          closeButton: true,
          position: "top-right",
        });
        setValues({
          ...values,
        });
      })
      .catch((err) => {
        toast.error("Something Went Wrong", {
          richColors: true,
          closeButton: true,
          position: "top-right",
        });
        if (err.response)
          setValues({
            ...values,
          });
        else
          setValues({
            ...values,
          });
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
      success: false,
    });
  };

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit} className="sm:w-[550px] mx-auto">
        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="font-semibold">Category Name:</label>
          <input
            name="name"
            type="text"
            placeholder="Category Name. Cosmetics, Cloth, Accessories ..."
            onChange={handleChange}
            value={name}
            autoFocus
            required
            className="border-2 p-1.5 rounded-md sm:w-[550px]"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-black text-white active:scale-95 w-full rounded-md"
        >
          Create Category
        </button>
      </form>
    );
  };

  return (
    <Layout title="Add a new category">
      <div className="sm:p-8 p-2">
        <div className="">{categoryForm()}</div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
