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

    it('should validate club names', async () => {
        const observedClubNames = await matchPage.getClubNames();
        const expectedHomeClub = feedParser.getHomeClubName(feedXml);
        const expectedAwatClub = feedParser.getAwayClubName(feedXml);
        
        expect(observedClubNames.home).to.equal(expectedHomeClub);
        expect(observedClubNames.away).to.equal(expectedAwatClub);
    })

    it('should validate the home club\'s starting roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames();
        const expectedPlayers = feedParser.getHomeStartingPlayers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the away club\'s starting roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('startingAway');
        const expectedPlayers = feedParser.getAwayStartingPlayers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the home club\'s bench roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('benchHome');
        const expectedPlayers = feedParser.getHomeBenchPlayers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the away club\'s bench roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('benchAway');
        const expectedPlayers = feedParser.getAwayBenchPlayers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the home club\'s manager roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('managerHome');
        const expectedPlayers = feedParser.getHomeManagers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the away club\'s manager roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('managerAway');
        const expectedPlayers = feedParser.getAwayManagers(feedXml);
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })
})

