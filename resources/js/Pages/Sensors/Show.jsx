import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import { formatDate } from "../utils/helpers";

const Show = () => {
  const {
    props: { sensor },
  } = usePage()




  return (
    <div>
      <div className={"container"}>
        {/* details */}
        <div className="card m-5">
          <div className="card-header">
            <h3 className="card-title">Sensor Details</h3>
          </div>
          <div className="card-body">
            <p><strong>Name:</strong> {sensor?.name}</p>
            <p><strong>Location:</strong> {sensor?.location}</p>
            <p><strong>Status:</strong> {sensor?.status} </p>
            <p><strong>Version:</strong> {sensor?.version} </p>
            <p><strong>Model:</strong> {sensor.model}</p>
            <p><strong>Attached Device</strong>{sensor?.device.name}</p>

            <hr />
            <h3 className="card-title">Owner Details</h3>
            <p><strong>Name:</strong> {sensor?.user?.name}</p>
            <p><strong>Email:</strong> {sensor?.user?.email}</p>
            <p><strong>Phone Number:</strong> {sensor?.user?.phone_number}</p>
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

Show.layout = (page) => <Main children={page} title="Show Role Details" />;

export default Show;
