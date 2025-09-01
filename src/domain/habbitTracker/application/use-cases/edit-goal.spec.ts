import { MakeGoal } from 'test/factories/make-goal';
import { MakeGoalReward } from 'test/factories/make-goal-reward';
import { InMemoryGoalRewardsRepository } from 'test/repositories/in-memory-goal-rewards-repository';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditGoalUseCase } from './edit-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let inMemoryGoalRewardsRepository: InMemoryGoalRewardsRepository;
let sut: EditGoalUseCase;

describe('Edit goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalRewardsRepository = new InMemoryGoalRewardsRepository();
		inMemoryGoalsRepository = new InMemoryGoalsRepository(
			inMemoryGoalRewardsRepository,
		);
		sut = new EditGoalUseCase(
			inMemoryGoalsRepository,
			inMemoryGoalRewardsRepository,
		);
	});

	it('Shoud be able edit a goal', async () => {
		const createdGoal = MakeGoal({}, new UniqueEntityID('goal-to-edit-id'));

		await inMemoryGoalsRepository.create(createdGoal);

		await inMemoryGoalRewardsRepository.create(
			MakeGoalReward({
				goalId: createdGoal.id,
				rewardId: new UniqueEntityID('001'),
			}),
		);
		await inMemoryGoalRewardsRepository.create(
			MakeGoalReward({
				goalId: createdGoal.id,
				rewardId: new UniqueEntityID('002'),
			}),
		);

		const result = await sut.execute({
			goalId: 'goal-to-edit-id',
			statement: 'Urgent Goal',
			rewardIds: ['001', '003'],
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryGoalsRepository.items[0]).toMatchObject({
			statement: 'Urgent Goal',
		});
		expect(inMemoryGoalsRepository.items[0].rewards.currentItems).toHaveLength(
			2,
		);
		expect(inMemoryGoalsRepository.items[0].rewards.currentItems).toEqual([
			expect.objectContaining({
				rewardId: new UniqueEntityID('001'),
			}),
			expect.objectContaining({
				rewardId: new UniqueEntityID('003'),
			}),
		]);
	});
});
