import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Plan } from './Plan.entity';

export const GetPlan = createParamDecorator(
  (_data, ctx: ExecutionContext): Plan => {
    const req = ctx.switchToHttp().getRequest();
    return req.plan;
  },
);
