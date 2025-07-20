//import { expect } from '@wdio/globals'
import { expect } from 'chai';
import matchPage from '../pageobjects/match.page.ts'
import feedParser from '../../util/feedParser.ts'
import compareArrays from '../../util/compareArrays.ts'

const feedXml = '../resources/feeds.xml';

describe('Validate match rosters ', () => {
    before(async () => {
        await matchPage.open();
        await matchPage.waitForDialogueAndAcceptCookies();
        await matchPage.isLoaded();
    });

    it.only ('should validate club names', async () => {
        const observedClubNames = await matchPage.getClubNames();
        const expectedHomeClub = feedParser.getHomeClubName(feedXml);
        const expectedAwatClub = feedParser.getAwayClubName(feedXml);
        
        expect(observedClubNames.home).to.equal(expectedHomeClub);
        expect(observedClubNames.away).to.equal(expectedAwatClub);
    })

    it('should validate starting rosters', async () => {
        const observedPlayers = await matchPage.getPlayerNames();
        const expectedPlayers = feedParser.getStartingPlayers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate bench rosters', async () => {
        const observedPlayers = await matchPage.getPlayerNames('bench');
        const expectedPlayers = feedParser.getBenchPlayers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate manager rosters', async () => {
        const observedPlayers = await matchPage.getPlayerNames('manager');
        const expectedPlayers = feedParser.getManagers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })
})

