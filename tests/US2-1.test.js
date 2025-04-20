import { test, expect } from '@playwright/test';

test('Sprint 1 - EPIC 2 Run Through | User Story 2-1', async ({ page }) => {
  test.setTimeout(0);

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign-In / Register' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).click();
  await page.getByRole('textbox', { name: 'Enter your email' }).fill('croissant@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'BOOK NOW' }).click();
  
  await page.evaluate(() => {
    window.scrollBy(0, 1000); // Scroll down by 1000 pixels
  });
  await page.getByRole('combobox', { name: 'Select Your Hotel' }).click();
  await page.getByRole('combobox', { name: 'Select Your Hotel' }).fill('p');
  await page.getByRole('option', { name: 'Peyton' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).click();
  await page.getByRole('combobox', { name: 'Select Your Room' }).fill('s');
  await page.getByRole('option', { name: 'Room 501 - suite - $' }).click();

  await page.getByRole('button', { name: 'Choose date' }).first().click();
  await page.getByRole('gridcell', { name: '22' }).click();
  await page.getByRole('button', { name: 'Choose date, selected date is Apr 23,' }).click();
  await page.getByRole('gridcell', { name: '25' }).click();
  await page.getByRole('button', { name: 'BOOK NOW' }).click();

  await page.waitForTimeout(1500);
  await page.getByRole('radio', { name: 'Card' }).check();
  await page.waitForTimeout(1500);
  await page.getByRole('radio', { name: 'Bank' }).check();
  await page.waitForTimeout(1500);
  await page.getByRole('radio', { name: 'ThaiQR' }).check();

  await page.waitForTimeout(1500);
  await page.getByRole('radio', { name: 'Card' }).check();
  await page.getByRole('textbox', { name: '5678 9101 1121' }).click();
  await page.getByRole('textbox', { name: '5678 9101 1121' }).fill('123456789');
  await page.getByRole('textbox', { name: 'MM/YY' }).click();
  await page.getByRole('textbox', { name: 'MM/YY' }).fill('01/12');
  await page.getByRole('textbox', { name: '123', exact: true }).click();
  await page.getByRole('textbox', { name: '123', exact: true }).fill('123');
  await page.getByRole('button', { name: 'Pay USD' }).click();

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

  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'See Your Payment' }).click();
  await page.locator('.MuiButtonBase-root').first().click();
  
  await page.pause();

  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.getByRole('button', { name: 'Yes, delete it!' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  await page.pause();

});