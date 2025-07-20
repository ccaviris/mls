import Page from './page';

/**
 * sub page for mthe match information
 */
class MatchPage extends Page {
    
    public get selectors (){
        return {
            startingPlayers: '.mls-o-pitch__foreground',
            benchPlayers: '.mls-c-lineups__substitutions',
            managers: '.mls-c-lineups__managers',
            playerNames: '.mls-o-player-block__player-name',
            homeClubHeader: '.--home',
            awayClubHeader: '.--away',
            clubNames: '.mls-c-club__shortname',
            homeClubFormation: '.mls-o-pitch__club-formation--home',
            awayClubFormation: '.mls-o-pitch__club-formation--away',
            homeClubBench: '.mls-o-substitutions--home',
            awayClubBench: '.mls-o-substitutions--away',
            homeClubManagers: '.mls-o-managers--home',
            awayClubManagers: '.mls-o-managers--away'
        }
    }

    public get homeClubName () {
        return $(`${this.selectors.homeClubHeader} ${this.selectors.clubNames}`)
    }

    public get awayClubeName () {
        return $(`${this.selectors.awayClubHeader} ${this.selectors.clubNames}`)
    }

    public get startingPlayers () {
        return $$(`${this.selectors.startingPlayers} ${this.selectors.playerNames}`);
    }

    public get benchPlayers () {
        return $$(`${this.selectors.benchPlayers} ${this.selectors.playerNames}`);
    }

    public get managers () {
        return $$(`${this.selectors.managers} ${this.selectors.playerNames}`);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open (urlPath = 'competitions/mls-regular-season/2025/matches/stlvspor-07-13-2025/lineups') {
        return super.open(urlPath);
    }

    public async isLoaded(){
        return await super.isLoaded(this.selectors);
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
