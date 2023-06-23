import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { Input } from "@/Components/FormComponents";
import {  useForm } from "@inertiajs/inertia-react";
//import swal from "sweetalert";
import Swal from "sweetalert2";


const Create = () => {
  const {
    props: { babies , roles},
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
    first_name: "",
    last_name: "",
    title:"",
    email:"",
    baby_id: "",
    role_id: "",
    gender: "",
    address:"",
    phone_number:"",

  });




  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("users.store"), {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "User Created successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        //clear form
        setData("name", "");
        setData("dob", '')
        setData("gender", '')
        setData("length", '')
        setData("weight", '')
        setData("medical_condtions", [])
        setData("owner", '')

        clearErrors();
      },
      onError: (error) => {
         console.log("=========================")
         console.log(error)
         console.log("=============================")
        Swal.fire({
          title: "Error!",
          text: "User not created",
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
            <h1 className={"m-4"}>Add New User</h1>
          </div>
          <div className="card-body ">
            {/* form details */}
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 my-2">
                <label htmlFor="name">First Name</label>
                <Input
                  name="first_name"
                  placeholder={"enter first name...."}
                  value={data.first_name}
                  handleChange={(e) => setData("first_name", e.target.value)}
                  required
                />
                {errors.first_name && (
                  <div classfirst_name="alert alert-danger">{errors.first_name}</div>
                )}
              </div>
               {/* last name */}
               <div className="col-md-12 my-2">
                <label htmlFor="name">Last Name</label>
                <Input
                  name="last_name"
                  placeholder={"enter last name...."}
                  value={data.last_name}
                  handleChange={(e) => setData("last_name", e.target.value)}
                  required
                />
                {errors.last_name && (
                  <div className="alert alert-danger">{errors.last_name}</div>
                )}
              </div>
               {/* last name */}
                {/* email */}
                <div className="col-md-12 my-4">
                <label htmlFor="weight">User Email</label>
                <input
                  type={"email"}
                  value={data.email}
                  className="form-control"
                  name="email"
                  placeholder="enter user email...."
                  required
                  onChange={(e) => setData("email", e.target.value)}
                />
                {errors.weight && (
                  <div className="alert alert-danger">{errors.weight}</div>
                )}
              </div>

                {/* email */}

                {/* phone number */}
                <div className="col-md-12 my-4">
                <label htmlFor="">Phone Number</label>
                <input
                  type={"text"}
                  value={data.phone_number}
                  className="form-control"
                  name="phone_number"
                  placeholder="enter phone number...."
                  required
                  onChange={(e) => setData("phone_number", e.target.value)}
                />
                {errors.phone_number && (
                  <div className="alert alert-danger">{errors.phone_number}</div>
                )}
              </div>

               {/* title */}
               <div className="col-md-12 my-4">
                <label htmlFor="">Title</label>
                <select
                  value={data.title}
                  name="title"
                  className="form-control"
                  onChange={(e) => setData("title", e.target.value)}
                  required
                >
                  <option value="" selected disabled>
                    select title
                  </option>
                  <option value={"Mr"}>Mr</option>
                  <option value="Miss">Miss</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>

                </select>
                {errors.title && (
                  <div className="alert alert-danger">{errors.title}</div>
                )}
              </div>
               {/* title */}
                    {/* gender */}
              <div className="col-md-12 my-4">
                <label htmlFor="">Gender</label>
                <select
                  value={data.gender}
                  name="gender"
                  className="form-control"
                  onChange={(e) => setData("gender", e.target.value)}
                  required
                >
                  <option value="" selected disabled>
                    select gender
                  </option>
                  <option value={"male"}>male</option>
                  <option value="female">female</option>
                </select>
                {errors.gender && (
                  <div className="alert alert-danger">{errors.gender}</div>
                )}
              </div>
              {/* gender */}

              {/* role */}
              <div className="col-md-12 my-4">
                <label htmlFor="">Role</label>
                <select
                  value={data.role_id}
                  name="role_id"
                  className="form-control"
                  onChange={(e) => setData("role_id", e.target.value)}
                  required
                >
                  <option value="" selected disabled>
                    Select User Role
                  </option>

                  {roles?.map((role) => (
                    <option value={role.id}>{role.name}</option>
                  ))}
                </select>
                {errors.role_id && (
                  <div className="alert alert-danger">{errors.role_id}</div>
                )}
              </div>
              {/* role */}

              {/* baby */}

              {/*
              <div className="col-md-6 my-4">
                <label htmlFor="">Baby Names</label>
                <select
                  value={data.baby_id}
                  name="baby_id"
                  className="form-control"
                  onChange={(e) => setData("baby_id", e.target.value)}

                >
                  <option value="" selected disabled>
                    Select Baby
                  </option>

                  {babies?.map((baby) => (
                    <option value={baby.id}>{baby.name}</option>
                  ))}
                </select>
                {errors.baby_id && (
                  <div className="alert alert-danger">{errors.baby_id}</div>
                )}
              </div>
              */}

              {/* baby */}

               {/* address */}
                <div className="col-md-12 my-2">
                <label htmlFor="address">Address</label>
                <textarea
                  name="address"
                  placeholder={"enter address...."}
                  value={data.address}
                  className="form-control"
                  onChange={(e) => setData("address", e.target.value)}
                  required
                />
                {errors.address && (
                  <div className="alert alert-danger">{errors.address}</div>
                )}
              </div>
                {/* address */}






              {/* button */}
              <div className="col-md-12 my-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Add User"}
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

Create.layout = (page) => <Main children={page} title="Add Baby" />;

export default Create;
