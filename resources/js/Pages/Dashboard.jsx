import React, { useEffect, useState } from "react";
import Main from "@/Layouts/Main";
import CardComponent from "@/Components/CardComponent";
import { useForm, usePage } from "@inertiajs/inertia-react";
import ReactPlayer from "react-player";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Swal from "sweetalert2";

//chartjs
ChartJS.register(ArcElement, Tooltip, Legend);

const data_dog = {
  labels: ["Moving", "Sleeping", "Silent", "Laughing"],
  datasets: [
    {
      label: "Percentage of Baby Activities Per Hour",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)", // Light red
        "rgba(54, 162, 235, 0.6)", // Light blue
        "rgba(255, 206, 86, 0.6)", // Light yellow
        "rgba(75, 192, 192, 0.6)", // Light green
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)", // Solid red
        "rgba(54, 162, 235, 1)", // Solid blue
        "rgba(255, 206, 86, 1)", // Solid yellow
        "rgba(75, 192, 192, 1)", // Solid green
      ],
      borderWidth: 1,
    },
  ],
};

const options_dog = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Baby Crying Patterns",
    },
  },
};
//chartjs

const Dashboard = () => {
  const {
    props: { totals },
  } = usePage();

  // handleform
  const { data, setData, post, processing, clearErrors } = useForm({
    device_configurations: totals?.device,
  });
  const [device_config, setDeviceConf] = useState(totals?.device);


  const handleCheckboxChange = (e) => {
      const { name } = e.target;
    // Update the state of notifications
    setDeviceConf((prevNotifications) =>
      prevNotifications?.map((notification) => {
        if (notification?.name === name) {
          if(notification.status=="CONNECTED"){
            return {
              ...notification,
               sensors:notification.sensors.map(sensor=>({...sensor , status:"NOT CONNECTED"})),
              status:"NOT CONNECTED"
          };
          }
          else{
            return {
              ...notification,
              sensors:notification.sensors.map(sensor=>({...sensor , status:"CONNECTED"})),
              status:"CONNECTED",
          };
          }

        } else {
          return notification;
        }
      })
    );

  };

  const handleHandleSensor = (e) => {
    const { name, checked } = e.target;
    setDeviceConf((prevNotifications) =>
      prevNotifications?.map((notification) => {
        return {
          ...notification,
          sensors: notification.sensors.map((sensor) => {
            if (sensor.name === name) {
              if (sensor.status === "CONNECTED") {
                sensor.status = "NOT CONNECTED";
              } else {
                sensor.status = "CONNECTED";
              }
            }
            return sensor;
          })
        };
      })
    );
  };

  useEffect(() => {
    setData("device_configurations", device_config);
  }, [device_config]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.device_config == 0) {
      Swal.fire({
        title: "Warning!",
        text: "You dont have any configurations to update",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      post(route("updateDeviceConfig"), {
        onSuccess: (msg) => {
          Swal.fire({
            title: "Success!",
            text: "Configurations updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });

          //clear form
          //setData("notification_configurations", []);
          setData("device_configurations", device_config);

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
  //handleform

  //subscribe to notifications
  useEffect(() => {
    // Request permission for web push notifications
    const requestNotificationPermission = async () => {
      if ("Notification" in window && "serviceWorker" in navigator) {
        let permission = await Notification.requestPermission();
        while (permission !== "granted") {
          console.log("Notifications disabled");
          permission = await Notification.requestPermission();
        }
        registerServiceWorker();
      }
    };

    requestNotificationPermission();

  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );

      // Check if the push manager is available
      if ("PushManager" in window) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          console.log(
            "Already subscribed to push notifications:",
            subscription
          );
          // Send the existing subscription data to your Laravel backend
          sendSubscriptionToServer(subscription);
        } else {
          const newSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.VAPID_PUBLIC_KEY,
          });
          console.log("New subscription:", newSubscription);
          // Send the new subscription data to your Laravel backend
          sendSubscriptionToServer(newSubscription);
        }
      } else {
        // console.log("Push notifications are not supported");
      }
    } catch (error) {
      // console.error("Error registering service worker:", error);
    }
  };

  const sendSubscriptionToServer = async (subscription) => {
    try {
      const response = await axios.post("/subscribe", {
        subscription_data: subscription,
      });
      console.log("Subscription successful:", response.data.message);
    } catch (error) {
      console.error("Error sending subscription data to server:", error);
    }
  };
  //subscribe to notifications



  return (
    // Dashboard
    <div className="m-4">
      <h1 className="h3 mb-3">
        <strong>Analytics</strong> Dashboard
      </h1>
      <div className="row m-0 m-md-4 my-4 m-md-0 shadow p-4 ">
        <div className="col-xl-6 col-xxl-5 d-flex">
          <div className="w-80">
            <div className="row">
              <CardComponent
                color={"bg-success"}
                name={"Total Users"}
                icon={"fas fa-users"}
                total={totals?.total_users}
              />

              {/* <CardComponent
                color={"bg-warning"}
                name={"Total Babies"}
                icon={"fas fa-users"}
                total={totals?.total_babies}
              /> */}
              <CardComponent
                color={"bg-primary"}
                name={"Total Categories"}
                icon={"fas fa-cube"}
                total={10}
              />
              <CardComponent
                color={"bg-danger"}
                name={"Total Products"}
                icon={"fas fa-cube"}
                total={10}
              />
            </div>
          </div>
        </div>
        {/* second col */}
        <div className="col-md-6 mb-5">
          <div className="">
            {/* chart area */}

            {/* chart area */}
          </div>
        </div>


        {/* second col */}


      </div>

      {/* second row */}

      {/* second row */}
    </div>
  );
};

Dashboard.layout = (page) => <Main children={page} title="Dashboard" />;

export default Dashboard;
