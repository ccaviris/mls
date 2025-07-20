import { expect } from 'chai';
import matchPage from '../pageobjects/match.page.ts'
import { feedParser } from '../../util/feedParser.ts'
import compareArrays from '../../util/compareArrays.ts'

const feedXml = '../resources/feeds.xml';

describe('Validate match rosters ', () => {
    let feedInformation: feedParser;
    before(async () => {
        await matchPage.open();
        await matchPage.waitForDialogueAndAcceptCookies();
        await matchPage.isLoaded();
        feedInformation = new feedParser(feedXml);
    });

    it('should validate club names', async () => {
        const observedClubNames = await matchPage.getClubNames();
        const expectedHomeClub = feedInformation.getHomeClubName();
        const expectedAwayClub = feedInformation.getAwayClubName();
        
        expect(observedClubNames.home).to.equal(expectedHomeClub);
        expect(observedClubNames.away).to.equal(expectedAwayClub);
    })

    it('should validate the home club\'s starting roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames();
        const expectedPlayers = feedInformation.getHomeStartingPlayers();
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the away club\'s starting roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('startingAway');
        const expectedPlayers = feedInformation.getAwayStartingPlayers();
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the home club\'s bench roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('benchHome');
        const expectedPlayers = feedInformation.getHomeBenchPlayers();
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the away club\'s bench roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('benchAway');
        const expectedPlayers = feedInformation.getAwayBenchPlayers();
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the home club\'s manager roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('managerHome');
        const expectedPlayers = feedInformation.getHomeManagers();
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })

    it('should validate the away club\'s manager roster', async () => {
        const observedPlayers = await matchPage.getPlayerNames('managerAway');
        const expectedPlayers = feedInformation.getAwayManagers();
        expect(compareArrays.verifyIfEqual(observedPlayers, expectedPlayers)).to.be.true;
    })
})

