import { Locator, Page, expect } from "@playwright/test";


export default class Comments {
    readonly page: Page
    private submitButton: Locator
    private addedMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.addedMessage = page.locator('body')
    }

    //Select a Feed from All Feeds
    async selectFeedElement() {
        await this.clickLinkInFirstTableRow('tr');
    }

    //Select the news from selected Feed
    async selectAFeedFromtheList() {
        await this.clickLinkInFirstTableRow('tr');
    }

    //Fill the Comment Field
    async fillCommentField() {
        await this.page.locator('pre').click();
        await this.page.getByRole('textbox').fill('this is a test comment');
    }

    //Click Submit Button
    async clickSubmitButton() {
        await this.submitButton.click();
    }

    //Assert the comment is added or not
    async assertCommentAdded() {
        await expect(this.addedMessage).toContainText('Comment added successfully')
    }

    async clickLinkInFirstTableRow(rowLocator) {
        const firstRow = await this.page.locator(rowLocator);
        const linkInFirstRow = await firstRow.locator('td:first-child > a').first();
        await linkInFirstRow.click();
    }
}