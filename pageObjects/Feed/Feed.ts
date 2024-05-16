
import { Locator, Page, expect } from "@playwright/test";
import { newFeedURL } from "../../utils/Enums";
import Comments from "../Comments/Comments";

export default class Feed {
    readonly page: Page
    private feedButton: Locator
    private feedField: Locator
    private submitButton: Locator
    private favoriteButton: Locator
    private bookmarkedButton: Locator
    private errorMessage: Locator
    private allFeedButton: Locator

    constructor(page: Page) {
        this.page = page
        this.feedButton = page.getByRole('link', { name: 'New Feed' })
        this.feedField = page.getByLabel('Feed URL*')
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.favoriteButton = page.getByRole('link', { name: '' })
        this.bookmarkedButton = page.getByRole('link', { name: 'Bookmarked' })
        this.errorMessage = page.locator('#error_1_id_feed_url')
        this.allFeedButton = page.getByRole('link', { name: 'All Feeds' })
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
        const randomInt = this.getRandomIntBetween0And99();
        await this.feedField.fill(newFeedURL.NEW_FEED + (await randomInt).toString())
    }

    //Click Submit Button
    async clickSubmitButton() {
        await this.submitButton.click()
    }

    //Assert feed is added to list succesfully
    async assertFeedIsAddedtoList() {
        try {
            await expect(this.page.locator('dl')).toContainText(newFeedURL.NEW_FEED);
        } catch (error) {
            console.error('An error occurred while adding to favorite:', error);
        }
    }

    //Add the Feed to favorite
    async addToFavorite() {
        try {
            const feedExists = await this.assertFeedURLAlreadyExist();
            if (!feedExists) {
                await this.favoriteButton.click();
            } else {
                console.log('Feed with this Feed URL already exists, so not added to favorite');
            }
        } catch (error) {
            console.error('An error occurred while adding to favorite:', error);
        }
    }


    //Assert favorite is added to bookmarked list
    async assertFavoriteAddedtoBookmarked() {
        await this.bookmarkedButton.click()
        await expect(this.page.locator('tbody')).toContainText(newFeedURL.NEW_FEED);
    }

    //Assert feed URL already exist 
    async assertFeedURLAlreadyExist() {
        try {
            await expect(this.errorMessage).toContainText('Feed with this Feed URL already exists.');
            return true;
        } catch (error) {
            return false;
        }
    }

    async getRandomIntBetween0And99(): Promise<number> {
        return Math.floor(Math.random() * 100);
    }


}