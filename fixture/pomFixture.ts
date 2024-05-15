import { test as baseTest } from '@playwright/test'
import Login from '../pageObjects/Login/Login'
import SignUp from '../pageObjects/SignUp/SignUp'
import BasePage from '../pageObjects/Base/BasePage'
import Feed from '../pageObjects/Feed/Feed'
import Comments from '../pageObjects/Comments/Comments'

type pages = {
    login: Login
    signUp: SignUp
    basePage: BasePage
    feed: Feed
    comments: Comments
}

const testPages = baseTest.extend<pages>({
    basePage: async ({ page }, use) => {
        await use(new BasePage(page))
    },
    login: async ({ page }, use) => {
        await use(new Login(page))
    },
    signUp: async ({ page }, use) => {
        await use(new SignUp(page))
    },
    feed: async ({ page }, use) => {
        await use(new Feed(page))
    },
    comments: async ({ page }, use) => {
        await use(new Comments(page))
    },
})

export const test = testPages
export const expect = testPages.expect