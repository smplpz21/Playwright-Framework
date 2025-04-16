import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
	// timeout: 60000,
	// reportSlowTests: null,
	expect: {
		timeout: 10000,
	},
	testDir: './tests',
	fullyParallel: true,
	retries: 1,
	workers: 9,
	reporter: [['html']],
	use: {
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium-ui',
			testMatch: 'ui/*.ts',
			use: {
				baseURL: process.env.BASE_URL,
				...devices['Desktop Chrome'],
			},
		},

		{
			name: 'firefox-ui',
			testMatch: 'ui/*.ts',
			use: {
				baseURL: process.env.BASE_URL,
				...devices['Desktop Firefox'],
			},
		},

		{
			name: 'webkit-ui',
			testMatch: 'ui/*.ts',
			use: {
				baseURL: process.env.BASE_URL,
				...devices['Desktop Safari'],
			},
		},
	],
});
