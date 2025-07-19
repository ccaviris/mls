import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page for mthe match information
 */
class MatchPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get playerNames () {
        return $$('.mls-o-player-block__player-name');
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    public open (urlPath = 'competitions/mls-regular-season/2025/matches/stlvspor-07-13-2025/lineups') {
        return super.open(urlPath);
    }

    public async getPlayerNames (){
        //TODO this is a place holder, replace with an isLoaded function
        await browser.pause(15000);
        const playerNames = await this.playerNames;
        const playerNameStrings = [];
        playerNames.forEach(async (playerName) => console.log(await playerName.getText()));
    }
}

export default new MatchPage();
