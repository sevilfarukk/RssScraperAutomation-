import { Locator, Page, expect } from "@playwright/test";
import { emptyFieldsErrorMessages } from "../../utils/Enums";
import { userExist } from "../../utils/Enums";

export default class SignUp {
    readonly page: Page
    private signUpButton: Locator
    private submitButton: Locator
    private userNameField: Locator
    private passwordField: Locator
    private passwordConfirmationField: Locator
    private userNameFieldHint: Locator
    private passwordErrorMessage: Locator
    private passwordConfirmationErrorMessage: Locator
    private userExist: Locator
    private userNameErrorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.signUpButton = page.getByRole('button', { name: 'Sign Up', exact: true })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.userNameField = page.getByLabel('Username*')
        this.passwordField = page.getByLabel('Password*')
        this.passwordConfirmationField = page.getByLabel('Password confirmation*')
        this.userNameFieldHint = page.locator('#hint_id_username')
        this.passwordErrorMessage = page.locator('#error_1_id_password1')
        this.passwordConfirmationErrorMessage = page.locator('#error_1_id_password2')
        this.userExist = page.locator('#error_1_id_username')
        this.userNameErrorMessage = page.locator('#error_1_id_username')
    }

    //Click to Sign-Up
    async signUpButtonClick() {
        await this.signUpButton.click()
    }

    //Fill the fields
    async fillSignUpFields(userName: string, password: string, passwordConfirmation: string) {
        await this.userNameField.fill(userName)
        await this.passwordField.fill(password)
        await this.passwordConfirmationField.fill(passwordConfirmation)
    }

    //Click to Submit Button
    async submitButtonClick() {
        await this.submitButton.click()
    }

    //Assert warning messages when all the fields are empty
    async assertEmptyFieldWarningMessages() {
        await expect(this.userNameFieldHint).toContainText(emptyFieldsErrorMessages.EMPTY_USERNAME)
        await expect(this.passwordErrorMessage).toContainText(emptyFieldsErrorMessages.EMPTY_PASSWORD)
        await expect(this.passwordConfirmationErrorMessage).toContainText(emptyFieldsErrorMessages.EMPTY_PASSWORDCONFIRMATION)
    }

    //Assert warning messages when the user is already exist
    async assertUserAlreadyExist() {
        await expect(this.userExist).toContainText(userExist.USER_EXIST)
    }

    //Assert valid user name message
    async assertValidUserName() {
        await expect(this.userNameErrorMessage).toContainText(emptyFieldsErrorMessages.VALID_USERNAME)
    }

    //Assert warning messages when the password is too short
    async assertShortPasswordMessage() {
        await expect(this.passwordConfirmationErrorMessage).toContainText(emptyFieldsErrorMessages.PASSWORD_SHORT)
    }

    //Assert warning messages when the password is very common
    async assertCommonPasswordMessage() {
        await expect(this.passwordConfirmationErrorMessage).toContainText(emptyFieldsErrorMessages.PASSWORD_COMMON)
    }

    //Get the Current date to use it account creation
    async getCurrentFormattedTime(): Promise<string> {
        const currentTime = new Date();
        let formattedTime = currentTime.toISOString();
        formattedTime = formattedTime.replace(/:/g, ''); // Remove colons
        return formattedTime;
    }
}