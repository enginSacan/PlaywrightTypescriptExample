import {Page} from "@playwright/test";

export class ProductPage {
    readonly page:Page

    constructor (page: Page) {
        this.page = page
    }

    async addProductToCart () {
        await this.page.waitForLoadState('load')
        await this.page.getByRole('button', { name: 'Select size' }).click();
        await this.page.waitForSelector('[data-automation-key-size-enabled="true"] button')
        await this.page.locator('[data-automation-key-size-enabled="true"] button').first().click()
        await this.page.waitForLoadState('load')
        await this.page.getByRole('button', { name: 'Add to bag' }).click()
        await this.page.waitForLoadState('load')
    }

}