import {
  Entity,
  Column,
  OneToMany,
  Unique,
  Index,
} from "typeorm";
import { BaseEntity } from "../../../common/entities/BaseEntity";
import { RolePermission } from "./role-permission.entity";

@Entity("roles")
@Unique(["name"])
export class Role extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  @Index()
  name!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    type: "boolean",
    default: true,
    nullable: false,
  })
  isActive!: boolean;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.role
  )
  rolePermissions!: RolePermission[];
}