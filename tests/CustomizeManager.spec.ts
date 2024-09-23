import { test, expect } from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {CustomManagerPage} from '../pages/CustomManagerPage';
import { removeAlertMessage } from '../utils/utils';

test.beforeEach (async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Accept' }).click();
 
})

test('Custom Manager Happy Path', async ({ page }) => {
  const homePage = new HomePage(page)
  const customManager = new CustomManagerPage (page)

  const productTitle = page.locator('.product-card__title')

  await homePage.goToCustomJacket()
  await removeAlertMessage(page)
  await customManager.createCustomJacketWithDefaultValues()

  await homePage.goToCart()
  await page.waitForResponse('https://suitsupply.com/en-nl/cart')
  await page.waitForSelector('.product-card__title')
  await expect(productTitle).toContainText('Custom Made Jacket');
    
});