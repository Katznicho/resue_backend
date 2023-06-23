import React from "react";
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


const RoleTable = ({ data , auth}) => {

   //handle delete
   const handleDelete = (row) => {
    //console.log(row);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this baby",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete baby",
      cancelButtonText: "No, keep the baby",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("babies.destroy", { baby: row }), {
          onSuccess: (msg) => {
            const updatedDetails = details.filter((item) => item.id !== row.id);
            setDetails(updatedDetails);

            Swal.fire({
              title: "Success!",
              text: "Baby deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Babys not deleted",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Baby not deleted",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };



  const [columns, setColumns] = useState([
    {
      name: "Baby Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Baby Owner",
      selector: (row) => row?.user?.name,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row?.gender,
      sortable: true,
    },
    {
      name: "Weight (kg)",
      selector: (row) => row.weight,
      sortable: true,
    },
    {
      name: "Length (cm)",
      selector: (row) => row.length,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
            <>
          <InertiaLink
            href={route("babies.show", { id: row.id })}
            className="btn btn-sm btn-success mx-2"
          >
            <i className="fas fa-info-circle"></i>
          </InertiaLink>
          <InertiaLink
            href={route("babies.edit", { id: row.id })}
            className="btn btn-sm btn-warning mx-2"
          >
            <i className="fas fa-edit"></i>
          </InertiaLink>

            {
              auth?.role?.name==ADMIN&&(<button
                className={"btn btn-sm btn-danger mx-2"}
                onClick={() => handleDelete(row)}
              >
                <i className="fas fa-trash"></i>
              </button>)
            }

        </>
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
          name="search"
          placeholder={"search....."}
          value={value}
          handleChange={handleChange}
        />
      </div>

      <DataTable
        title={"Babies"}
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
    props: { babies , auth },
  } = usePage();

  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Babies</h1>
        <RoleTable
         data={babies}
         auth={auth}
         />
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Babies" />;

export default Index;
