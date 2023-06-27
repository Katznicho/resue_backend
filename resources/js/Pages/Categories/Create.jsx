import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { useForm } from "@inertiajs/inertia-react";
//import swal from "sweetalert";
import Swal from "sweetalert2";

const Create = () => {
  const {
    props: {},
  } = usePage();

  const {
    data,
    setData,
    post,
    processing,
    errors,
    clearErrors,
    progress,
    setError,
  } = useForm({
    name: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("categories.store"), {
      onSuccess: (msg) => {
        Swal.fire({
          title: "Success!",
          text: "Category Stored successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        //clear form
        setData("name", "");
        setData("description", "");
        setData("image", "");

        clearErrors();
      },
      onError: (error) => {

        console.log("=========================");
        console.log(error);
        console.log("=============================");

        Swal.fire({
          title: "Error!",
          text: "Category not created",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
  };

  return (
    <div>
      <div className="container">
        <div className="card card-primary m-0 m-md-4 my-4 m-md-0 shadow">
          <div className="card-header text-center">
            <h1 className={"m-4"}>Add Categories</h1>
          </div>
          <div className="card-body ">
            {/* form details */}
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 my-2">
                <label htmlFor="weight">Category Name</label>
                <Input
                  name="Name"
                  placeholder={"enter  name...."}
                  value={data.name}
                  handleChange={(e) => setData("name", e.target.value)}
                  required
                />
                {errors.name && (
                  <div className="alert alert-danger">{errors.name}</div>
                )}
              </div>

              {/* description*/}
              <div className="col-md-12 my-4">
                <label htmlFor="weight">Category Description </label>
                <input
                  type={"text"}
                  value={data.type}
                  className="form-control"
                  name="type"
                  placeholder="enter description...."
                  onChange={(e) => setData("description", e.target.value)}
                />
                {errors.type && (
                  <div className="alert alert-danger">{errors.description}</div>
                )}
              </div>
              {/* description */}

              {/* image */}
              <div className="form-group">
                <label htmlFor="category">Category Image </label>
                <input
                  type="file"
                  required
                  onChange={(e) => setData("image", e.target.files[0])}
                  className="form-control"
                  accept="image/*"
                />
              </div>
              <div className="form-group">
                {progress && (
                  <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                  </progress>
                )}
                <br />
              </div>
              {/* image */}

              {/* button */}
              <div className="col-md-12 my-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Add Category"}
                </button>
              </div>
              {/* button */}
            </form>
            {/* form details */}
          </div>
        </div>
      </div>
    </div>
  );
};

Create.layout = (page) => <Main children={page} title="Add Sensors" />;

export default Create;
