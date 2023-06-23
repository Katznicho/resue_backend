import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import { Input } from "@/Components/FormComponents";
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { usePermissions } from "../utils/usePermissions";
//import swal from "sweetalert";
import Swal from "sweetalert2";


const Edit = () => {
  const { props:{role} } = usePage();

  const { permissions, setPermissions} = usePermissions()

  const { data, setData, put, processing, errors,clearErrors, progress, setError  } = useForm({
    name:role.name,
    description: role.description,
    permissions: role.permissions,
  })



  const handleChange = (e, permission) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      //setSelectedPermissions([...selectedPermissions, permission]);
      setData('permissions', [...data.permissions, permission])
    } else {
      //remove from array
      const newPermissions = data.permissions.filter(
        (item) => item !== permission
      );
      //setSelectedPermissions(newPermissions);
      setData('permissions', newPermissions)
    }

  };

  const handleParentChange = (e, permission) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      //add all children
      const children = permission.permissions;

      setData('permissions', [...data.permissions, ...children, permission.name])
    } else {
      //remove all children
      const children = permission.permissions;
      const newPermissions = data.permissions.filter((item) => !children.includes(item));
      //remove parent
      newPermissions.filter((item) => item !== permission.name);
      //set selected permissions of the data
      setData('permissions', newPermissions)
    }

  };

  useEffect(() => {}, [data]);

  const handleSubmit = (e) => {

    e.preventDefault();
     //post('roles.store')
     put(route('roles.update', {role:role}),
      {
        onSuccess: (msg) => {
          Swal.fire({
            title: 'Success!',
            text: "Role created successfully",
            icon: 'success',
            confirmButtonText: 'OK'
          })

          //clear form
          setData('name', '')
          setData('description', '')
          setData('permissions', [])
          clearErrors()

        },
        onError: (error) => {
          console.log("=================================")
          console.log(error.response.data.errors)
          console.log("=================================")

          Swal.fire({
            title: 'Error!',
            text: "Role not created",
            icon: 'error',
            confirmButtonText: 'OK'
          })
           setError(error.response.data.errors)
        }
      }

     );
  };

  return (
    <div>
      <div>
        <h1 class={"m-4"}>Edit Role</h1>
        <div className="container m-4">
          <form onSubmit={handleSubmit}>
            <div className="col-md-4 my-2">
              <Input
                name="Role Name"
                placeholder={"enter role name...."}
                value={data.name}
                handleChange={(e) => setData('name', e.target.value)}
              />
              {
                errors.name && <div className="alert alert-danger">{errors.name}</div>
              }
            </div>
            {/* description */}
            <div className="col-md-4 my-2">
              <Input
                name="Role Description"
                placeholder={"enter description...."}
                value={data.description}
                handleChange={(e) => setData('description', e.target.value)}
              />
              {
                errors.description && <div className="alert alert-danger">{errors.description}</div>
              }
            </div>
            {/* description */}

            {/* role and permissions */}
            <div className={"col-md-4"}>
              {permissions.map((permission) => {
                return (
                  <div>
                    <div className="d-flex align-center">
                      <input
                        className="ml-4"
                        type="checkbox"
                        name={permission.name}
                        value={permission.name}
                        onChange={(e) => handleParentChange(e, permission)}
                        checked={data.permissions.includes(permission.name)}
                      />
                      <h3 className="ml-2">{permission.name}</h3>
                    </div>

                    {permission.permissions.map((permission) => {
                      return (
                        <div>
                          <input
                            className="ml-4"
                            type="checkbox"
                            name={permission}
                            value={permission}
                            onChange={(e) => handleChange(e, permission)}
                            checked={data.permissions.includes(permission)}
                          />
                          <label className="ml-1">{permission}</label>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {
                errors.permissions && <div className="alert alert-danger">{errors.permissions}</div>
              }
            </div>
            {/* role and permissions */}

            {/* button */}
            <div className="col-md-4 my-2">
              <button className="btn btn-primary" type="submit" disabled={processing}>
                {processing ? "Processing..." : "Submit"}
              </button>
            </div>
            {/* button */}
          </form>
        </div>
      </div>
    </div>
  );
};

Edit.layout = (page) => <Main children={page} title="Add Role" />;

export default  Edit;
