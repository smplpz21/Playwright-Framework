/**
 * LoginPage encapsulates the interactions with the login page.
 * Extends the BasePage to reuse common Playwright wrapper methods for element interaction.
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
	/** Locator for the login/username input field */
	readonly loginTextbox: Locator;

	/** Locator for the password input field */
	readonly passwordTextbox: Locator;

	/** Locator for the login button */
	readonly loginButton: Locator;

	/**
	 * Initializes the LoginPage with all necessary locators.
	 * @param {Page} page - The Playwright Page object.
	 */
	constructor(page: Page) {
		super(page);
		this.loginTextbox = page.getByRole('textbox', { name: 'Login' });
		this.passwordTextbox = page.locator('[name=password]');
		this.loginButton = page.getByRole('button', { name: 'Login' });
	}

	/**
	 * Fills the login textbox with the provided username.
	 * @param {string} username - The username to input.
	 * @returns {Promise<void>}
	 */
	async enterUsername(username: string): Promise<void> {
		await this.fillFormField(this.loginTextbox, username);
	}

	/**
	 * Fills the password textbox with the provided password.
	 * @param {string} password - The password to input.
	 * @returns {Promise<void>}
	 */
	async enterPassword(password: string): Promise<void> {
		await this.fillFormField(this.passwordTextbox, password);
	}

	/**
	 * Clicks the login button to submit the form.
	 * @returns {Promise<void>}
	 */
	async clickLoginButton(): Promise<void> {
		await this.clickElement(this.loginButton);
	}
}
