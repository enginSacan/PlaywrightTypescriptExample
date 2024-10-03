import {Locator, Page} from "@playwright/test";

export class CartPage {
    readonly page:Page

    private viewBag         : Locator
    private productsInCart  : Locator

    constructor (page: Page) {
        this.page = page

        this.viewBag         = this.page.getByTitle('View bag')
        this.productsInCart  = this.page.locator('.product-card__remove-icon')

    }

    async emptyCart () {
        await this.page.waitForLoadState('networkidle')
        await this.page.evaluate(() => {
            window.scrollTo(0, 0)
            window.scrollTo(0, 0)
          });
        await this.page.waitForSelector('[title="View bag"]')
        await this.viewBag.click()

        await this.page.waitForSelector('[class="btn btn-primary btn-block checkout-btn js-checkout-btn "]') 
        const count = await this.productsInCart.count()

        for (let i = 0; i < count; i++) {
            const product = this.productsInCart.nth(0)
            await product.click()
            await this.page.waitForResponse('https://u.clarity.ms/collect')
        }
    }
    
}