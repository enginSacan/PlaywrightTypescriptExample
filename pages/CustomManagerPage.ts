import {Locator, Page} from "@playwright/test";

export class CustomManagerPage {
    readonly page:Page

    private saveBtn           :Locator
    private selectSizeBtn     :Locator
    private addSizeBtn        :Locator
    private defaultJacketSize :Locator
    private nextBtn           :Locator
    private finishBtn         :Locator
    private confirmBtn        :Locator
    private addToBagBtn       :Locator

    constructor (page: Page) {
        this.page = page
        const customManagerFrame = this.page.frameLocator('.cm-iframe')
        this.saveBtn             = customManagerFrame.locator('[data-test-id="save-btn"]')
        this.selectSizeBtn       = customManagerFrame.locator('[data-test-id="summary-sticky-footer-selectSizes"]')
        this.addSizeBtn          = customManagerFrame.getByRole('button', { name: 'plus' })
        this.defaultJacketSize   = customManagerFrame.getByLabel('40')
        this.nextBtn             = customManagerFrame.getByLabel('Next')
        this.finishBtn           = customManagerFrame.locator('[data-test-id="SizePicker-No-I\\\'m-done"]')
        this.confirmBtn          = customManagerFrame.getByLabel('Confirm')
        this.addToBagBtn         = customManagerFrame.locator('[data-test-id="summary-footer-addToBag"]')
    }

    async createCustomJacketWithDefaultValues() {
        this.page.waitForLoadState('load')

        await this.saveBtn.waitFor({state: "attached"})
        await this.saveBtn.click()
        
        await this.page.waitForResponse('https://configurationimage-prd-af.azurewebsites.net/api/v1/CreateConfiguredProductImage')
        await this.selectSizeBtn.waitFor({state: "visible"})
        await this.selectSizeBtn.click()
        
        this.addSizeBtn.waitFor({state:"visible"})
        await this.addSizeBtn.click()
        
        await this.defaultJacketSize.click()
        await this.nextBtn.click()
        await this.finishBtn.click()
        await this.confirmBtn.click()
        await this.addToBagBtn.click()
        
    }
} 