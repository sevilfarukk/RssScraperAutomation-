import { test } from "../fixture/pomFixture"
import { accountCredientials } from "../utils/Enums";

test.beforeEach(async ({ basePage }) => {
    await basePage.goTo()
})


test.describe("Sign-Up Test Scenarios", async () => {

    test("Successful Sign-Up", async ({ signUp }) => {
        await signUp.signUpButtonClick()
        // Get and log the formatted current time
        const formattedTime = await signUp.getCurrentFormattedTime();
        await signUp.fillSignUpFields(
            accountCredientials.USERNAME + formattedTime,
            accountCredientials.PASSWORD,
            accountCredientials.PASSWORD_CONFIRMATION)
        await signUp.submitButtonClick()
    })

    test("Assert the Empty Fields Warning Messages", async ({ signUp }) => {
        await signUp.signUpButtonClick()
        await signUp.submitButtonClick()
        await signUp.assertEmptyFieldWarningMessages()
    })

    test("User already Exist", async ({ signUp }) => {
        await signUp.signUpButtonClick()
        await signUp.fillSignUpFields(
            accountCredientials.USERNAME,
            accountCredientials.PASSWORD,
            accountCredientials.PASSWORD_CONFIRMATION)
        await signUp.submitButtonClick()
        await signUp.assertUserAlreadyExist()
    })

    test("UnSuccessful Sign-Up, Username does not match the requirement", async ({ signUp }) => {
        await signUp.signUpButtonClick()
        await signUp.fillSignUpFields(
            accountCredientials.USERNAME_NOT_MATCH,
            accountCredientials.PASSWORD,
            accountCredientials.PASSWORD_CONFIRMATION)
        await signUp.submitButtonClick()
        await signUp.assertValidUserName()
    })

    test("UnSuccessful Sign-Up, password is less than 8 char", async ({ signUp }) => {
        await signUp.signUpButtonClick()
        await signUp.fillSignUpFields(
            accountCredientials.USERNAME,
            accountCredientials.PASSWORD_TOO_SHORT,
            accountCredientials.PASSWORD_TOO_SHORT)
        await signUp.submitButtonClick()
        await signUp.assertShortPasswordMessage()
    })

    test("UnSuccessful Sign-Up, password is too common", async ({ signUp }) => {
        await signUp.signUpButtonClick()
        await signUp.fillSignUpFields(
            accountCredientials.USERNAME,
            accountCredientials.PASSWORD_COMMON,
            accountCredientials.PASSWORD_COMMON)
        await signUp.submitButtonClick()
        await signUp.assertCommonPasswordMessage()
    })

})

test.afterEach(async ({ context }, testInfo) => {
    await context.close()
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
})