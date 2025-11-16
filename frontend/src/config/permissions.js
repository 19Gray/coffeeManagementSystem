export const ROLE_PERMISSIONS = {
  ceo: {
    canAccess: [
      "dashboard",
      "farms",
      "production",
      "inventory",
      "analytics",
      "reports",
      "users",
      "settings",
    ],
    label: "CEO",
  },
  ict_manager: {
    canAccess: ["dashboard", "inventory", "analytics", "settings"],
    label: "ICT Manager",
  },
  operations_manager: {
    canAccess: [
      "dashboard",
      "farms",
      "production",
      "inventory",
      "reports",
      "settings",
    ],
    label: "Operations Manager",
  },
  agronomist: {
    canAccess: ["dashboard", "production", "inventory", "analytics"],
    label: "Agronomist",
  },
  supervisor: {
    canAccess: ["dashboard", "farms", "production", "inventory", "reports"],
    label: "Supervisor",
  },
  farm_worker: {
    canAccess: ["dashboard", "production", "inventory"],
    label: "Farm Worker",
  },
  guest: {
    canAccess: ["dashboard"],
    label: "Guest",
  },
};

export const getPermittedMenuItems = (userRole) => {
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions ? permissions.canAccess : [];
};
