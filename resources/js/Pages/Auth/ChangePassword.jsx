import React, { useState } from "react";
import Main from "@/Layouts/Main";
import { useForm, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const {
    props: { auth },
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
    old_password: "",
    new_password: "",
    confirmed_password: "",
  });
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  //icons
  const [oldPasswordIcon, setOldPasswordIcon] = useState("fas fa-eye-slash");
  const [newPasswordIcon, setNewPasswordIcon] = useState("fas fa-eye-slash");
  const [confirmPasswordIcon, setConfirmPasswordIcon] =
    useState("fas fa-eye-slash");

  const handleSubmit = (e) => {
    e.preventDefault();
    //check if password match
    if(data.confirmed_password != data.new_password){
      Swal.fire({
        title: "Warning",
        text: "Passwords dont match",
        icon: "warning",
        confirmButtonText: "OK",
      });
      setError(
        "confirmed_password",
        "passwords dont match"
      );

    }
    else{
      console.log(data)
      post(route("updatePassword"), {
        onSuccess: (msg) => {
          Swal.fire({
            title: "Success!",
            text: `Password updated successfully`,
            icon: "success",
            confirmButtonText: "OK",
          });

          //clear form
          setData("old_password", "");
          setData("new_password", "");
          setData("confirmed_password", "");
          clearErrors();
        },
        onError: (error) => {

          Swal.fire({
            title: "Error!",
            text: `${error?.data}`,
            icon: "error",
            confirmButtonText: "OK",
          });
          //  setError(error.response.data.errors)
        },
      });
    }


  };

  return (
    <div className="container">
      <div className="card m-4">
        <div className="card-header">
          <h1 className={"m-1"}>Change Password</h1>
          <br />
        </div>

        <div className="row justify-content-center">
          <div className="container">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
                  <div className="card-body">
                    <div className="col-md-12 my-4">
                      <label for="currentPassword" class="form-label">
                        Current Password
                      </label>
                      <div className="input-group">
                        <input
                          type={oldPasswordType}
                          className="form-control"
                          name="old_password"
                          placeholder="Current Password"
                          value={data.old_password}
                          required
                          onChange={(e) =>
                            setData("old_password", e.target.value)
                          }
                        />
                        <br />
                        <span
                          className="input-group-text"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={oldPasswordIcon}
                            id="currentPasswordToggle"
                            onClick={() => {
                              if (oldPasswordType === "password") {
                                setOldPasswordType("text");
                                setOldPasswordIcon("fas fa-eye");
                              } else {
                                setOldPasswordType("password");
                                setOldPasswordIcon("fas fa-eye-slash");
                              }
                            }}
                          ></i>
                        </span>
                      </div>
                      {errors.old_password && (
                        <div className="alert alert-danger">
                          {errors.old_password}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12 my-4">
                      <label for="newPassword" className="form-label">
                        New Password
                      </label>
                      <div class="input-group">
                        <input
                          type={newPasswordType}
                          className="form-control"
                          name="new_password"
                          placeholder="New Password"
                          required
                          value={data.new_password}
                          onChange={(e) =>
                            setData("new_password", e.target.value)
                          }
                        />
                        <br />
                        <span
                          className="input-group-text"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={newPasswordIcon}
                            onClick={() => {
                              if (newPasswordType === "password") {
                                setNewPasswordType("text");
                                setNewPasswordIcon("fas fa-eye");
                              } else {
                                setNewPasswordType("password");
                                setNewPasswordIcon("fas fa-eye-slash");
                              }
                            }}
                          ></i>
                        </span>
                      </div>
                      {errors.new_password && (
                        <div className="alert alert-danger">
                          {errors.new_password}
                        </div>
                      )}
                    </div>
                    <div className="col-md-12 my-4">
                      <label for="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <div className="input-group">
                        <input
                          type={confirmPasswordType}
                          className="form-control"
                          name="confirmed_password"
                          placeholder="Confirm Password"
                          value={data.confirmed_password}
                          required
                          onChange={
                            (e) => {
                              setData("confirmed_password", e.target.value);
                              if (
                                data.new_password != data.confirmed_password
                              ) {
                                //set error

                              }
                            }
                            //check if the password and confirm password match
                          }
                        />
                        <br />
                        <span
                          className="input-group-text"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={confirmPasswordIcon}
                            onClick={() => {
                              if (confirmPasswordType === "password") {
                                setConfirmPasswordType("text");
                                setConfirmPasswordIcon("fas fa-eye");
                              } else {
                                setConfirmPasswordType("password");
                                setConfirmPasswordIcon("fas fa-eye-slash");
                              }
                            }}
                          ></i>
                        </span>
                        <div>
                          {errors.confirmed_password && (
                            <div className="alert alert-danger">
                              {errors.confirmed_password}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                         {processing?"updating.....":"update password"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChangePassword.layout = (page) => (
  <Main children={page} title="Show Role Details" />
);

export default ChangePassword;
