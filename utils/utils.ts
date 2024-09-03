import {Page} from "@playwright/test";

export async function removeAlertMessage (page: Page) {
    const alertMessage  = page.getByRole('alert').getByRole('button')
    if (alertMessage) {
        alertMessage.click()
    }
  }