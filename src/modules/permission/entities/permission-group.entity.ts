import {
  Entity,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { BaseEntity } from "../../../common/entities/BaseEntity";
import { Permission } from "./permission.entity";

@Entity("permission_groups")
@Unique(["name"])
export class PermissionGroup extends BaseEntity {
  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  name!: string; // Module name: 'Product', 'User', 'Role', etc.

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @OneToMany(
    () => Permission,
    (permission) => permission.permissionGroup
    // No cascade: true - permissions managed explicitly
  )
  permissions!: Permission[];
}