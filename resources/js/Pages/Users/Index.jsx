import React from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import Swal from "sweetalert2";
import { ADMIN } from "../utils/constants";


const customStyles = {
  rows: {
      style: {
          minHeight: '72px', // override the row height
          cursor:"pointer"
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
      },
  },
};


const UsersTable = ({ data , auth}) => {

     //handle delete
  const handleDelete = (row) => {
    //console.log(row);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("roles.destroy", { role: row }), {
          onSuccess: (msg) => {
            const updatedDetails = details.filter((item) => item.id !== row.id);
            setDetails(updatedDetails);

            Swal.fire({
              title: "Success!",
              text: "Role deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Role not deleted",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Role not deleted",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };


  const [columns, setColumns] = useState([
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role.name,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <>
          <InertiaLink
            href={route("roles.show", { id: row.id })}
            className="btn btn-sm btn-success mx-2"
          >
            <i className="fas fa-info-circle"></i>
          </InertiaLink>
          <InertiaLink
            href={route("roles.edit", { id: row.id })}
            className="btn btn-sm btn-warning mx-2"
          >
            <i className="fas fa-edit"></i>
          </InertiaLink>

          {
            auth?.role.name ==ADMIN&&(<button
              className={"btn btn-sm btn-danger mx-2"}
              onClick={() => handleDelete(row)}
            >
              <i className="fas fa-trash"></i>
            </button>)
          }

        </>
      ),
    },
  ]);

  const [details , setDetails] = useState(data)

   const handleChange = (e)=>{
          // console.log(e.target.value)
          if(e.target.value){
            setValue(e.target.value)
            const filteredItems = details.filter( item => item.name && item.name.toLowerCase().includes(value.toLowerCase()));

            setDetails(filteredItems)
          }
          else{
            setDetails(data)
            setValue("")
          }
          //setValue('');

   }
   const [value, setValue] = useState('')

   const selectRawChange = (data)=>{
          console.log(data)
   }



  return (
    <div className="mx-4">
      <div className="col-md-4 my-2">
        <Input
          type="lower"
          name="search"
          placeholder={"search....."}
          value={value}
          handleChange={handleChange}
        />
      </div>

      <DataTable
        title={"Users"}
        columns={columns}
        data={details}
        pagination
         customStyles={customStyles}
        // selectableRows
        persistTableHead
        fixedHeader
        // onSelectedRowsChange={selectRawChange}
        striped
        highlightOnHover
        responsive

      />
    </div>
  );
};

const Index = () => {
  const {
    props: { users, auth },
  } = usePage();



  return (
    <div>
      <div>
        <h1>Users</h1>
        <UsersTable data={users}  auth={auth}/>
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Users" />;

export default Index;
