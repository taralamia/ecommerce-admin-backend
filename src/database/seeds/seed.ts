import "reflect-metadata";

import { AppDataSource } from "../data-source";

import { PermissionGroup } from "../../modules/permission/entities/permission-group.entity";
import { Permission } from "../../modules/permission/entities/permission.entity";
import { Role } from "../../modules/role/entities/role.entity";
import { RolePermission } from "../../modules/role/entities/role-permission.entity";
import { User } from "../../modules/user/entities/user.entity";

import { hashPassword } from "../../common/utils/password";

import { permissionGroups } from "./seed-data";

async function seed() {
  try {
    await AppDataSource.initialize();

    console.log("🌱 Database connected.");

    const permissionGroupRepository =
      AppDataSource.getRepository(PermissionGroup);

    const permissionRepository =
      AppDataSource.getRepository(Permission);

    const roleRepository =
      AppDataSource.getRepository(Role);

    const rolePermissionRepository =
      AppDataSource.getRepository(RolePermission);

    const userRepository =
      AppDataSource.getRepository(User);

    // ==========================================
    // STEP 1
    // Seed Permission Groups
    // ==========================================

    for (const group of permissionGroups) {
      let permissionGroup =
        await permissionGroupRepository.findOne({
          where: {
            name: group.name,
          },
        });

      if (!permissionGroup) {
        permissionGroup =
          permissionGroupRepository.create({
            name: group.name,
            description: group.description,
          });

        await permissionGroupRepository.save(permissionGroup);
      }

      console.log(`✔ ${group.name}`);
    }

    console.log("✅ Permission groups seeded.");

    // ==========================================
    // STEP 2
    // Seed Permissions
    // ==========================================

    for (const group of permissionGroups) {
      const permissionGroup =
        await permissionGroupRepository.findOneOrFail({
          where: {
            name: group.name,
          },
        });

      for (const action of group.actions) {
        const permissionName =
          `${group.name.toLowerCase()}:${action}`;

        const exists =
          await permissionRepository.findOne({
            where: {
              name: permissionName,
            },
          });

        if (!exists) {
          await permissionRepository.save(
            permissionRepository.create({
              name: permissionName,
              description: `${action} ${group.name}`,
              permissionGroup,
            })
          );
        }

        console.log(`   └── ${permissionName}`);
      }
    }

    console.log("✅ Permissions seeded.");

    console.log("✅ Seed completed.");

    await AppDataSource.destroy();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seed();