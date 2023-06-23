import React, { useEffect } from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Input } from "@/Components/FormComponents";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import { ADMIN, customStyles } from "../utils/constants";

const DeviceTable = ({ data, auth }) => {

  const copyDeviceSerial = (serialNumber) => {
    navigator.clipboard.writeText(serialNumber).then(() => {
      Swal.fire({
        title: "Copied!",
        text: "Device serial number copied to clipboard.",
        icon: "success",
        confirmButtonText: "OK",
      });
    });
  };


  //handle delete
  const handleDelete = (row) => {
    //console.log(row);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this device!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(route("devices.destroy", { device: row }), {
          onSuccess: (msg) => {
            const updatedDetails = details.filter((item) => item.id !== row.id);
            setDetails(updatedDetails);

            Swal.fire({
              title: "Success!",
              text: "device deleted successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "device not deleted",
              icon: "error",
              confirmButtonText: "OK",
            });
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "device not deleted",
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
      name: "Owner",
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Serial Number",
      cell: (row) => (
        <>
          <div id="serial_number">{row?.device_serial_number}</div>
          <button className="btn btn-sm btn-primary mx-2"
            onClick={()=>copyDeviceSerial(row?.device_serial_number)}
          >
            <i className="fas fa-copy"></i>
          </button>
        </>
      ),
      // selector: (row) => row?.device_serial_number,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Version",
      selector: (row) => row.version,
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <InertiaLink
            href={route("device_details", { id: row.id })}
            className="btn btn-sm btn-success mx-2"
          >
            <i className="fas fa-info-circle"></i>
          </InertiaLink>
          {auth?.role.name == ADMIN && (
            <InertiaLink
              href={route("devices.edit", { id: row.id })}
              className="btn btn-sm btn-warning mx-2"
            >
              <i className="fas fa-edit"></i>
            </InertiaLink>
          )}

          {auth?.role.name == ADMIN && (
            <button
              className={"btn btn-sm btn-danger mx-2"}
              onClick={() => handleDelete(row)}
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </>
      ),
    },
  ]);

  const [details, setDetails] = useState(data);

  const handleChange = (e) => {
    // console.log(e.target.value)
    if (e.target.value) {
      setValue(e.target.value);
      const filteredItems = details.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(value.toLowerCase())
      );

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
        title={"Devices"}
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
    props: { devices, auth },
  } = usePage();


  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Devices</h1>
        <DeviceTable data={devices} auth={auth} />
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Devices" />;

export default Index;


