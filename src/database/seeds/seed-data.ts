export const permissionGroups = [
  {
    name: "Dashboard",
    description: "Dashboard permissions",
    actions: ["watch"],
  },
  {
    name: "Permission",
    description: "Permission management",
    actions: ["watch", "create", "read", "update", "delete"],
  },
  {
    name: "Role",
    description: "Role management",
    actions: ["watch", "create", "read", "update", "delete"],
  },
  {
    name: "User",
    description: "User management",
    actions: ["watch", "create", "read", "update", "delete"],
  },
  {
    name: "Media",
    description: "Media management",
    actions: ["watch", "read", "upload", "write", "delete"],
  },
  {
    name: "Category",
    description: "Category management",
    actions: ["watch", "create", "read", "update", "delete"],
  },
  {
    name: "Brand",
    description: "Brand management",
    actions: ["watch", "create", "read", "update", "delete"],
  },
  {
    name: "Attribute",
    description: "Attribute management",
    actions: ["watch", "create", "read", "update", "delete"],
  },
  {
    name: "Product",
    description: "Product management",
    actions: ["watch", "create", "read", "update", "delete"],
  },
];
export const roles = [
  {
    name: "Super Administrator",
    description: "Full system access",
    isActive: true,
  },
  {
    name: "Catalog Manager",
    description: "Can manage catalog only",
    isActive: true,
  },
];

export const seedUsers = [
  {
    name: "Super Admin",
    email: "admin@example.com",
    password: "Admin@1234",
    phone: "01700000000",
    gender: "other",
    isActive: true,
    roleName: "Super Administrator",
  },
];

export const catalogPermissions = [
  "dashboard:watch",

  "media:watch",
  "media:read",
  "media:upload",
  "media:write",
  "media:delete",

  "category:watch",
  "category:create",
  "category:read",
  "category:update",
  "category:delete",

  "brand:watch",
  "brand:create",
  "brand:read",
  "brand:update",
  "brand:delete",

  "attribute:watch",
  "attribute:create",
  "attribute:read",
  "attribute:update",
  "attribute:delete",

  "product:watch",
  "product:create",
  "product:read",
  "product:update",
  "product:delete",
];