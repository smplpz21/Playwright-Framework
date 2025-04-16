/**
 * DashboardPage encapsulates the interactions with the application's dashboard page.
 * Extends the BasePage to reuse common Playwright wrapper methods for element interaction.
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
	/** Locator for the Profile navigation link */
	readonly profileNavLink: Locator;

	/**
	 * Initializes the DashboardPage with necessary locators.
	 * @param {Page} page - The Playwright Page object.
	 */
	constructor(page: Page) {
		super(page);
		this.profileNavLink = page.getByRole('link', { name: 'Profile' });
	}

	/**
	 * Clicks the Profile navigation link to go to the profile page.
	 * @returns {Promise<void>}
	 */
	async clickProfileNavigationLink(): Promise<void> {
		await this.clickElement(this.profileNavLink);
	}
}
