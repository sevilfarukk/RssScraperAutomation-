import { Locator, Page, expect } from "@playwright/test";

export default class Login {
    readonly page: Page
    private userNameField: Locator
    private passwordField: Locator
    private loginButton: Locator
    private loginLink: Locator
    private userNameErrorMessage: Locator
    private passwordErrorMessage: Locator
    private errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.userNameField = page.getByLabel('Username*')
        this.passwordField = page.getByLabel('Password*')
        this.loginButton = page.getByRole('button', { name: 'login' })
        this.loginLink = page.getByRole('link', { name: 'Login' })
        this.userNameErrorMessage = page.locator('#error_1_id_username')
        this.passwordErrorMessage = page.locator('#error_1_id_password')
        this.errorMessage = page.locator('form')
    }

    //Click login link
    async clickLoginLink() {
        await this.loginLink.click()
    }

    //Click the Login Button
    async clickLoginButton() {
        await this.loginButton.click()
    }

    //Fill the UserName and Password
    async fillUsernamePassword(userName: string, password: string,) {
        await this.userNameField.fill(userName)
        await this.passwordField.fill(password)
    }

    //Assert warning message when username is empty
    async assertUserNameErrorMessage() {
        await expect(this.userNameErrorMessage).toContainText('This field is required.')
    }

    //Assert warning message when password is empty
    async assertPasswordErrorMessage() {
        await expect(this.passwordErrorMessage).toContainText('This field is required.')
    }
    //Assert warning message when user name or password is incorrect
    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Please enter a correct username and password. Note that both fields may be case-sensitive.')

    }

    //Assert Login is succesfull or not
    async assertLoginIsSuccesfull() {
        await expect(this.page.getByRole('heading')).toContainText('Feeds');
        await expect(this.page.getByRole('link', { name: 'Crispy Succotash' })).toBeVisible();
    }


}