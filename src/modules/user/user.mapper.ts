import { User } from "./entities/user.entity";

export function mapUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    avatarId: user.avatarId,
    roleId: user.roleId,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}