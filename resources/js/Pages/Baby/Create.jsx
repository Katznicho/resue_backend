import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
//import swal from "sweetalert";
import Swal from "sweetalert2";
import { MedicalConditionsInput } from "@/Components/Select";

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
    gender: "",
    dob: "",
    length: "",
    weight: "",
    owner:"",
    medical_condtions: [],
  });




  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("babies.store"), {
      onSuccess: (msg) => {
        Swal.fire({
          title: "Success!",
          text: "Baby Updated successfully",
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
            <h1 className={"m-4"}>Add Baby</h1>
          </div>
          <div className="card-body ">
            {/* form details */}
            <form onSubmit={handleSubmit}>
              <div className="col-md-12 my-2">
              <label htmlFor="">Baby Name</label>
                <Input
                  name="Baby Name"
                  placeholder={"enter baby name...."}
                  value={data.name}
                  handleChange={(e) => setData("name", e.target.value)}
                  required
                />
                {errors.name && (
                  <div className="alert alert-danger">{errors.name}</div>
                )}
              </div>

              {/* baby owner */}
              <div className="col-md-12 my-4">
                <label htmlFor="">Baby Owner</label>
                <select
                  value={data.owner}
                  name="owner"
                  className="form-control"
                  onChange={(e) => setData("owner", e.target.value)}

                >
                  <option value="" selected disabled>
                    Select Baby Owner
                  </option>


                  {users?.map((user) => (
                    <option value={user.id}>{user.name}</option>
                  ))}
                </select>
                {errors.owner && (
                  <div className="alert alert-danger">{errors.owner}</div>
                )}
              </div>


              {/* baby owner */}

              {/* gender */}
              <div className="col-md-12 my-4">
              <label htmlFor="">Baby Gender</label>
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
              {/* dob */}

              <div className="col-md-12 my-4">
                <label htmlFor="date">Date of Birth</label>
                <input
                  type={"date"}
                  required
                  value={data.dob}
                  className="form-control"
                  name="dob"
                  onChange={(e) => setData("dob", e.target.value)}
                />
                {errors.dob && (
                  <div className="alert alert-danger">{errors.dob}</div>
                )}
              </div>
              {/* dob */}
              {/* weight */}
              <div className="col-md-12 my-4">
                <label htmlFor="weight">Baby Weight (kg) </label>
                <input
                  type={"number"}
                  value={data.weight}
                  className="form-control"
                  name="weight"
                  placeholder="enter baby weight...."
                  onChange={(e) => setData("weight", e.target.value)}
                />
                {errors.weight && (
                  <div className="alert alert-danger">{errors.weight}</div>
                )}
              </div>
              {/* weight */}
              {/* length */}
              <div className="col-md-12 my-4">
                <label htmlFor="weight">Length of the Baby (cm)</label>
                <input
                  type={"number"}
                  value={data.length}
                  placeholder="enter baby length...."
                  required
                  className="form-control"
                  name="length"
                  onChange={(e) => setData("length", e.target.value)}
                />
              </div>
              {errors.length && (
                <div className="alert alert-danger">{errors.length}</div>
              )}
              {/* length */}

              {/* medical conditions */}
              <div className="col-md-12 my-4">
                <label className="font-bold mb-2" htmlFor="medical-conditions">
                  Medical Conditions
                </label>
                <MedicalConditionsInput
                  value={medicalConditions}
                  onChange={setMedicalConditions}
                  medical_conditions={medicalConditions}
                  setData={setData}
                />
              </div>

              {/* medical conditions */}

              {/* button */}
              <div className="col-md-12 my-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Add Baby"}
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
