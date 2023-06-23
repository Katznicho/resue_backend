import React  from "react";
import Main from "@/Layouts/Main";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";




const Index = () => {
  const {
    props: { roles, auth },
  } = usePage();

  return (
    <div>
      <div className="ml-2">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Unauthorized Access</h5>
            <p class="card-text">
              Sorry, but you are not authorized to view this page.
            </p>
            <div>
              <InertiaLink
                href={route("dashboard")}
                className="btn btn-sm btn-warning mx-2"
              >
                Back Home
              </InertiaLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="You have permissions" />;

export default Index;
