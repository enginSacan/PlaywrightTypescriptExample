import {Page} from "@playwright/test";

export class ProductPage {
    readonly page:Page

    constructor (page: Page) {
        this.page = page
    }

    async addProductToCart () {
        
        const selectSizeBtn      = this.page.getByRole('button', { name: 'Select size' })
        const firstSizeAvailable = this.page.locator('[data-automation-key-size-enabled="true"] button').first()
        const addToBagBtn        = this.page.getByRole('button', { name: 'Add to bag' })
        
        await this.page.waitForResponse('https://suitsupply.com/nb-collector')
        
        await selectSizeBtn.waitFor({state:"visible"})
        await selectSizeBtn.click();

        await firstSizeAvailable.waitFor({state:"visible"})
        await firstSizeAvailable.click()
        
        await addToBagBtn.click()
        await this.page.waitForLoadState('networkidle')
    }

}