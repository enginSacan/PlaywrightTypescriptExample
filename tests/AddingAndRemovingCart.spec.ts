import { test, expect } from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {SortingArea} from '../pages/SortingArea';
import {ProductPage} from '../pages/ProductPage';
import {CartPage} from '../pages/CartPage';
import { removeAlertMessage } from '../utils/utils';

test.beforeEach (async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Accept' }).click();
    await removeAlertMessage(page)
})

test('Adding and removing clothes to the cart', async ({ page }) => {
    const homePage = new HomePage(page)
    const sort = new SortingArea(page)
    const productPage = new ProductPage (page)
    const cartPage = new CartPage(page)
  
    await homePage.goToVestsPage()
    await sort.sortByColor('Navy')
  
    /*
      const allProducts = await page.$$('[class="link"]')
      You can change 2 in the loop with allProducts.count()-1 and uncomment section above for all coverage
    */

    for (let i = 0; i < 2; i++) {
      // Get all products on the page each tıme for eliminating DOM expection
      await page.waitForLoadState('load')
      const products = await page.$$('[class="plp-detail-picture plp-detail-picture--default reserve-space"]')
      await products[i]?.scrollIntoViewIfNeeded();
      await products[i].click()
      await productPage.addProductToCart()
      await page.goBack()
      
    }
    
    await cartPage.emptyCart()
    await page.waitForSelector('h1')
    await expect(page.locator('h1').first()).toContainText('Your bag is still empty');
    
  });