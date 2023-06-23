import React from "react";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";

const Show = () => {
  const {
    props: { role },
  } = usePage();




  return (
    <div>
      <div className={"container"}>
        {/* details */}
        <div className="card m-4">
          <div className="card-header">
            <h3>{role?.name}</h3>
          </div>
          <div className="card-body">
            <p>{role?.description}</p>
            <p>Permissions:</p>
            <ul>
              {role.permissions.map((permission) => (
                <li key={permission.id}>{permission}</li>
              ))}
            </ul>
          </div>
          <div className="card-footer">
            <Link
              href={route("roles.edit", { id: role.id })}
              className="btn btn-primary"
            >
              Edit
            </Link>
          </div>
        </div>
        {/* details */}
      </div>
    </div>
  );
};

Show.layout = (page) => <Main children={page} title="Show Role Details" />;

export default Show;
