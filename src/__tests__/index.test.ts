import { BlueBase } from '@bluebase/core';
import Plugin from '../index';

/**
 * Mocking expo Library
 */

jest.mock('expo', () => ({}));

test('Plugin should be correctly registered', async () => {
	jest.mock('expo', () => jest.fn());
	const BB = new BlueBase();
	await BB.Plugins.register(Plugin);
	expect(BB.Plugins.has('hello-world')).toBeTruthy();
});
