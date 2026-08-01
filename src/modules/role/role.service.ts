import { In } from "typeorm";
import AppError from "../../common/errors/AppError";
import { AppDataSource } from "../../database/data-source";
import { Permission } from "../permission/entities/permission.entity";
import { Role } from "./entities/role.entity";
import { RolePermission } from "./entities/role-permission.entity";

export class RoleService {
  private roleRepository = AppDataSource.getRepository(Role);
  private permissionRepository = AppDataSource.getRepository(Permission);
  private rolePermissionRepository =
    AppDataSource.getRepository(RolePermission);

  async createRole(data: {
    name: string;
    description?: string;
    isActive: boolean;
    permissionIds: string[];
  }) {
    const existingRole = await this.roleRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (existingRole) {
      throw new AppError(409, "Role already exists");
    }

    const permissions = await this.permissionRepository.find({
      where: {
        id: In(data.permissionIds),
      },
    });

    if (permissions.length !== data.permissionIds.length) {
      throw new AppError(404, "One or more permissions not found");
    }

    const role = this.roleRepository.create({
      name: data.name,
      description: data.description,
      isActive: data.isActive,
    });

    await this.roleRepository.save(role);

    const rolePermissions = permissions.map((permission) =>
      this.rolePermissionRepository.create({
        roleId: role.id,
        permissionId: permission.id,
      })
    );

    await this.rolePermissionRepository.save(rolePermissions);

    return role;
  }

  async getRoles() {
    return this.roleRepository.find({
      relations: {
        rolePermissions: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }
}

export const roleService = new RoleService();