import {Locator, Page} from "@playwright/test";

export class HomePage {
    readonly page:Page

    private shoes    : Locator
    private sneakers : Locator
    private coats    : Locator
    
    private headerMenu    : Locator
    private customMade    : Locator
    private customJackets : Locator

    private cartBtn : Locator

    constructor (page: Page) {
        this.page = page

        this.shoes         = this.page.getByRole('link', { name: 'Shoes' })
        this.sneakers      = this.page.getByRole('link', { name: 'Sneakers' })
        this.coats         = this.page.getByTestId('link_quicklinks_coats_shop')
        this.headerMenu    = this.page.getByTestId('button_header_menu')
        this.customMade    = this.page.getByRole('button', { name: 'navigation-iconCustom Made' })
        this.customJackets = this.page.getByRole('link', { name: 'Custom Jackets' })
        this.cartBtn       = this.page.locator('[class="susu-icon susu-icon-bag"]')
    }

    async goToShoesPage () {
        await this.shoes.click()
        await this.sneakers.click()

    }
    async goToVestsPage () {
        await this.coats.click()
        await this.page.waitForLoadState('load')
    }
    async goToCustomJacket () {
        await this.headerMenu.click()
        await this.customMade.click()
        await this.customJackets.click()
    }

    async goToCart () {
        await this.cartBtn.click()
        await this.page.waitForLoadState('domcontentloaded')
    }
}