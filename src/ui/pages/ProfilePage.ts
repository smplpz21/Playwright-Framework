/**
 * ProfilePage encapsulates the interactions with the user's profile page.
 * Extends the BasePage to reuse common Playwright wrapper methods for element interaction.
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
	/** Locator for the address input textbox */
	readonly addressTextbox: Locator;

	/** Locator for the profile saved success alert */
	readonly profileSavedAlert: Locator;

	/** CSS selector for the hobby dropdown (used with selectOption) */
	readonly hobbySelector: string;

	/** Locator for the save profile button */
	readonly saveProfileButton: Locator;

	/** Locator for the hobby dropdown element */
	readonly hobbyDropdown: Locator;

	/**
	 * Initializes the ProfilePage with all necessary locators.
	 * @param {Page} page - The Playwright Page object.
	 */
	constructor(page: Page) {
		super(page);
		this.addressTextbox = page.getByRole('textbox', { name: 'Address', exact: true });
		this.hobbySelector = '#hobby';
		this.saveProfileButton = page.getByRole('button', { name: 'Save' });
		this.profileSavedAlert = page.locator('.alert-success.hidden-md-down');
		this.hobbyDropdown = page.locator('#hobby');
	}

	/**
	 * Updates the address field with the specified address.
	 * @param {string} address - The new address to set.
	 * @returns {Promise<void>}
	 */
	async updateAddress(address: string): Promise<void> {
		await this.clearTextbox(this.addressTextbox);
		await this.fillFormField(this.addressTextbox, address);
	}

	/**
	 * Selects a hobby from the dropdown using its value.
	 * @param {string} hobby - The value of the hobby to select.
	 * @returns {Promise<void>}
	 */
	async selectAHobby(hobby: string): Promise<void> {
		await this.selectDropdownByValue(this.hobbySelector, hobby);
	}

	/**
	 * Clicks the save profile button.
	 * @returns {Promise<void>}
	 */
	async clickSaveProfileButton(): Promise<void> {
		await this.clickElement(this.saveProfileButton);
	}

	/**
	 * Retrieves the current value of the address input field.
	 * @returns {Promise<string>} The input value.
	 */
	async getAddressInputValue(): Promise<string> {
		return await this.getElementInputValue(this.addressTextbox);
	}

	/**
	 * Retrieves the currently selected hobby value from the dropdown.
	 * @returns {Promise<string>} The selected hobby.
	 */
	async getHobbyInputValue(): Promise<string> {
		return await this.getElementInputValue(this.hobbyDropdown);
	}

	/**
	 * Reloads the profile page.
	 * @returns {Promise<void>}
	 */
	async reloadProfilePage(): Promise<void> {
		await this.refreshPage();
	}
}
