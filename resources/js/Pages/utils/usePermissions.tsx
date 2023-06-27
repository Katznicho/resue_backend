import { useState } from "react";

export const usePermissions = ()=>{
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      name: "Settings",
      permissions: [
        "Manage Settings",
        "Add Setting",
        "Edit Setting",
        "Delete Setting",
      ],
    },
    {
      id: 2,
      name: "Roles",
      permissions: ["Manage Roles", "Add Role", "Edit Role", "Delete Role"],
    },
    {
      id: 3,
      name: "Users",
      permissions: ["Manage Users", "Add User", "Edit User", "Delete User"],
    },

    {
      id: 1,
      name: "Analytics",
      permissions: [
        "Manage Analytics",
        "Add Analytics",
        "Edit Analytics",
        "Delete Analytics",
      ],
    },
    {
      id: 1,
      name: "Reports",
      permissions: [
        "Manage Reports",
        "Add Reports",
        "Edit Reports",
        "Delete Reports",
      ],
    },
    {
      id: 1,
      name: "Logs",
      permissions: ["Manage Logs", "Add Logs", "Edit Logs", "Delete Logs"],
    },
    {
      id: 1,
      name: "Notifications",
      permissions: [
        "Manage Notifications",
        "Add Notifications",
        "Edit Notifications",
        "Delete Notifications",
      ],
    },


  ]);

  return {permissions, setPermissions}

}
