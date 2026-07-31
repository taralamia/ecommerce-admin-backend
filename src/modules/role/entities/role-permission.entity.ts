import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "../../permission/entities/permission.entity";

@Entity("role_permissions")
export class RolePermission {
  @PrimaryColumn({
    name: "role_id",
    type: "uuid",
    nullable: false,
  })
  roleId!: string;

  @PrimaryColumn({
    name: "permission_id",
    type: "uuid",
    nullable: false,
  })
  permissionId!: string;

  @ManyToOne(
    () => Role,
    (role) => role.rolePermissions,
    {
      onDelete: "CASCADE",
      nullable: false,
    }
  )
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @ManyToOne(
    () => Permission,  
    (permission) => permission.rolePermissions,
    {
      onDelete: "CASCADE",
      nullable: false,
    }
  )
  @JoinColumn({ name: "permission_id" })  
  permission!: Permission;
}