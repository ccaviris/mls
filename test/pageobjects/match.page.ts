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
        const playerNames = await this.playerNames;
        const playerNameStrings = [];
        await playerNames.forEach(async (playerName) => {
            const name = await playerName.getText();
            playerNameStrings.push(name);
        });
        return playerNameStrings;
    }
}

export default new MatchPage();
