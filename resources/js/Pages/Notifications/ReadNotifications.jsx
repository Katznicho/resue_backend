import React from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { ADMIN, customStyles } from "../utils/constants";




const NotificationTable = ({ data , auth}) => {

  const handleReadAt = (id) => {
     console.log("============================")
     console.log(id);
     console.log("============================")

    Inertia.post(route("markNotificationAsRead", { id: id }), {
      onSuccess: (msg) => {
        Swal.fire({
          title: "Success!",
          text: "notification updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      },
      onError: (error) => {
         console.log("============================")
          console.log(error);
          console.log("============================")
        Swal.fire({
          title: "Error!",
          text: "notification not updated",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

   //handle delete
   const handleDelete = (row) => {
    //console.log(row);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this notification",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete notification",
      cancelButtonText: "No, keep the notification",
    }).then((result) => {
      if (result.isConfirmed) {

        Inertia.delete(route("notifications.destroy", { notification: row }), {
          onSuccess: (msg) => {
            const updatedDetails = details.filter((item) => item.id !== row.id);
            setDetails(updatedDetails);

            Swal.fire({
              title: "Success!",
              text: "notification deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "notification not deleted",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "notification not deleted",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };



  const [columns, setColumns] = useState([
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      name: "Subject",
      selector: (row) => row?.data?.subject,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.data?.user_name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row?.data?.description,
      sortable: true,
    },
    {
      name: "Importance Level",
      selector: (row) => row?.data?.importance_level,
      sortable: true,
    },

    {
      name: "Status",
      // selector: (row) => row?.read_at,
      cell: (row) => (
        <>
          {row?.read_at ? (
            <span className="badge badge-success">Read</span>
          ) : (
            <span className="badge badge-danger">Unread</span>
          )}
        </>
      ),

      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
            <>
          <InertiaLink
            href={route("notifications.show", { id: row.id })}
            className="btn btn-sm btn-success mx-2"
          >
            <i className="fas fa-info-circle"></i>
          </InertiaLink>

          {/* add mark as unread unread button */}
          {
            // row?.read_at ==null&&(
            //   <button
            //   className={"btn btn-sm btn-success mx-2"}
            //   onClick={() => handleReadAt(row.id)}
            // >
            //   MarkAsRead
            // </button>

           // )
          }
          {/* add mark as  unread button*/}

            {
              auth?.role?.name==ADMIN&&
              (
              <button
                className={"btn btn-sm btn-danger mx-2"}
                onClick={() => handleDelete(row)}
              >
                <i className="fas fa-trash"></i>
              </button>
              )
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
            const filteredItems = details.filter( item => item.subject && item.subject.toLowerCase().includes(value.toLowerCase()));

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

const ReadNotifications = () => {
  const {
    props: { notifications , auth },
  } = usePage();


  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Read Notifications</h1>
        <NotificationTable
         data={notifications}
         auth={auth}
         />
      </div>
    </div>
  );
};

ReadNotifications.layout = (page) => <Main children={page} title="Manage Notifications" />;

export default ReadNotifications;
