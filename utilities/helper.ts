import fs from 'fs';

export class Helper {
	/**
	 * Generate a random alphanumeric string.
	 * @param length - How long the string should be.
	 * @returns A random string of the specified length.
	 */
	static generateRandomString(length: number): string {
		const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	}
	/**
	 * Pick a random value from an array, avoiding the same value as last time if possible.
	 * @param values - List of possible values.
	 * @param previousValue - The value we used last time (optional).
	 * @returns A new random value from the list.
	 */

	static getRandomNonRepeatingValue<T extends string>(values: T[], previousValue: T | null): T {
		if (values.length === 0) {
			throw new Error('Array is empty');
		}

		const filtered = values.length > 1 ? values.filter((v) => v !== previousValue) : values;
		const randomIndex = Math.floor(Math.random() * filtered.length);
		return filtered[randomIndex];
	}
	/**
	 * Read test data from a JSON file under test-data/ui.
	 * @param fileName - File name (without .json extension).
	 * @returns Parsed JSON content.
	 */

	static readTestData(fileName: string) {
		return JSON.parse(fs.readFileSync(`test-data/ui/${fileName}.json`, 'utf-8'));
	}
}
