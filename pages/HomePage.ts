import {Page} from "@playwright/test";

export class HomePage {
    readonly page:Page

    constructor (page: Page) {
        this.page = page
    }

    async goToShoesPage () {
        await this.page.getByRole('link', { name: 'Shoes' }).click()
        await this.page.getByRole('link', { name: 'Sneakers' }).click()

    }
    async goToVestsPage () {
        await this.page.getByTestId('link_quicklinks_coats_shop').click()
        await this.page.waitForLoadState()
    }
    async goToCustomJacket () {
        await this.page.getByTestId('button_header_menu').click();
        await this.page.getByRole('button', { name: 'navigation-iconCustom Made' }).click();
        await this.page.getByRole('link', { name: 'Custom Jackets' }).click();
    }

    async goToCart () {
        await this.page.locator('[class="susu-icon susu-icon-bag"]').click()
        await this.page.waitForLoadState('domcontentloaded')
    }
}