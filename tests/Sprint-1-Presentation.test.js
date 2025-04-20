import { test, expect } from '@playwright/test';

test('Sprint 1 - EPIC 2 Run Through', async ({ page }) => {

  /* ---------------------------------------- Playwright Setup ----------------------------------------- */
  test.setTimeout(0);
  await page.goto('http://localhost:3000/');
  /* --------------------------------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-1                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  /* Login with user account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('croissant@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* Starts booking */
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'BOOK NOW' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 1000); // Scroll down by 1000 pixels
  });

  /* Select Hotel & Room */
  await page.getByRole('combobox', { name: 'Select Your Hotel' }).click();
  await page.getByRole('combobox', { name: 'Select Your Hotel' }).fill('p');
  await page.getByRole('option', { name: 'Peyton' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).fill('su');
  await page.getByRole('option', { name: 'Room 501 - suite - $' }).click();

  /* Select CheckIn/CheckOut Date */
  await page.getByRole('button', { name: 'Choose date' }).first().click();
  await page.getByRole('gridcell', { name: '22' }).click();
  await page.getByRole('button', { name: 'Choose date, selected date is Apr 23,' }).click();
  await page.getByRole('gridcell', { name: '25' }).click();
  await page.getByRole('button', { name: 'BOOK NOW' }).click();

  /* Select Payment Methods */
  await page.waitForTimeout(3000);
  await page.getByRole('radio', { name: 'Card' }).check();

  await page.waitForTimeout(3000);
  await page.getByRole('radio', { name: 'Bank' }).check();
  await page.getByRole('combobox').click();

  await page.waitForTimeout(2000);
  await page.getByRole('combobox').selectOption('bbl');
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('123456');

  await page.waitForTimeout(3000);
  await page.getByRole('radio', { name: 'ThaiQR' }).check();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Try to pay later */
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'My Bookings' }).click();

  await page.waitForTimeout(3000);
  await page.locator('.MuiButtonBase-root').first().click();
  await page.getByRole('button', { name: 'Pay' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Pay with credit card */
  await page.waitForTimeout(1500);
  await page.getByRole('radio', { name: 'Card' }).check();
  await page.getByRole('textbox', { name: '5678 9101 1121' }).click();
  await page.getByRole('textbox', { name: '5678 9101 1121' }).fill('123456789');
  await page.getByRole('textbox', { name: 'MM/YY' }).click();
  await page.getByRole('textbox', { name: 'MM/YY' }).fill('01/12');
  await page.getByRole('textbox', { name: '123', exact: true }).click();
  await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
  await page.getByRole('button', { name: 'Pay USD' }).click();

  /* Enter the card pin */
  await page.waitForTimeout(1500);
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('1');
  await page.getByRole('textbox').first().press('Tab');
  await page.getByRole('textbox').nth(1).fill('2');
  await page.getByRole('textbox').nth(1).press('Tab');
  await page.getByRole('textbox').nth(2).fill('3');
  await page.getByRole('textbox').nth(2).press('Tab');
  await page.getByRole('textbox').nth(3).fill('4');
  await page.getByRole('button', { name: 'Confirm Payment' }).click();

  /* My Bookings */
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'See Your Payment' }).click();
  await page.locator('.MuiButtonBase-root').first().click();
  
  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('link', { name: 'user Teresa Kutch croissant@' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-4                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  /* Login with hotel manager (Peyton) account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('hotelManager3@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* View all payments for Peyton hotel */
  await page.waitForTimeout(3000);
  await page.getByRole('navigation').locator('div').nth(3).click();
  await page.getByRole('link', { name: 'All Payments' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 200); // Scroll down by 1000 pixels
  });

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Complete Payment */
  await page.getByRole('row', { name: '14250 Card 4/20/2025 pending' }).getByLabel('Complete').click();
  
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'OK' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('link', { name: 'user Mamie Hermiston II' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-2                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  /* Login with user account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('croissant@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* My Bookings */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'My Bookings' }).click();

  await page.waitForTimeout(3000);
  await page.locator('.MuiButtonBase-root').first().click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-3                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  /* Try to refund completed booking */
  await page.getByRole('button', { name: 'Refund' }).click();

  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Yes, refund it!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('link', { name: 'user Teresa Kutch croissant@' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-5                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  /* Login with admin account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */
  
  /* View all payments */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'All Payments' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 200); // Scroll down by 200 pixels
  });
  
  /* View all payments (play with price filter) */
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: '💰 Filter by Price' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 400); // Scroll down by 400 pixels
  });

  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Min Price').click();
  await page.getByPlaceholder('Min Price').fill('12000');

  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Max Price').click();
  await page.getByPlaceholder('Max Price').fill('15000');

  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Min Price').click();
  await page.getByPlaceholder('Min Price').fill('');

  /* View all payments (play with payment method filter) */
  await page.waitForTimeout(5000);
  await page.locator('select[name="paymentMethod"]').selectOption('Card');
  await page.locator('select[name="status"]').selectOption('pending');
  await page.locator('select[name="status"]').selectOption('completed');

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* View all payments (play with update status feature) */
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('combobox').selectOption('failed');

  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Cancel' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* View all bookings */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'All Bookings' }).click();
  await page.locator('.MuiButtonBase-root').first().click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Delete booking */
  await page.getByRole('button', { name: 'Delete' }).first().click();
  
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Yes, delete it!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('link', { name: 'user Percy Howell III admin@' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  /* Login with user account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).dblclick();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('croissant@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* My Bookings */
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'My Bookings' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Swagger Showcase */
  await page.goto('http://localhost:5000/api-docs/');

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

});