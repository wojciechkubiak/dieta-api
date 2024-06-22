import { Injectable } from '@nestjs/common';
import Plan from './plan.model';

@Injectable()
export class PlansService {
  private plans: Plan[] = [];

  getTasksByUserId(userId: string): Plan[] {
    return this.plans.filter((plan) => plan.userId === userId);
  }
}
