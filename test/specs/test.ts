//import { expect } from '@wdio/globals'
import matchPage from '../pageobjects/match.page.ts'

describe('Validate match rosters ', () => {
    it('should validate starting rosters', async () => {
        await matchPage.open()
        const observedPlayerNames = await matchPage.getPlayerNames();
        console.log('Observed ' + observedPlayerNames.toString())
    })
})

