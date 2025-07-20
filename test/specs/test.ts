//import { expect } from '@wdio/globals'
import { expect } from 'chai';
import matchPage from '../pageobjects/match.page.ts'
import feedParser from '../../util/feedParser.ts'
import compareArrays from '../../util/compareArrays.ts'

describe('Validate match rosters ', () => {
    before(async () => {
        await matchPage.open()
    });

    it('should validate starting rosters', async () => {
        const observedPlayers = await matchPage.getPlayerNames();
        const expectedPlayers = feedParser.getStartingPlayers();
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })
})

