import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import {  useForm } from "@inertiajs/inertia-react";
//import swal from "sweetalert";
import Swal from "sweetalert2";


const Create = () => {
  const {
    props: { users },
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
    owner: "",
    type: "",
    location: "",
    version:"",
    model: "",
  });




  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("devices.store"), {
      onSuccess: (msg) => {
        Swal.fire({
          title: "Success!",
          text: "Device Stored successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        //clear form
        setData("name", "");
        setData("owner", '')
        setData("type", '')
        setData("location", '')
        //setData("status", '')
        setData("version", '')
        setData("model", '')

        clearErrors();
      },
      onError: (error) => {
         console.log("=========================")
         console.log(error)
         console.log("=============================")
        Swal.fire({
          title: "Error!",
          text: "Role not created",
          icon: "error",
          confirmButtonText: "OK",
        });

      },
    });
  };

  const [medicalConditions, setMedicalConditions] = useState([]);

  return (
    <div>
      <div className="container">
        <div className="card card-primary m-0 m-md-4 my-4 m-md-0 shadow">
          <div className="card-header text-center">
            <h1 className={"m-4"}>Add Device</h1>
          </div>
          <div className="card-body ">
            {/* form details */}
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 my-2">
              <label htmlFor="weight">Device Name</label>
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

              {/* device owner */}
              <div className="col-md-12 my-4">
                <label htmlFor="">Device Owner</label>
                <select
                  value={data.owner}
                  name="owner"
                  className="form-control"
                  onChange={(e) => setData("owner", e.target.value)}

                >
                  <option value="" selected disabled>
                    Select Device Owner
                  </option>


                  {users?.map((user) => (
                    <option value={user.id}>{user.name}</option>
                  ))}
                </select>
                {errors.owner && (
                  <div className="alert alert-danger">{errors.owner}</div>
                )}
              </div>


              {/* device owner */}


              {/* type*/}
              <div className="col-md-12 my-4">
                <label htmlFor="weight">Device Type </label>
                <input
                  type={"text"}
                  value={data.type}
                  className="form-control"
                  name="type"
                  placeholder="enter device type...."
                  onChange={(e) => setData("type", e.target.value)}
                />
                {errors.type && (
                  <div className="alert alert-danger">{errors.type}</div>
                )}
              </div>
              {/* type */}

              {/* location */}
              <div className="col-md-12 my-4">
                <label htmlFor="weight">Device Location</label>
                <input
                  type={"text"}
                  value={data.location}
                  placeholder="enter device location...."
                  required
                  className="form-control"
                  name="location"
                  onChange={(e) => setData("location", e.target.value)}
                />
              </div>
              {errors.location && (
                <div className="alert alert-danger">{errors.location}</div>
              )}
              {/* location */}

               {/* version */}
               <div className="col-md-12 my-4">
                <label htmlFor="weight">Device Version</label>
                <input
                  type={"text"}
                  value={data.version}
                  placeholder="enter device version ..."
                  required
                  className="form-control"
                  name="version"
                  onChange={(e) => setData("version", e.target.value)}
                />
              </div>
              {errors.version && (
                <div className="alert alert-danger">{errors.version}</div>
              )}
               {/* version */}

               {/* modal */}
               <div className="col-md-12 my-4">
                <label htmlFor="weight">Device Modal</label>
                <input
                  type={"text"}
                  value={data.model}
                  placeholder="enter device modal  ... "
                  required
                  className="form-control"
                  name="model"
                  onChange={(e) => setData("model", e.target.value)}
                />
              </div>
              {errors.model && (
                <div className="alert alert-danger">{errors.model}</div>
              )}
               {/* modal */}





              {/* button */}
              <div className="col-md-12 my-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Add Device"}
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

Create.layout = (page) => <Main children={page} title="Add Device" />;

export default Create;
