import {Page} from "@playwright/test";

export class CartPage {
    readonly page:Page

    constructor (page: Page) {
        this.page = page
    }

    async emptyCart () {
        await this.page.waitForLoadState('load')
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
            window.scrollTo(0, 0);
          });
        await this.page.waitForSelector('[title="View bag"]')
        await this.page.getByTitle('View bag').click()
        await this.page.waitForSelector('[class="btn btn-primary btn-block checkout-btn js-checkout-btn "]') 
        const productsInCart = this.page.locator('.product-card__remove-icon')
        const count = await productsInCart.count();
        for (let i = 0; i < count; i++) {
            const product = productsInCart.nth(i);
            await product.click();
            await this.page.waitForLoadState('load')
        }
    }
    
}