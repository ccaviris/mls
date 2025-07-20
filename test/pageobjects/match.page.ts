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

    public get homeStartingPlayers () {
        return $$(`${this.selectors.homeClubFormation} ${this.selectors.playerNames}`);
    }


    public get awayStartingPlayers () {
        return $$(`${this.selectors.awayClubFormation} ${this.selectors.playerNames}`);
    }

    public get homeBenchPlayers () {
        return $$(`${this.selectors.homeClubBench} ${this.selectors.playerNames}`);
    }

    public get awayBenchPlayers () {
        return $$(`${this.selectors.awayClubBench} ${this.selectors.playerNames}`);
    }

    public get homeManagers () {
        return $$(`${this.selectors.homeClubManagers} ${this.selectors.playerNames}`);
    }

    public get awayManagers () {
        return $$(`${this.selectors.awayClubManagers} ${this.selectors.playerNames}`);
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

    public async getClubNames (){
        const homeTeamNameElement = await this.homeClubName;
        const awayTeamNameElement = await this.awayClubeName;

        const homeClubName = await homeTeamNameElement.getText();
        const awayClubName = await awayTeamNameElement.getText();

        return {
            home: homeClubName,
            away: awayClubName
        }
    }

    public async getPlayerNames (playerType = 'startingHome'){
        let playerNames;
        switch (playerType) {
            case 'startingHome':
                playerNames = await this.homeStartingPlayers;
                break;
            case 'benchHome':
                playerNames = await this.homeBenchPlayers;
                break
            case 'managerHome':
                playerNames = await this.homeManagers;
                break;
            case 'startingAway':
                playerNames = await this.awayStartingPlayers;
                break;
            case 'benchAway':
                playerNames = await this.awayBenchPlayers;
                break
            case 'managerAway':
                playerNames = await this.awayManagers;
                break;
            default:
                console.log(`Invalid input of ${playerType} in getPlayerNames function. Valid inputs inclue 'startingHome', 'benchHome', 'managerHome', 'startingAway', 'benchAway', or 'managerAway'`)
                return null;
        }
        
        const playerNameStrings: string[] = [];
        await playerNames.forEach(async (playerName) => {
            const name = await playerName.getText();
            playerNameStrings.push(name);
        });
        return playerNameStrings;
    }
}

export default new MatchPage();
