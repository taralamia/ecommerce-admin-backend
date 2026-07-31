import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "../../../common/entities/BaseEntity";
import { PermissionGroup } from "./permission-group.entity";
import {RolePermission} from "../../role/entities/role-permission.entity";
@Entity("permissions")
@Unique(["name"])
export class Permission extends BaseEntity {
  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  name!: string; // Format: 'product:create', 'user:read', etc.

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @ManyToOne(
    () => PermissionGroup,
    (permissionGroup) => permissionGroup.permissions,
    {
      onDelete: "CASCADE",
      nullable: false,
    }
  )
  @JoinColumn({ name: "permission_group_id" })
  permissionGroup!: PermissionGroup;
  // One Permission can be assigned to many Roles
  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission  // ✅ References the correct side
  )
  rolePermissions!: RolePermission[];
}