import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import { formatDate } from "../utils/helpers";

const Show = () => {
  const {
    props: { device },
  } = usePage()


  return (
    <div>
      <div className={"container"}>
        {/* details */}
        <div className="card m-5">
          <div className="card-header">
            <h3 className="card-title">Device Details</h3>
          </div>
          <div className="card-body">
            <p><strong>Name:</strong> {device?.name}</p>
            <p><strong>Location:</strong> {device?.location}</p>
            <p><strong>status:</strong> {device?.status} </p>
            <p><strong>version:</strong> {device?.version}</p>
            <p><strong>Model:</strong> {device.model}</p>
            <hr/>
            <h3>Sensors</h3>

             <ol>
               {
                device?.sensors.map((sensor)=><li>{sensor.name}</li>)
               }
             </ol>

            <hr />
            <h3 className="card-title">Owner Details</h3>
            <p><strong>Name:</strong> {device?.user?.name}</p>
            <p><strong>Email:</strong> {device?.user?.email}</p>
            <p><strong>Phone Number:</strong> {device?.user?.phone_number}</p>
          </div>
        </div>
        <br />
        <Link
          href={route("devices.index")}
          className="btn btn-secondary"
          as="a"
        >
          Back
        </Link>
      </div>
        {/* details */}
      </div>
  );
};

Show.layout = (page) => <Main children={page} title="Show Device Details" />;

export default Show;
