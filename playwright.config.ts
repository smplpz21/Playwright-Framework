import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
	// reportSlowTests: null,
	testDir: './tests',
	fullyParallel: true,
	retries: 1,
	workers: 6,
	reporter: [['html']],
	use: {
		headless: false,
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
				username: process.env.TEST_USERNAME_CHROME!,
				password: process.env.TEST_PASSWORD_CHROME!
				
			} as any,
		},

		{
			name: 'firefox-ui',
			testMatch: 'ui/*.ts',
			use: {
				baseURL: process.env.BASE_URL,
				...devices['Desktop Firefox'],
				username: process.env.TEST_USERNAME_FIREFOX!,
				password: process.env.TEST_PASSWORD_FIREFOX!
			},
		},

		{
			name: 'webkit-ui',
			testMatch: 'ui/*.ts',
			use: {
				baseURL: process.env.BASE_URL,
				...devices['Desktop Safari'],
				username: process.env.TEST_USERNAME_WEBKIT!,
				password: process.env.TEST_PASSWORD_WEBKIT!
			},
		},
	],
});
