import { test, expect } from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {SortingArea} from '../pages/SortingArea';

test.beforeEach (async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Accept' }).click();
})

test.afterAll(async ({page}) => {
  await page.close()
})

test('Listing the sneakers from low to high price', async ({ page }) => {
  const homePage = new HomePage(page)
  const sort = new SortingArea(page)
  await homePage.goToShoesPage()
  await sort.sortByLowToHigh()

  const prices = await page.$$eval('[itemprop="price"]', elements =>
    elements.map(element => {
      const priceText = element.textContent;
      if (priceText !== null) {
          return parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
      } else {
          return NaN;
      }
    }).filter(price => !isNaN(price))
  );

  const sorted = prices.every((price, i) => i === 0 || prices[i - 1] <= price);

  expect(sorted).toBe(true)

});

test('Sortıng clothes by color', async ({ page }) => {
  const homePage = new HomePage(page)
  const sort = new SortingArea(page)
  await homePage.goToVestsPage()
  await sort.sortByColor('Black')

  // Get all products on the page
  const products = await page.$$eval('[class="link"]', titles =>
    titles.map(title => title.textContent)
  );
   // Check if all titles contain selected color
  const allProductsContainColor = products.every(title => title?.includes('Black'))

  // Log if the selected color is not found in the title
  if (!allProductsContainColor) {
    const invalidTitles = products.filter(title => !title?.includes('Black'))
    console.log('Links that do not contain selected color:', invalidTitles)
  }

  expect (allProductsContainColor).toBe(true)

});

