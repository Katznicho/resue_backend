import React from "react";

const Footer = () => {
  return (
    <div className="my-4">
      <footer className="main-footer ">
        <strong>
          Copyright &copy; 2021-{new Date().getFullYear()}{" "}
          <span
            style={{ fontFamily: "Orbitron,monospace", textAlign: "center" }}
          >
            Smart Baby Monitoring System
          </span>
          .{" "}
        </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0
        </div>
      </footer>
    </div>
  );
};

export default Footer;
