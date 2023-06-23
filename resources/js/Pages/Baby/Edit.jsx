import React, {useEffect} from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import {  useForm } from "@inertiajs/inertia-react";
//import swal from "sweetalert";
import Swal from "sweetalert2";
import { MedicalConditionsInput } from "@/Components/Select";

const Edit = () => {
  const {
    props: { users , baby },
  } = usePage();

  const {
    data,
    setData,
    put,
    processing,
    errors,
    clearErrors,
    progress,
    setError,
  } = useForm({
    name: baby.name,
    gender: baby.gender,
    dob: baby.dob,
    length: baby.length,
    weight:baby.weight,
    medical_condtions: baby.medical_conditions,
  });




  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("babies.update", {baby:baby}), {
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
        

        clearErrors();
      },
      onError: (error) => {
         console.log("=========================")
         console.log(error)
         console.log("=============================")
        Swal.fire({
          title: "Error!",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });

      },
    });
  };

  const [medicalConditions, setMedicalConditions] = useState([]);
  useEffect(()=>{
    if(baby.medical_conditions.length){
      setMedicalConditions(baby?.medical_conditions)
    }

  },[])

  return (
    <div>
      <div className="container">
        <div className="card m-4">
          <div className="card-header">
            <h1 className={"m-4"}>Edit Baby</h1>
          </div>
          <div className="card-body ">
            {/* form details */}
            <form onSubmit={handleSubmit}>
              <div className="col-md-6 my-2">
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

              {/* gender */}
              <div className="col-md-6 my-4">
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

              <div className="col-md-6 my-4">
                <label htmlFor="date">Select Baby Date</label>
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
              <div className="col-md-6 my-4">
                <label htmlFor="weight">Enter Baby Weight</label>
                <input
                  type={"number"}
                  value={data.weight}
                  className="form-control"
                  name="weight"
                  onChange={(e) => setData("weight", e.target.value)}
                />
                {errors.weight && (
                  <div className="alert alert-danger">{errors.weight}</div>
                )}
              </div>
              {/* weight */}
              {/* length */}
              <div className="col-md-6 my-4">
                <label htmlFor="weight">Enter Baby Length</label>
                <input
                  type={"number"}
                  value={data.length}
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
              <div className="col-md-6 my-4">
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
              <div className="col-md-6 my-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Edit Baby Details "}
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

Edit.layout = (page) => <Main children={page} title="Add Baby" />;

export default  Edit;
