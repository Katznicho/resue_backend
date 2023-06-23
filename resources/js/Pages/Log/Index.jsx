import React, {useEffect} from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { ADMIN, customStyles } from "../utils/constants";



const LogTable = ({ data, auth }) => {


  //handle delete
  const handleDelete = (row) => {
    //console.log(row);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this sensor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("sensors.destroy", { sensor: row }), {
          onSuccess: (msg) => {
            const updatedDetails = details.filter((item) => item.id !== row.id);
            setDetails(updatedDetails);

            Swal.fire({
              title: "Success!",
              text: "sensor deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "sensor not deleted",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "sensor not deleted",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const [columns, setColumns] = useState([

    {
      name: "User ",
      selector: (row) => row?.user?.name,
      sortable: true,
    },
    {
      name: "Path",
      selector: (row) => row.path,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "IP Address",
      selector: (row) => row.ip_address,
      sortable: true,
    },
    {
      name: "Severity",
      selector: (row) => row.severity,
      sortable: true,
    },
    {
      name: "Platform",
      selector: (row) => row.platform,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
    },
    {
      name: "Method",
      selector: (row) => row.method,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>

          <InertiaLink
            href={route("sensors.show", { id: row.id })}
            className="btn btn-sm btn-success mx-2"
          >
            <i className="fas fa-info-circle"></i>
          </InertiaLink>
          {
            auth?.role.name ==ADMIN&&(
              <InertiaLink
              href={route("sensors.edit", { id: row.id })}
              className="btn btn-sm btn-warning mx-2"
            >
              <i className="fas fa-edit"></i>
            </InertiaLink>
            )
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
        title={"System Logs"}

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
    props: { logs, auth },
  } = usePage();



  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Logs</h1>
        <LogTable data={logs} auth={auth} />
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Logs" />;

export default Index;
