/**
 * BasePage class encapsulates common interactions with Playwright's Page and Locator objects.
 * This class is designed to be extended by specific page objects in the test framework.
 */

import { Locator, Page } from '@playwright/test';

export class BasePage {
	protected readonly page: Page;

	/**
	 * Initializes the BasePage with the provided Playwright Page instance.
	 * @param {Page} page - The Playwright Page object.
	 */
	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Navigates to the specified URL.
	 * @param {string} url - The destination URL.
	 */
	async navigateTo(url: string) {
		await this.page.goto(url);
	}

	/**
	 * Clicks on the specified element.
	 * @param {Locator} element - The Playwright Locator for the element.
	 */
	protected async clickElement(element: Locator): Promise<void> {
		await element.click();
	}

	/**
	 * Fills a form field with the provided text.
	 * @param {Locator} element - The input field locator.
	 * @param {string} text - The text to enter.
	 */
	protected async fillFormField(element: Locator, text: string): Promise<void> {
		await element.fill(text);
	}

	/**
	 * Retrieves the inner text of the specified element.
	 * @param {Locator} element - The locator of the element.
	 * @returns {Promise<string>} The inner text of the element.
	 */
	protected async getElementText(element: Locator): Promise<string> {
		return await element.innerText();
	}

	/**
	 * Waits until the element becomes visible.
	 * @param {Locator} element - The locator of the element.
	 */
	protected async waitForElementVisible(element: Locator) {
		await element.waitFor({ state: 'visible', timeout: 30000 });
	}

	/**
	 * Waits until the element becomes hidden.
	 * @param {Locator} element - The locator of the element.
	 */
	protected async waitForElementHidden(element: Locator) {
		await element.waitFor({ state: 'hidden', timeout: 5000 });
	}

	/**
	 * Captures a screenshot of the current page.
	 * @param {string} filename - The path where the screenshot will be saved.
	 */
	protected async takeScreenshot(filename: string) {
		await this.page.screenshot({ path: filename });
	}

	/**
	 * Checks if the element is visible on the page.
	 * @param {Locator} element - The locator of the element.
	 * @returns {Promise<boolean>} True if visible, otherwise false.
	 */
	protected async isElementVisible(element: Locator): Promise<boolean> {
		return await element.isVisible();
	}

	/**
	 * Checks if the element is hidden on the page.
	 * @param {Locator} element - The locator of the element.
	 * @returns {Promise<boolean>} True if hidden, otherwise false.
	 */
	protected async isElementHidden(element: Locator): Promise<boolean> {
		return await element.isHidden();
	}

	/**
	 * Selects a value from a dropdown using its selector and option value.
	 * @param {string} selector - The CSS selector for the dropdown element.
	 * @param {string} option - The value to select.
	 */
	protected async selectDropdownByValue(selector: string, option: string): Promise<void> {
		await this.page.selectOption(selector, option);
	}

	/**
	 * Reloads the current page.
	 */
	protected async refreshPage() {
		await this.page.reload();
	}

	/**
	 * Clears the content of a textbox element.
	 * @param {Locator} element - The locator of the textbox.
	 */
	protected async clearTextbox(element: Locator) {
		await element.clear();
	}

	/**
	 * Gets the current input value from an input field.
	 * @param {Locator} element - The input field locator.
	 * @returns {Promise<string>} The input value.
	 */
	protected async getElementInputValue(element: Locator): Promise<string> {
		return element.inputValue();
	}
}
