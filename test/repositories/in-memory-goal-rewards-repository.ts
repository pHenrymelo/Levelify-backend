import type { GoalRewardsRepository } from '@/domain/habbitTracker/application/repositories/goal-rewards-repository';
import type { GoalReward } from '@/domain/habbitTracker/enterprise/entities/goal-reward';

export class InMemoryGoalRewardsRepository implements GoalRewardsRepository {
  public items: GoalReward[] = [];

  async create(goalReward: GoalReward) {
    this.items.push(goalReward);
  }

  async findById(id: string) {
        const goalReward = this.items
          .find((item) => item.id.toString() === id);
    
        if (!goalReward) {
          return null;
        }
    
        return goalReward;
      }
    
      async delete(goalReward: GoalReward) {
        const itemIndex = this.items.
          findIndex((item) => item.id === goalReward.id);
    
        this.items.splice(itemIndex, 1);
      }
    
      async save(goalReward: GoalReward) {
        const itemIndex = this.items.
          findIndex((item) => item.id === goalReward.id);
    
        this.items[itemIndex] = goalReward;
      }
    
      async findByGoalId(goalId: string){
        const reward = this.items
          .find((item) => item.goalId.toString() === goalId);
  
        if (!reward) {
          return null;
        }
  
        return reward;
      }

}
