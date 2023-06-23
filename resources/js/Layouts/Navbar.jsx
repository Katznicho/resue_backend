import { Link, usePage } from "@inertiajs/inertia-react";

const Navbar = () => {

  const {
    props: {  auth },
  } = usePage();



 const image =  auth?.user?.user_image;

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
           <Link href={route("dashboard")} class="nav-link">
            Dashboard
          </Link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link">
            Contact
          </a>
        </li>
      </ul>



      <div class="navbar-nav ml-auto">
        <li class="nav-item dropdown mr-3">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="fas fa-bell fa-2x"></i>
            <span class="badge badge-sm badge-warning navbar-badge" style={{fontSize:"10pz", padding: "2px 4px"}}>15</span>
          </a>
        </li>
        <a
          class="dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={image}
            class="rounded-circle"
            width="30"
            height="30"
          />
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end p-2"
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <div class="container px-16 py-2">
              <Link href={route("profile")}>
                <i class="fas fa-user-edit me-2"></i>Profile
              </Link>
            </div>
          </li>
          <li>
            <div class="container px-16 py-2">
              <Link href={route("changePassword")}>
                <i class="fas fa-lock me-2"></i>Change Password
              </Link>
            </div>
          </li>
          <li>
            <div class="container px-16 py-2">
              <Link href={route("logout")}>
                <i class="fas fa-sign-out-alt me-2"></i>Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
