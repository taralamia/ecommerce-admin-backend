import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from "typeorm";
import { BaseEntity } from "../../../common/entities/BaseEntity";
import { Role } from "../../role/entities/role.entity";

@Entity("users")
@Unique(["email"])
export class User extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  @Index()
  email!: string;

  @Column({
    name: "password_hash",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  passwordHash!: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  phone!: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  gender!: string; // 'male', 'female', 'other', 'prefer-not-to-say'

  @Column({
    name: "avatar_id",
    type: "uuid",
    nullable: true,
  })
  avatarId?: string; // Will reference Media.id later

  @Column({
    name: "refresh_token_hash",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  refreshTokenHash?: string;

  @Column({
    name: "is_active",
    type: "boolean",
    default: true,
    nullable: false,
  })
  isActive!: boolean;

  @Column({
    name: "role_id",
    type: "uuid",
    nullable: false,
  })
  roleId!: string;

  @ManyToOne(
    () => Role,
    (role) => role.users,
    {
      onDelete: "RESTRICT", // Prevent deleting a role that has users
      nullable: false,
    }
  )
  @JoinColumn({ name: "role_id" })
  role!: Role;

  // TODO: Add avatar relationship when Media module is built
  // @ManyToOne(
  //   () => Media,
  //   (media) => media.users,
  //   {
  //     onDelete: "SET NULL",
  //     nullable: true,
  //   }
  // )
  // @JoinColumn({ name: "avatar_id" })
  // avatar?: Media;
}