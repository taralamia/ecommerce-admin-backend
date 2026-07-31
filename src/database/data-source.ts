import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env.config";
import { Permission } from "../modules/permission/entities/permission.entity";
import { PermissionGroup } from "../modules/permission/entities/permission-group.entity";
import { Role } from "../modules/role/entities/role.entity";
import { RolePermission } from "../modules/role/entities/role-permission.entity";
import { User } from "../modules/user/entities/user.entity";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  synchronize: false,
  logging: true,

  // Register entity classes explicitly so TypeORM picks them up reliably.
  entities: [Permission, PermissionGroup, Role, RolePermission, User],
  migrations: ["src/database/migrations/*.ts"],

  subscribers: [],
});