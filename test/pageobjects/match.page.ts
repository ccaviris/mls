import Page from './page';

/**
 * sub page for mthe match information
 */
class MatchPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get startingPlayers () {
        return $$('.mls-o-pitch__foreground .mls-o-player-block__player-name');
    }

    public get benchPlayers () {
        return $$('.mls-c-lineups__substitutions .mls-o-player-block__player-name')
    }

    public get managers () {
        return $$('.mls-c-lineups__managers .mls-o-player-block__player-name')
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open (urlPath = 'competitions/mls-regular-season/2025/matches/stlvspor-07-13-2025/lineups') {
        return super.open(urlPath);
    }

    public async getPlayerNames (playerType = 'starting'){
        let playerNames;
        switch (playerType) {
            case 'starting':
                playerNames = await this.startingPlayers;
                break;
            case 'bench':
                playerNames = await this.benchPlayers;
                break
            case 'manager':
                playerNames = await this.managers;
                break;
            default:
                console.log(`Invalid input of ${playerType} in getPlayerNames function. Valid inputs inclue 'starting', 'bench', or 'manager'`)
                return null;
        }
        
        const playerNameStrings = [];
        await playerNames.forEach(async (playerName) => {
            const name = await playerName.getText();
            playerNameStrings.push(name);
        });
        return playerNameStrings;
    }
}

export default new MatchPage();
