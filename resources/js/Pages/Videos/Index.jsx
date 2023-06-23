import React from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import ReactPlayer from 'react-player'
import { ADMIN, customStyles } from "../utils/constants";




const VideoTable = ({ data , auth}) => {

   //handle delete
   const handleDelete = (row) => {
    //console.log(row);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this video",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete video",
      cancelButtonText: "No, keep the video",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("videos.destroy", { video: row }), {
          onSuccess: (msg) => {
            const updatedDetails = details.filter((item) => item.id !== row.id);
            setDetails(updatedDetails);

            Swal.fire({
              title: "Success!",
              text: "Video deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Video not deleted",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Video not deleted",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };



  const [columns, setColumns] = useState([
    {
      name: "Video Title",
      selector: (row) => row?.title,
      sortable: true,
    },
    {
      name: "Video Desciption",
      selector: (row) => row?.description,
      sortable: true,
    },
    {
      name: "Video",
      //selector: (row) => row.filepath,
      cell:(row)=>(

         <>
              <ReactPlayer
               url={row?.filepath}
              controls
               width="50%"
                loop
                playing={false}
                height="auto"
                light
              />
         </>
      ),
      //sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row?.size,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
            <>
            <InertiaLink
            href={route("videos.show", { id: row.id })}
            className="btn btn-sm btn-success mx-2"
          >
            <i className="fas fa-info-circle"></i>
          </InertiaLink>

          {
            auth?.role.name ==ADMIN&&(
            <InertiaLink
            href={route("videos.edit", { id: row.id })}
            className="btn btn-sm btn-warning mx-2"
          >
            <i className="fas fa-edit"></i>
          </InertiaLink>)

          }


          {
            auth?.role.name ==ADMIN&&(<button
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
        title={"Videos"}
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
    props: { videos , auth},
  } = usePage();


  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Videos</h1>

        <VideoTable data={videos} auth={auth} />
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Videos" />;

export default Index;
