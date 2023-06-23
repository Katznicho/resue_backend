import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import { formatDate } from "../utils/helpers";

const Show = () => {
  const {
    props: { video },
  } = usePage()

  return (
    <div>
      <div className={"container"}>
        {/* details */}
        <div className="card m-5">
          <div className="card-header">
            <h3 className="card-title">Video  Details</h3>
          </div>
          <div className="card-body">
            <p><strong>Title:</strong> {video.title}</p>
            <p><strong>Description</strong> {video.description}</p>
            <p><strong>Duration:</strong> {video.duration}</p>
            <p><strong>Size:</strong> {video.size} cm</p>
            <p><strong>FilePath:</strong> {video.filepath} kgs</p>

            <p><strong>Created At:</strong> {
               formatDate(video?.created_at)

            }</p>
            <p><strong>Updated At:</strong> {
               formatDate(video?.updated_at)

            }</p>
            <hr />
            <h3 className="card-title">Baby Details</h3>
            <p><strong>Baby Name:</strong> {video.baby.name}</p>

            <hr />
            <h3 className="card-title">Owner Details</h3>
            <p><strong>Name:</strong> {video.user.name}</p>
            <p><strong>Email:</strong> {video.user.email}</p>
            <p><strong>Phone Number:</strong> {video.user.phone_number}</p>
          </div>
        </div>
        <br />
        <Link
          href={route("videos.index")}
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
