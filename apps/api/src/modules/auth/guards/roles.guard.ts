import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@enterprise/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      throw new ForbiddenException('User lacks required role credentials.');
    }

    const hasRole = requiredRoles.includes(user.role) || user.role === UserRole.SUPER_ADMIN;
    if (!hasRole) {
      throw new ForbiddenException(`Forbidden: requires one of [${requiredRoles.join(', ')}]`);
    }

    return true;
  }
}
