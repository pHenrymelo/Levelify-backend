import { describe, expect, it } from 'vitest';
import { Slug } from './slug';

describe('Slug tests', () => {
	it('Shoud be able create a new slug from a text', async () => {
		const slug = Slug.createFromText('it is time to level up');

		expect(slug.value).toEqual('it-is-time-to-level-up');
	});
});
