import {Page} from "@playwright/test";

export class SortingArea { 
    readonly page:Page

    constructor (page: Page) {
        this.page = page
    }

    async sortByLowToHigh () {
        await this.page.getByRole('button', { name: 'Filter & Sort' }).click()
        await this.page.waitForLoadState('load')
        await this.page.locator('button').filter({ hasText: 'Sort byplus' }).click()
        await this.page.waitForLoadState('load')
        await this.page.locator('[input-id="lowestPrice"]').click()
        await this.page.getByRole('button', { name: 'close' }).click()
    }

    async sortByColor(colorName : string) {
        colorName = colorName.charAt(0).toUpperCase() + colorName.slice(1).toLowerCase()
        await this.page.getByRole('button', { name: 'Filter & Sort' }).click()
        await this.page.waitForLoadState('load')
        await this.page.locator('button').filter({ hasText: 'Colorplus' }).click()
        await this.page.waitForLoadState('load')
        await this.page.getByText(colorName, { exact: true }).click()
        await this.page.waitForLoadState('load')
        await this.page.getByRole('button', { name: 'close' }).click()
        
    }
}
