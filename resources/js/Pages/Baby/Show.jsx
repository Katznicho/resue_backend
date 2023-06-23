import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import { formatDate } from "../utils/helpers";

const Show = () => {
  const {
    props: { baby },
  } = usePage()

  return (
    <div>
      <div className={"container"}>
        {/* details */}
        <div className="card m-5">
          <div className="card-header">
            <h3 className="card-title">Baby Details</h3>
          </div>
          <div className="card-body">
            <p><strong>Name:</strong> {baby?.name}</p>
            <p><strong>Gender:</strong> {baby?.gender}</p>
            <p><strong>Length:</strong> {baby?.length} cm</p>
            <p><strong>Weight:</strong> {baby?.weight} kgs</p>
            <p><strong>Date of Birth:</strong> {baby.dob}</p>
            <p><strong>Medical Conditions:</strong> {

            baby?.medical_conditions?.length>0?
             baby?.medical_conditions.map(condition=><li>{condition?.value}</li>):
              <li>No Medical Conditions</li>
            }</p>
            <p><strong>Created At:</strong> {
               formatDate(baby?.created_at)

            }</p>
            <p><strong>Updated At:</strong> {
               formatDate(baby?.updated_at)

            }</p>
            <hr />
            <h3 className="card-title">Owner Details</h3>
            <p><strong>Name:</strong> {baby?.user?.name}</p>
            <p><strong>Email:</strong> {baby?.user?.email}</p>
            <p><strong>Phone Number:</strong> {baby?.user?.phone_number}</p>
          </div>
        </div>
        <br />
        <Link
          href={route("babies.index")}
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
