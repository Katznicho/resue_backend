import React, {useEffect} from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { ADMIN } from "../utils/constants";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
      cursor: "pointer",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const CategoryTable = ({ data, auth }) => {


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
       name: "Image",
        cell: (row) => (
          <img

            src={row.image}
            alt={row.name}
            className="img-fluid"
            style={{ width: "50px", height: "50px" }}
          />
        ),


    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.slug,
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

  const [details, setDetails] = useState(data);

  const handleChange = (e) => {
    // console.log(e.target.value)
    if (e.target.value) {
      setValue(e.target.value);
      const filteredItems = details.filter((item) =>item.name && item.name.toLowerCase().includes(value.toLowerCase()));

      setDetails(filteredItems);
    } else {
      setDetails(data);
      setValue("");
    }
    //setValue('');
  };
  const [value, setValue] = useState("");

  const selectRawChange = (data) => {
    console.log(data);
  };



  return (
    <div className="mx-4">
      <div className="col-md-4 my-2">
        <Input
          name="search"
          placeholder={"search....."}
          value={value}
          handleChange={handleChange}
        />
      </div>

      <DataTable
        title={"Categories"}

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
    props: { categories, auth },
  } = usePage();
   
  console.log(categories);


  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Categories</h1>
        <CategoryTable data={categories} auth={auth} />
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Categories" />;

export default Index;
