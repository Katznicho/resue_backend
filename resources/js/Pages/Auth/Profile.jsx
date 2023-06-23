import React from "react";
import Main from "@/Layouts/Main";
import { useForm, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

const Profile = () => {
  const {
    props: { user, auth },
  } = usePage();

     const image =  auth?.user?.user_image;
  const { data, setData, post, progress } = useForm({
    avatar: "",
  });

  function submit(e) {
    e.preventDefault();
    if(data.avatar == ""){

      Swal.fire({
        title: 'Success!',
        text: "Please select an image",
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
    else{

      post(route('uploadProfileImage'),
      {
        onSuccess: (msg) => {
          Swal.fire({
            title: 'Success!',
            text: "Photo Updated successfully",
            icon: 'success',
            confirmButtonText: 'OK'
          })

          //clear form
          setData('avatar', '')
          clearErrors()

        },
        onError: (error) => {
          Swal.fire({
            title: 'Error!',
            text: "Photo not uploaded",
            icon: 'error',
            confirmButtonText: 'OK'
          })
          //  setError(error.response.data.errors)
        }
      }
     );

    }

  }

  return (
    <div className="">
      <div className="card-primary m-0 m-md-4 my-4 m-md-0 shadow">
        <div className="text-center">
          <h1 className="m-4">Profile Details</h1>
          <br />
        </div>

        <div class="card-body text-center">
          {/* form */}
          <form onSubmit={submit}>
            <div className="form-group">
              <input
                type="file"
                 //accept="images/"
                 required
                onChange={(e) => setData("avatar", e.target.files[0])}
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
              <img
                class="rounded-circle shadow-sm"
                width="110"
                height="120"
                src={image}
                alt=""
              />
              <br />

              <button class="btn btn-primary" type="submit">
                Update Image
              </button>
            </div>
          </form>
          {/* form */}
        </div>

        <div className="row justify-content-center">
          <div class="container">
            <div className="row">
              <div className="col-md-12">
                <form method="POST">
                  {/* Remove the CSRF token and method spoofing --}}
            {/* @csrf */}
                  {/* @method('PUT') */}

                  <div className="card-body">
                    <div className="col-md-12 my-4">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={user?.name}
                        id="name"
                        name="name"
                        required
                      />
                    </div>

                    <div className="col-md-12 my-4">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user?.email}
                        required
                      />
                    </div>

                    <div className="col-md-12 my-4">
                      <label htmlFor="phone_number" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        name="phone_number"
                        value={user?.phone_number ? user?.phone_number : ""}
                      />
                    </div>

                    <div className="col-md-12 my-4">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                      ></textarea>
                    </div>

                    <div class="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>

                    {/* <button type="submit" className="btn btn-primary">Save Changes</button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.layout = (page) => <Main children={page} title="Show Role Details" />;

export default Profile;
