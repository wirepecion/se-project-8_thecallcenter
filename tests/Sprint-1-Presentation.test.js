import { test, expect } from '@playwright/test';

const today = new Date();
const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

test('Sprint 1 - EPIC 2 Run Through', async ({ page }) => {

  /* ---------------------------------------- Playwright Setup ----------------------------------------- */
  test.setTimeout(0);
  await page.goto('http://localhost:3000/');

  // assert that the URL is correct
  await expect(page).toHaveURL('http://localhost:3000/');

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
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('patthadon.1807@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // assert that user is logged in and is a valid user
  await expect(page.getByRole('link', { name: 'user Patthadon Phengpinij' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'User avatar' })).toBeVisible();

  /* Starts booking */
  await page.waitForTimeout(6000);
  await page.evaluate(() => {
    window.scrollBy(0, 700); // Scroll down by 700 pixels
  });
  await page.getByRole('link', { name: 'BOOK NOW' }).click();

  /* Select Hotel & Room */
  await page.getByRole('combobox', { name: 'Select Your Hotel' }).click();
  await page.getByRole('combobox', { name: 'Select Your Hotel' }).fill('go');
  await page.getByRole('option', { name: 'Golden Hour Resort' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).fill('su');
  await page.getByRole('option', { name: 'Room 501 - suite - $' }).click();

  /* Select CheckIn/CheckOut Date */
  await page.getByRole('button', { name: 'Choose date' }).first().click();
  await page.getByRole('button', { name: 'Next month' }).first().click();
  await page.getByRole('gridcell', { name: '22' }).click();
  await page.getByRole('button', { name: 'Choose date, selected date is May 23,' }).click();

  // assert that user cannot book more than 3 nights
  await expect(page.getByRole('gridcell', { name: '26' })).toBeDisabled();

  await page.getByRole('gridcell', { name: '25' }).click();
  await page.getByRole('button', { name: 'BOOK NOW' }).click();
  await page.waitForTimeout(3000);

  const bookingId = await page.evaluate(() => window.location.pathname.split('/').pop());

  // assert that "BOOK NOW" button navigates to the correct checkout page
  await expect(page).toHaveURL(`http://localhost:3000/checkout/${bookingId}`);

  /* Select Payment Methods */
  await page.getByRole('radio', { name: 'Card' }).check();

  // assert that the card number field is visible
  await expect(page.getByRole('textbox', { name: '5678 9101 1121' })).toBeVisible();

  await page.waitForTimeout(3000);
  await page.getByRole('radio', { name: 'Bank' }).check();
  await page.getByRole('combobox').click();

  // assert that bank options are visible
  await expect(page.getByRole('combobox')).toBeVisible()

  await page.waitForTimeout(2000);
  await page.getByRole('combobox').selectOption('bbl');

  // assert that Bangkok bank is selected
  await expect(page.getByRole('combobox')).toHaveValue('bbl');

  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('1234567890123456');

  await page.waitForTimeout(3000);
  await page.getByRole('radio', { name: 'ThaiQR' }).check();

  // assert that ThaiQR field is visible
  await expect(page.getByText('thaiqr USD $15000 to:')).toBeVisible();


  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Try to pay later */
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'My Bookings' }).click();

  // assert that the booking is visible in the My Bookings page
  await expect(page.getByText('Booking SummaryPendingCustomer: Patthadon PhengpinijRoom No.: 501Hotel: Golden').first()).toBeVisible();

  await page.waitForTimeout(3000);
  await page.locator('.MuiButtonBase-root').first().click();

  // assert that payment can be paid
  await expect(page.getByRole('button', { name: 'Pay' })).toBeVisible();

  await page.getByRole('button', { name: 'Pay' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Pay with credit card */
  await page.waitForTimeout(1500);
  await page.getByRole('radio', { name: 'Card' }).check();
  await page.getByRole('textbox', { name: '5678 9101 1121' }).click();
  await page.getByRole('textbox', { name: '5678 9101 1121' }).fill('1234567890123456');
  await page.getByRole('textbox', { name: 'MM/YY' }).click();
  await page.getByRole('textbox', { name: 'MM/YY' }).fill('05/26');
  await page.getByRole('textbox', { name: '123', exact: true }).click();
  await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
  await page.getByRole('button', { name: 'Pay USD' }).click();

  // assert that 4-digit card pin are visible in the payment summary
  await expect(page.getByText('Enter your 4-digit card pin')).toBeVisible();

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

  // assert that the payment is successful
  await expect(page.getByRole('heading', { name: 'Order Golden Hour Resort' })).toBeVisible();

  /* My Bookings */
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'See Your Booking' }).click();
  await page.locator('.MuiButtonBase-root').first().click();

  // assert that payment is now pending
  await expect(page.getByText('pending', { exact: true })).toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-4                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  /* Login with hotel manager (Golden Hour Resort) account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('GoldenHourResort.manager@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // assert that hotel manager is logged in and is a valid account
  await expect(page.getByRole('link', { name: 'user Golden Hour Resort' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'User avatar' })).toBeVisible();

  /* View all payments for Golden Hour Resort hotel */
  await page.waitForTimeout(3000);
  await page.getByRole('navigation').locator('div').nth(3).click();
  await page.getByRole('link', { name: 'All Payments' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 400); // Scroll down by 400 pixels
  });

  // assert that hotel manager can see user's payment and completed it
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} pending` })).toBeVisible();
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} pending` }).getByLabel('Complete')).toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Complete Payment */
  await page.getByRole('row', { name: `15000 Card ${formattedDate} pending` }).getByLabel('Complete').click();
  
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'OK' }).click();
  await page.evaluate(() => {
    window.scrollBy(0, 400); // Scroll down by 400 pixels
  });

  // assert that the payment is now completed
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate}` })).toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-2                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  /* Login with user account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('patthadon.1807@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* My Bookings */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'My Bookings' }).click();

  await page.waitForTimeout(3000);
  await page.locator('.MuiButtonBase-root').first().click();

  // assert that user sees the booking status as "Confirmed"
  await expect(page.getByText('Confirmed')).toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------------------------------- */
  /* User Story 2-3                                                                                      */
  /* --------------------------------------------------------------------------------------------------- */

  // assert that user can see the "Refund" button
  await expect(page.getByRole('button', { name: 'Refund' })).toBeVisible();

  /* Try to refund completed booking */
  await page.getByRole('button', { name: 'Refund' }).click();

  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Yes, refund it!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // assert that the booking and payment status is now "Canceled"
  await expect(page.getByText('Canceled', { exact: true })).toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
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

  // assert that admin is logged in and is a valid account
  await expect(page.getByRole('link', { name: 'user Main Admin admin@gmail.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'User avatar' })).toBeVisible();
  
  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */
  
  /* View all payments */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'All Payments' }).click();
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    window.scrollBy(0, 400); // Scroll down by 400 pixels
  });

  // assert that admin can see user's payment and update it
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} canceled` })).toBeVisible();
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} canceled` }).getByLabel('Update')).toBeVisible();
  
  /* View all payments (play with price filter) */
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: '💰 Filter by Price' }).click();

  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Min Price').click();
  await page.getByPlaceholder('Min Price').fill('12000');

  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Max Price').click();
  await page.getByPlaceholder('Max Price').fill('15000');

  // assert that amount filter is working
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} canceled` })).toBeVisible();

  await page.waitForTimeout(1000);
  await page.getByPlaceholder('Min Price').click();
  await page.getByPlaceholder('Min Price').fill('');

  /* View all payments (play with payment method filter) */
  await page.waitForTimeout(5000);
  await page.locator('select[name="paymentMethod"]').selectOption('Card');

  // assert that method filter is working
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} canceled` })).toBeVisible();

  await page.waitForTimeout(2000);
  await page.locator('select[name="paymentMethod"]').selectOption('');
  await page.locator('select[name="status"]').selectOption('pending');

  await page.waitForTimeout(2000);
  await page.locator('select[name="status"]').selectOption('completed');

  await page.waitForTimeout(2000);
  await page.locator('select[name="status"]').selectOption('canceled');

  // assert that status filter is working
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} canceled` })).toBeVisible();

  await page.waitForTimeout(2000);
  await page.locator('select[name="status"]').selectOption('All Status');

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* View all payments (play with update status feature) */
  await page.waitForTimeout(1500);
  await page.getByRole('row', { name: `15000 Card ${formattedDate} canceled` }).getByLabel('Update').click();
  await page.getByRole('combobox').selectOption('failed');

  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Cancel' }).click();

  // assert that admin did't update the payment status to "failed"
  await expect(page.getByRole('row', { name: `15000 Card ${formattedDate} canceled` })).toBeVisible();

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

  // assert that the booking is deleted and not visible in the Bookings page
  await expect(page.getByText('Booking SummaryCanceledCustomer: Patthadon PhengpinijRoom No.: 501Hotel: Golden').first()).not.toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Log Out */
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();

  /* Login with user account */
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).dblclick();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('patthadon.1807@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  /* My Bookings */
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'User avatar' }).click();
  await page.getByRole('link', { name: 'My Bookings' }).click();

   // assert that the booking is deleted and user can't see the booking in the My Bookings page
   await expect(page.getByText('Booking SummaryCanceledCustomer: Patthadon PhengpinijRoom No.: 501Hotel: Golden').first()).not.toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

  /* Swagger Showcase */
  await page.goto('http://localhost:5000/api-docs/');

  // assert that the Swagger page is visible
  await expect(page).toHaveURL('http://localhost:5000/api-docs/');
  await expect(page.getByRole('heading', { name: 'VacQ Hotel API 1.0.0 OAS' })).toBeVisible();

  /* --------------------------------------------------------------------------------------------------- */
  await page.pause();
  /* --------------------------------------------------------------------------------------------------- */

});