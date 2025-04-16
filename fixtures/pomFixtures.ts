/**
 * Custom Playwright test setup with page object fixtures.
 *
 * This file extends the base Playwright test object by injecting commonly used page objects
 * (LoginPage, DashboardPage, ProfilePage, etc.) as fixtures. These page objects are initialized
 * using the current `page` instance and are available in all tests via the test context.
 *
 * Fixtures:
 * - loginPage: An instance of LoginPage.
 * - dashboardPage: An instance of DashboardPage.
 * - profilePage: An instance of ProfilePage.
 */

import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../src/ui/pages/LoginPage';
import { DashboardPage } from '../src/ui/pages/DashboardPage';
import { ProfilePage } from '../src/ui/pages/ProfilePage';

type pages = {
	loginPage: LoginPage;
	dashboardPage: DashboardPage;
	profilePage: ProfilePage;
};

const testPages = baseTest.extend<pages>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
	profilePage: async ({ page }, use) => {
		await use(new ProfilePage(page));
	},
});

export const test = testPages;
export const expect = testPages.expect;
