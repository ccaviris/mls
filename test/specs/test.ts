//import { expect } from '@wdio/globals'
import { expect } from 'chai';
import matchPage from '../pageobjects/match.page.ts'
import feedParser from '../../util/feedParser.ts'
import compareArrays from '../../util/compareArrays.ts'

describe('Validate match rosters ', () => {
    it('should validate starting rosters', async () => {
        await matchPage.open()
        const observedPlayers = await matchPage.getPlayerNames();
        console.log('Observed ' + observedPlayers.toString());
        const expectedPlayers = feedParser.getStartingPlayers();
        console.log('Expected ' + expectedPlayers.toString());

        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })
})

