import { test } from "../fixture/pomFixture"
import { accountCredientials } from "../utils/Enums"

test.beforeEach(async ({ basePage }) => {
    await basePage.goTo()
})

test.describe("Login Test Scenarios", async () => {
    test("Successful Login", async ({ login }) => {
        await login.clickLoginLink()
        await login.fillUsernamePassword(
            accountCredientials.USERNAME,
            accountCredientials.PASSWORD)
        await login.clickLoginButton()
        await login.assertLoginIsSuccesfull()
    })

    test("Assert Empty Fields", async ({ login }) => {
        await login.clickLoginLink()
        await login.fillUsernamePassword(
            "",
            "")
        await login.clickLoginButton()
        await login.assertUserNameErrorMessage()
        await login.assertPasswordErrorMessage()
    })

    test("UnSuccesfull Login - Assert UserName & Password Incorrect", async ({ login }) => {
        await login.clickLoginLink()
        await login.fillUsernamePassword(
            accountCredientials.USERNAME + "test",
            accountCredientials.PASSWORD)
        await login.clickLoginButton()
        await login.assertErrorMessage()
    })
})

test.afterEach(async ({ context }, testInfo) => {
    await context.close()
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
})