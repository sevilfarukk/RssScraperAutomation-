
import { Locator, Page, expect } from "@playwright/test";
import { newFeedURL } from "../../utils/Enums";

export default class Feed {
    readonly page: Page
    private feedButton: Locator
    private feedField: Locator
    private submitButton: Locator
    private favoriteButton: Locator
    private bookmarkedButton: Locator
    private errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.feedButton = page.getByRole('link', { name: 'New Feed' })
        this.feedField = page.getByLabel('Feed URL*')
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.favoriteButton = page.getByRole('link', { name: '' })
        this.bookmarkedButton = page.getByRole('link', { name: 'Bookmarked' })
        this.errorMessage = page.locator('#error_1_id_feed_url')
    }

    //Click the Feed Button
    async clickNewFeedButton() {
        await this.feedButton.click()
    }

    //Assert Feed page is displayed
    async assertAddingNewFeedPage() {
        await expect(this.page.getByRole('heading')).toContainText('Add a new feed');
    }

    //Fill the New Feed fields
    async fillNewFeedField() {
        await this.feedField.fill(newFeedURL.NEW_FEED)
    }

    //Click Submit Button
    async clickSubmitButton() {
        await this.submitButton.click()
    }

    //Assert feed is added to list succesfully
    async assertFeedIsAddedtoList() {
        await expect(this.page.locator('dl')).toContainText(newFeedURL.NEW_FEED);
    }

    //Add the Feed to favorite
    async addToFavorite() {
        await this.favoriteButton.click()
    }

    //Assert favorite is added to bookmarked list
    async assertFavoriteAddedtoBookmarked() {
        await this.bookmarkedButton.click()
        await expect(this.page.locator('tbody')).toContainText(newFeedURL.NEW_FEED);
    }

    //Assert feed URL already exist 
    async assertFeedURLAlreadyExist() {
        await expect(this.errorMessage).toContainText('Feed with this Feed URL already exists.')

    }

}