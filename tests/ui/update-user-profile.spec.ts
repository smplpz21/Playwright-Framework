import { TIMEOUT } from 'dns';
import { expect, test } from '../../fixtures/pomFixtures';
import { Helper } from '../../utilities/helper';

// Credentials from environment variables
const username = process.env.TEST_USERNAME;
const password = process.env.TEST_PASSWORD;

// Random string generator for unique test input
const randomString = Helper.generateRandomString(10);

// Load test data from JSON file
const data = Helper.readTestData('update-user-profile-data');

test('Update user profile', async ({ loginPage, dashboardPage, profilePage }) => {
	await test.step('Login as existing user', async () => {
		await loginPage.navigateTo('/');
		await loginPage.enterUsername(username as string);
		await loginPage.enterPassword(password as string);
		await loginPage.clickLoginButton();

		// Verify successful login by checking visibility of profile navigation link on dashboard
		await expect(dashboardPage.profileNavLink).toBeVisible();
	});

	await test.step('Navigate to profile page', async () => {
		await dashboardPage.clickProfileNavigationLink();

		// Ensure we have landed on the profile page by verifying address input is visible
		await expect(profilePage.addressTextbox).toBeVisible({ timeout: 10000 });
	});

	let prevAddressValue: string;
	let newAddressValue: string;
	let newHobbyValue: string;
	let prevHobbyValue: string;

	await test.step('Update profile details', async () => {
		prevAddressValue = await profilePage.getAddressInputValue();
		await profilePage.updateAddress(randomString);
		newAddressValue = await profilePage.getAddressInputValue();

		// Verify address textbox reflects newly entered value
		await expect(profilePage.addressTextbox).toHaveValue(newAddressValue);

		prevHobbyValue = await profilePage.getHobbyInputValue();
		await profilePage.selectAHobby(
			Helper.getRandomNonRepeatingValue(data.hobbyDropdownOptions, prevHobbyValue)
		);
		newHobbyValue = await profilePage.getHobbyInputValue();

		// Verify hobby dropdown reflects newly selected value
		await expect(profilePage.hobbyDropdown).toHaveValue(newHobbyValue);

		await profilePage.clickSaveProfileButton();

		// Confirm success alert is shown after saving profile
		await expect(profilePage.profileSavedAlert).toBeVisible();

		// Ensure address value remains unchanged after saving (UI didn't reset it)
		await expect(profilePage.addressTextbox).toHaveValue(newAddressValue);

		// Ensure hobby value is retained after saving
		await expect(profilePage.hobbyDropdown).toHaveValue(newHobbyValue);
	});

	await test.step('Verify updated profile details', async () => {
		await profilePage.clickCancelButton();
		// await profilePage.reloadProfilePage();

		await dashboardPage.clickProfileNavigationLink();

		// Ensure the success alert is not visible after reloading
		await expect(profilePage.profileSavedAlert).toBeVisible({ visible: false, timeout: 10000 });

		// Confirm the saved address persists after reload
		await expect(profilePage.addressTextbox).toHaveValue(newAddressValue, { timeout: 10000 });

		// Confirm the selected hobby also persists after reload
		await expect(profilePage.hobbyDropdown).toHaveValue(newHobbyValue);
	});
});
