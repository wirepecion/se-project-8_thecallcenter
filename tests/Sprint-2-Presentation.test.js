import { test, expect } from '@playwright/test';

const today = new Date();
const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

test('Sprint 2 - EPIC 1 Run Through', async ({ page }) => {

  /* ---------------------------------------- Playwright Setup ----------------------------------------- */

  // *** README ***//
  // Every time when finished running this test, please make sure to edit field of followings:
  // 1.[User] titan -> credit = 1000, membershipTier = "silver", membershipPoints = 249
  // 2.[Hotel manager] Nova Terrace -> credit = 10000
  // 3.[Hotel] Nova Terrace -> subscriptionRank = 1

  test.setTimeout(0);
  await page.goto('http://localhost:3000/');
  /* ---------------------------------------------------------------------------------------------------- */

  /* Log-in with user account */
  await page.pause();
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('titan@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.pause();

  /* US1-1 : View own profile (should show silver tier and 1000 credits) */
  await page.getByRole('link', { name: 'user titan titan@gmail.com' }).click();
  await page.pause();

  /* US1-2 : View different benefits of membership tiers (should show silver tier) */
  await page.getByRole('link', { name: 'Membership' }).click();
  await page.waitForTimeout(5000);
  await page.evaluate(() => {
    window.scrollBy(0, 1000); // Scroll down by 1000 pixels
  });
  await page.pause();

  /* US1-5 : View hotel facilities according to user's membership tier */
  await page.getByRole('link', { name: 'Explore Stay' }).click();
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    window.scrollBy(0, 1100); // Scroll down by 1100 pixels
  });
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Nova Terrace Nova Terrace' }).click();
  await page.waitForTimeout(4000);
  await page.evaluate(() => {
    window.scrollBy(0, 600); // Scroll down by 600 pixels
  });
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Show Allowed Facilities Only' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Show All' }).click();
  await page.pause();

  /* Choose hotel, room and checkin-checkout date for booking */
  await page.getByRole('link', { name: 'Booking' }).click();
  await page.getByRole('button', { name: 'Open' }).first().click();
  await page.getByRole('combobox', { name: 'Select Your Hotel' }).fill('no');
  await page.getByRole('option', { name: 'Nova Terrace' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).fill('su');
  await page.getByRole('option', { name: 'Room 501 - suite - $' }).click();
  await page.getByRole('button', { name: 'Choose date' }).first().click();
  await page.getByRole('button', { name: 'Next month' }).click();
  await page.getByRole('gridcell', { name: '20' }).click();
  await page.getByRole('button', { name: 'Choose date, selected date is May 21,' }).click();
  await page.getByRole('gridcell', { name: '23' }).click();
  await page.getByRole('button', { name: 'BOOK NOW' }).click();

  /* US1-3 : Use own benefits to get discount for booking a room in hotel according to membership tier (should -5% discount(-750฿)) */
  await page.getByRole('radio', { name: 'Bank' }).check();
  await page.getByRole('combobox').selectOption('kbank');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').first().fill('123456789');

  /* US1-3 : Use own credits to get extra discount for booking (should -1000฿ discount) */
  await page.waitForTimeout(2000);  
  await page.getByRole('checkbox', { name: 'Use Credit' }).check();
  await page.pause(); 

  /* Confirm booking and view booking */
  await page.getByRole('button', { name: 'Pay USD' }).click();
  await page.getByRole('button', { name: 'See Your Booking' }).click();
  await page.waitForTimeout(1000); 
  await page.locator('.MuiButtonBase-root').first().click();
  await page.pause();

  /* Log-out from user account */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
  await page.waitForTimeout(2000);

  /* Log-in with hotel manager account (Nova Terrace) */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('NovaTerrace.manager@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.pause();

  /* US1-5 : View tier at booking of user's booking */ 
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'All Bookings' }).click();
  await page.waitForTimeout(1000); 
  await page.locator('.MuiButtonBase-root').first().click();
  await page.pause();

  /* Confirm payment */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'All Payments' }).click();
  await page.waitForTimeout(4000);
  await page.evaluate(() => {
    window.scrollBy(0, 400); // Scroll down by 400 pixels
  });
  await page.pause();

  await page.getByRole('button', { name: 'Update' }).first().click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 400); // Scroll down by 400 pixels
  });
  await page.pause();

  /* US1-4 : View hotel manager's profile and buying tokens package for enhancing ad placement */
  await page.getByRole('link', { name: 'user Nova Terrace NovaTerrace' }).click();
  await page.pause();
  await page.evaluate(() => {
    window.scrollBy(0, 1500); // Scroll down by 1500 pixels
  });
  await page.pause();
  await page.getByRole('cell', { name: '฿1,500' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Buy Package' }).click();
  await page.getByRole('button', { name: 'Yes, I want!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, -1500); // Scroll up by 1500 pixels
  });
  await page.pause();

  /* US1-4 : View hotel ad banners */
  await page.getByRole('link', { name: 'HOTELIO' }).click();
  await page.pause();

  /* Log-out from hotel manager's account */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
  await page.waitForTimeout(2000);

  /* Log-in with admin account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* US 1-6 : View admin's profile and statistic */
  await page.getByRole('link', { name: 'user Main Admin admin@gmail.' }).click();
  await page.pause();

  /* US 1-6 : View all users and their membership tiers */
  await page.evaluate(() => {
    window.scrollBy(0, 600); // Scroll down by 600 pixels
  });
  await page.locator('select').selectOption('bronze');
  await page.waitForTimeout(2000);
  await page.locator('select').selectOption('silver');
  await page.waitForTimeout(2000);
  await page.locator('select').selectOption('gold');
  await page.waitForTimeout(2000);
  await page.locator('select').selectOption('');
  await page.waitForTimeout(2000);
  await page.getByRole('combobox', { name: 'Select a User' }).click();
  await page.getByRole('combobox', { name: 'Select a User' }).fill('ti');
  await page.getByRole('option', { name: 'titan' }).click();
  await page.pause();

  await page.getByRole('cell', { name: 'user titan' }).click();
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.pause();

  /* Update user's booking status to "completed" */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'All Bookings' }).click();
  await page.waitForTimeout(1000);
  await page.locator('.MuiButtonBase-root').first().click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('combobox').selectOption('completed');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Yes, update!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  /* US 1-3 : View user's updated membership tier */
  await page.locator('a').filter({ hasText: 'Main Adminadmin@gmail.com' }).click();
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    window.scrollBy(0, 600); // Scroll down by 600 pixels
  });
  await page.waitForTimeout(2000);
  await page.getByRole('combobox', { name: 'Select a User' }).click();
  await page.getByRole('combobox', { name: 'Select a User' }).fill('ti');
  await page.getByRole('option', { name: 'titan' }).click();
  await page.getByRole('cell', { name: 'user titan' }).click();
  await page.pause();

  /* Log-out from admin account */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.locator('div').filter({ hasText: /^Log Out$/ }).click();
  await page.pause();

  /* Log-in with user's account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('titan@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* US 1-3 : User view their own's updated membership tier */
  await page.getByRole('link', { name: 'user titan titan@gmail.com' }).click();
  await page.getByRole('link', { name: 'Membership' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 1000); // Scroll down by 1000 pixels
  });
  await page.pause();

  /* Log-out from user's account */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
  await page.pause();

  /* Log-in with admin account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* Admin delete user's booking for handle running test next time */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'All Bookings' }).click();
  await page.locator('.MuiButtonBase-root').first().click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.getByRole('button', { name: 'Yes, delete it!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.pause();

});