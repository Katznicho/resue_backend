import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";
import { formatDate } from "../utils/helpers";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

const Show = () => {
  const {
    props: { notification },
  } = usePage();


  const handleReadAt = (id) => {

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
        Swal.fire({
          title: "Error!",
          text: "notification not updated",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });


  };

  return (
    <div>
      <div className={"container"}>
        {/* details */}
        <div className="card m-5">
          <div className="card-header">
            <h3 className="card-title">Notification Details</h3>
          </div>
          <div className="card-body">
            <p>
              <strong>ID:</strong> {notification?.id}
            </p>
            <p>
              <strong>Subject:</strong> {notification?.data.subject}
            </p>
            <p>
              <strong>User Name:</strong> {notification?.data?.user_name}{" "}
            </p>
            <p>
              <strong>User Email:</strong> {notification?.data?.user_email}
            </p>
            <p>
              <strong>Importance Level:</strong>{" "}
              {notification?.data?.importance_level}
            </p>
            <p>
              <strong>Status:</strong>
              {notification?.read_at ? (
                <span className="badge badge-success">Read</span>
              ) : (
                <span className="badge badge-danger">Unread</span>
              )}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {formatDate(notification?.created_at)}
            </p>

            <p>
              <strong>Updated At:</strong>{" "}
              {formatDate(notification?.updated_at)}
            </p>

            <p>
              <strong>Read At:</strong> {formatDate(notification?.read_at)}
            </p>
            <p>
               {
                notification?.read_at==null&&(
                  <button
                  className={"btn btn-sm btn-success mx-2"}
                  onClick={() => handleReadAt(notification?.id)}
                >
                   Mark As Read
                </button>

                )
               }

            </p>
          </div>
        </div>
        <br />
        <Link
          href={route("notifications.index")}
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
