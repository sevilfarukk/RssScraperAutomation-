import { test } from "../fixture/pomFixture"
import { accountCredientials } from "../utils/Enums"


test.beforeEach(async ({ basePage, login }) => {
    await basePage.goTo()
    await login.clickLoginLink()
    await login.fillUsernamePassword(
        accountCredientials.USERNAME,
        accountCredientials.PASSWORD)
    await login.clickLoginButton()
})


test.describe("Adding Comment Test Scenarios", async () => {
    test("Select the Feed", async ({ comments }) => {
        await comments.selectFeedElement()
        await comments.selectAFeedFromtheList()
    })

    test("Add the Comment to selected Feed", async ({ comments }) => {
        await comments.selectFeedElement()
        await comments.selectAFeedFromtheList()
        await comments.fillCommentField()
        await comments.clickSubmitButton()
        await comments.assertCommentAdded()
    })
})

test.afterEach(async ({ context }, testInfo) => {
    await context.close()
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
})