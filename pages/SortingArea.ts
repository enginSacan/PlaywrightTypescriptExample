import {Locator, Page} from "@playwright/test";

export class SortingArea { 
    readonly page:Page

    private filterAndSort : Locator 
    private sort          : Locator
    private lowerPrıce    : Locator
    private close         : Locator
    private color         : Locator

    constructor (page: Page) {
        this.page = page

        this.filterAndSort  = this.page.getByRole('button', { name: 'Filter & Sort' })
        this.sort           = this.page.locator('button').filter({ hasText: 'Sort byplus' })
        this.lowerPrıce     = this.page.locator('[input-id="lowestPrice"]')
        this.close          = this.page.getByRole('button', { name: 'close' })
        this.color          = this.page.locator('button').filter({ hasText: 'Colorplus' })

    }

    async sortByLowToHigh () {
        await this.page.waitForLoadState('load')
        await this.filterAndSort.click()
        await this.page.waitForLoadState('load')
        await this.sort.click()
        await this.page.waitForLoadState('load')
        await this.lowerPrıce.click()
        await this.close.click()
    }

    async sortByColor(colorName : string) {
        colorName = colorName.charAt(0).toUpperCase() + colorName.slice(1).toLowerCase()
        await this.filterAndSort.click()
        await this.color.waitFor({state:'attached'})
        await this.color.click()
        await this.page.getByText(colorName, { exact: true }).waitFor({state:'attached'})
        await this.page.getByText(colorName, { exact: true }).click()
        await this.close.waitFor({state:'attached'})
        await this.close.click()
        
    }
}
