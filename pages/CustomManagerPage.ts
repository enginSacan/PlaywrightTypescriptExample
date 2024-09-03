import {Page} from "@playwright/test";

export class CustomManagerPage {
    readonly page:Page

    constructor (page: Page) {
        this.page = page
    }

    async createCustomJacketWithDefaultValues() {
        this.page.waitForLoadState('load')
        const customManagerFrame = await this.page.frameLocator('.cm-iframe')
        
        customManagerFrame.locator('[data-test-id="save-btn"]').click()
        await customManagerFrame.locator('[data-test-id="summary-sticky-footer-selectSizes"]').click();
        await customManagerFrame.getByRole('button', { name: 'plus' }).click();
        await customManagerFrame.getByLabel('40').click();
        await customManagerFrame.getByLabel('Next').click();
        await customManagerFrame.locator('[data-test-id="SizePicker-No-I\\\'m-done"]').click();
        await customManagerFrame.getByLabel('Confirm').click();
        await customManagerFrame.locator('[data-test-id="summary-footer-addToBag"]').click();
        
    }
} 