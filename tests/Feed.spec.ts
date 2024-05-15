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

const addNewFeed = async (feed) => {
    await feed.clickNewFeedButton();
    await feed.assertAddingNewFeedPage();
    await feed.fillNewFeedField();
    await feed.clickSubmitButton();
}

test.describe("Feed Test Scenarios", async () => {
    test("Adding a new Feed", async ({ feed }) => {
        await addNewFeed(feed)
    })

    test("Assert new Feed is added to list succesfully", async ({ feed }) => {
        await addNewFeed(feed)
        await feed.assertFeedIsAddedtoList()
    })

    test("Feed with this Feed URL already exists", async ({ feed }) => {
        await addNewFeed(feed)
        await feed.assertFeedURLAlreadyExist()
    })

    test("Add the feed as Favorite", async ({ feed }) => {
        await addNewFeed(feed)
        await feed.addToFavorite()
    })

    test("Assert the feed is added to Bookmarked List", async ({ feed }) => {
        await feed.assertFavoriteAddedtoBookmarked()
    })

})

test.afterEach(async ({ context }, testInfo) => {
    await context.close()
    console.log(`Tests - ${testInfo.title} with status =  ${testInfo.status}`)
})