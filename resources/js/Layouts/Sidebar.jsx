import { Inertia } from "@inertiajs/inertia";
import NavList from "@/Components/NavList";
import NavTree from "@/Components/NavTree";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { ADMIN } from "@/Pages/utils/constants";

const activateLinks = (url) => {
  let element = document.getElementById("link-" + url);

  const activeMainLinks = __(".nav-link side-main-link active");
  const activeLinks = __(".nav-link side-link active");
  if (activeMainLinks.length > 0) {
    const str = activeMainLinks[0].className;
    activeMainLinks[0].className = str.replace("active", "");
  }
  if (activeLinks.length > 0) {
    const str = activeLinks[0].className;
    activeLinks[0].className = str.replace("active", "");
  }

  //activating clicked link and its parentNode link
  element.className += " active";

  if (!element.className.includes("side-main-link"))
    element
      .closest(".has-treeview")
      .querySelector(".side-main-link").className += " active";
};

Inertia.on("navigate", (event) => {
  let url = event.detail.page.url.replace("/", "");
  activateLinks(url);
});

const Sidebar = () => {
  const user = usePage().props.auth.user;

  const roles = usePage().props.auth.role;

  const user_name = user.name;
  const user_email = user.email;
  const image =  user?.user_image;

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={image}
              className="img-circle elevation-2"
              alt="User Image"
              width={"500px"}
              height={"500px"}
               style={{
                 width:60,
                 height:60,
                 marginLeft:-5
               }}
            />
          </div>
          <div className="info">
            <span className="d-block" style={{ color: "white" }}>
              {user_name}
            </span>
            <span className="d-block" style={{ color: "white" }}>
              {user_email}
            </span>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <NavList
              href={route("dashboard")}
              aClass="side-main-link"
              iClass="fas fa-home"
              word="Dashboard"
            />

            {/* users */}
            {roles?.name == ADMIN && (
              <NavTree
                href="#"
                iClass="fas fa-users"
                word={
                  <>
                    Users<i className="right fas fa-angle-left"></i>
                  </>
                }
              >
                <ul className="nav nav-treeview">
                  <NavList
                    href={route("users.index")}
                    aClass="side-link"
                    iClass="fas fa-users"
                    word="Manage Users"
                  />
                  <NavList
                    href={route("users.create")}
                    aClass="side-link"
                    iClass="fas fa-user"
                    word="Add Users"
                  />
                </ul>
              </NavTree>
            )}

            {/* users */}

            {/* roles */}
            {roles?.name == ADMIN && (
              <NavTree
                href="registry"
                iClass="fas fa-server"
                word={
                  <>
                    Roles<i className="right fas fa-angle-left"></i>
                  </>
                }
              >
                <ul className="nav nav-treeview">
                  <NavList
                    href={route("roles.index")}
                    aClass="side-link"
                    iClass="fas fa-server"
                    word="Manage Roles"
                  />
                  <NavList
                    href={route("roles.create")}
                    aClass="side-link"
                    iClass="fas fa-server"
                    word="Add Roles"
                  />
                </ul>
              </NavTree>
            )}

            {/* roles */}





            {/* categories */}
            <NavTree
              href="registry"
              iClass="fas fa-bell"
              word={
                <>
                  Categories<i className="right fas fa-angle-left"></i>
                </>
              }
            >
              <ul className="nav nav-treeview">
                <NavList
                  href={route("categories.index")}
                  aClass="side-link"
                  iClass="fas fa-bell"
                  word="Manage Categories"
                />
              </ul>
              <ul className="nav nav-treeview">
                <NavList
                  href={route("categories.create")}
                  aClass="side-link"
                  iClass="fas fa-bell"
                  word="Create Categories"
                />
              </ul>
            </NavTree>

            {/* categories */}

            {/* notifications */}

            <NavTree
              href="registry"
              iClass="fas fa-bell"
              word={
                <>
                  Notifications<i className="right fas fa-angle-left"></i>
                </>
              }
            >
              <ul className="nav nav-treeview">
                <NavList
                  href={route("notifications.index")}
                  aClass="side-link"
                  iClass="fas fa-bell"
                  word="Manage Notifications"
                />
              </ul>
              <ul className="nav nav-treeview">
                <NavList
                  href={route("getReadNotifications")}
                  aClass="side-link"
                  iClass="fas fa-bell"
                  word="Read Notifications"
                />
              </ul>
              <ul className="nav nav-treeview">
                <NavList
                  href={route("getUnreadNotifications")}
                  aClass="side-link"
                  iClass="fas fa-bell"
                  word="Unread Notifications"
                />
              </ul>
            </NavTree>
            {/* notifications */}




            {/* settings */}
           
            {/* settings */}

            {/* logs */}
            <NavTree
              href="registry"
              iClass="fas fa-bell"
              word={
                <>
                  System logs<i className="right fas fa-angle-left"></i>
                </>
              }
            >
              <ul className="nav nav-treeview">
                <NavList
                  href={route("logs.index")}
                  aClass="side-link"
                  iClass="fas fa-bell"
                  word="Manage Logs"
                />
              </ul>
            </NavTree>
            {/* logs */}
          </ul>
        </nav>

        <hr />
        <div className="ml-3">
          <InertiaLink
            href={route("logout")}
            method="post"
            as="button"
            className="anchor-button"
            style={{ color: "white" }}
          >
            <i className="fas fa-sign-out"></i>Log Out
          </InertiaLink>
        </div>
        <hr />
      </div>
    </aside>
  );
};

export default Sidebar;
