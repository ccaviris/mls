//import { expect } from '@wdio/globals'
import matchPage from '../pageobjects/match.page.ts'
import { feedParser } from '../../util/feedParser.ts'

describe('Validate match rosters ', () => {
    it('should validate starting rosters', async () => {
        await matchPage.open()
        const observedPlayerNames = await matchPage.getPlayerNames();
        console.log('Observed ' + observedPlayerNames.toString());
        const parser = new feedParser();  
        const expectedPlayers = parser.getPlayers();
        console.log('Expected ' + expectedPlayers.length);
    })
})

