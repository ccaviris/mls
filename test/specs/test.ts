//import { expect } from '@wdio/globals'
import matchPage from '../pageobjects/match.page'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await matchPage.open()
        await matchPage.getPlayerNames()
    })
})

