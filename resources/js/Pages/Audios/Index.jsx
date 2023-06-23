import React from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";


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


const VideoTable = ({ data }) => {

   //handle delete
   const handleDelete = (row) => {
    //console.log(row);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Audio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete Audio",
      cancelButtonText: "No, keep the Audio",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("audios.destroy", { id: row }), {
          onSuccess: (msg) => {
            const updatedDetails = details.filter((item) => item.id !== row.id);
            setDetails(updatedDetails);

            Swal.fire({
              title: "Success!",
              text: "Audio deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Audio not deleted",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Audio not deleted",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };



  const [columns, setColumns] = useState([
    {
      name: "Audio Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Audio Desciption",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Audio",
      selector: (row) => row.filepath,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
            <>
            <InertiaLink
            href={route("audios.show", { id: row.id })}
            className="btn btn-sm btn-success mx-2"
          >
            <i className="fas fa-info-circle"></i>
          </InertiaLink>
          <InertiaLink
            href={route("audios.edit", { id: row.id })}
            className="btn btn-sm btn-warning mx-2"
          >
            <i className="fas fa-edit"></i>
          </InertiaLink>

          <button
            className={"btn btn-sm btn-danger mx-2"}
            onClick={() => handleDelete(row)}
          >
            <i className="fas fa-trash"></i>
          </button>
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
        title={"Audios"}
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
    props: { audios },
  } = usePage();

   console.log("===========================")
    console.log(audios)
    console.log("===========================")


  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Audios</h1>
        <VideoTable data={audios} />
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Audios" />;

export default Index;
