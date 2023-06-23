import React, { useEffect, useState } from "react";
import Main from "@/Layouts/Main";
import { useForm, usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

const Index = () => {
  const {
    props: {
      auth,
      device_configurations,
      security_configurations,
      notification_configurations,
    },
  } = usePage();



  const { data, setData, post, processing, clearErrors } = useForm({
    notification_configurations: [],
    security_configurations: [],
    device_configurations: [],
  });

  //security configurations form data

  const [notifications, setNotifications] = useState(
    notification_configurations
  );
  const [security, setSecurity] = useState(security_configurations);
  const [device, setDevice] = useState(device_configurations);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.notification_configurations.length == 0) {
      Swal.fire({
        title: "Warning!",
        text: "Please update at least one notification channel",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      post(route("updateNotifications"), {
        onSuccess: (msg) => {
          Swal.fire({
            title: "Success!",
            text: "Notification Configurations updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });

          //clear form
          setData("notification_configurations", []);

          clearErrors();
        },
        onError: (error) => {
          Swal.fire({
            title: "Error!",
            text: `${error?.error}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        },
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Update the state of notifications
    setNotifications((prevNotifications) =>
      prevNotifications?.map((notification) => {
        if (notification?.value === name) {
          return { ...notification, enabled: checked };
        } else {
          return notification;
        }
      })
    );

    // Update the state of data
  };

  useEffect(() => {
    setData("notification_configurations", notifications);
  }, [notifications]);

  useEffect(() => {
    setData("security_configurations", security);
  }, [security]);
  useEffect(() => {
    setData("device_configurations", device);
  }, [device]);

  useEffect;

  const handleSecurityCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // Update the state of notifications
    setSecurity((prevSecurity) =>
      prevSecurity.map((security) =>
        security.value === name ? { ...security, enabled: checked } : security
      )
    );
  };

  const handleDeviceCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // Update the state of notifications
    setDevice((prevDevice) =>
      prevDevice.map((device) =>
        device.value === name ? { ...device, enabled: checked } : device
      )
    );
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    if (data.security_configurations.length == 0) {
      Swal.fire({
        title: "Warning!",
        text: "Please update at least one security configuration",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      post(route("updateSecurity"), {
        onSuccess: (msg) => {
          Swal.fire({
            title: "Success!",
            text: "Security Configurations updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });

          //clear form
          setData("security_configurations", []);
          clearErrors();
        },
        onError: (error) => {
          Swal.fire({
            title: "Error!",
            text: `${error?.error}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        },
      });
    }
  };

  const handleDeviceSubmit = (e) => {
    e.preventDefault();
    if (data.device_configurations.length == 0) {
      Swal.fire({
        title: "Warning!",
        text: "Please update at least one device configuration",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      post(route("updateDevice"), {
        onSuccess: (msg) => {
          Swal.fire({
            title: "Success!",
            text: "Device Configurations updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });

          //clear form
          setData("device_configurations", []);

          clearErrors();
        },
        onError: (error) => {
          Swal.fire({
            title: "Error!",
            text: `${error?.error}`,
            icon: "error",
            confirmButtonText: "OK",
          });
        },
      });
    }
  };

  return (
    <div>
      <div className="ml-2">
        <h1 className="ml-4">Manage Settings</h1>
        {/* settings */}
        <div className="row">
          <div className="col-md-6">
            <div className="card card-success m-0 m-md-4 my-4 m-md-0 shadow">
              <div className="card-header text-center">
                <h1 className="card-title">Notification Channels</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group col-lg-6 col-md-6">
                      {notifications?.map((notification) => {
                        return (
                          <div
                            key={notification?.id}
                            className="form-check form-switch custom-control.custom-switch.custom-switch-xl"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={notification?.id}
                              onChange={handleCheckboxChange}
                              checked={notification?.enabled ? true : false}
                              name={notification?.value}
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              {notification?.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    disabled={processing}
                    type="submit"
                    className="btn waves-effect waves-light btn-rounded btn-primary btn-block mt-3"
                  >
                    {processing ? "Processing..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* security settings */}
          <div className="col-md-6">
            <div className="card card-success m-0 m-md-4 my-4 m-md-0 shadow">
              <div className="card-header text-center">
                <h1 className="card-title">Security Settings</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSecuritySubmit}>
                  <div className="row">
                    <div className="form-group col-lg-6 col-md-6">
                      {security?.map((sec) => {
                        return (
                          <div
                            key={sec?.id}
                            className="form-check form-switch custom-control.custom-switch.custom-switch-xl"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={sec?.id}
                              onChange={handleSecurityCheckboxChange}
                              checked={sec?.enabled ? true : false}
                              name={sec?.value}
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              {sec?.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    disabled={processing}
                    type="submit"
                    className="btn waves-effect waves-light btn-rounded btn-primary btn-block mt-3"
                  >
                    {processing ? "Processing..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* security settings */}
        </div>

        {/* settings */}

        {/* device */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-success m-0 m-md-4 my-4 m-md-0 shadow">
              <div className="card-header text-center">
                <h1 className="card-title">Device Status</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleDeviceSubmit}>
                  <div className="row">
                    <div className="form-group col-lg-6 col-md-6">
                      {device?.map((sec) => {
                        return (
                          <div
                            key={sec?.id}
                            className="form-check form-switch custom-control.custom-switch.custom-switch-xl"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={sec?.id}
                              onChange={handleDeviceCheckboxChange}
                              checked={sec?.enabled ? true : false}
                              name={sec?.value}
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            >
                              {sec?.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    disabled={processing}
                    type="submit"
                    className="btn waves-effect waves-light btn-rounded btn-primary btn-block mt-3"
                  >
                    {processing ? "Processing..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* device */}
      </div>
    </div>
  );
};

Index.layout = (page) => <Main children={page} title="Manage Settings" />;

export default Index;
