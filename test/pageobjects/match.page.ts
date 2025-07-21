import Page from './page';

/**
 * sub page for mthe match information
 */
class MatchPage extends Page {
    
    //In addition to being used internally, these selectors are used to 
    // validate that the page has loaded before starting test execution
    private get selectors (){
        return {
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

    private get homeClubName () {
        return $(`${this.selectors.homeClubHeader} ${this.selectors.clubNames}`)
    }

    private get awayClubeName () {
        return $(`${this.selectors.awayClubHeader} ${this.selectors.clubNames}`)
    }

    private get homeStartingPlayers () {
        return $$(`${this.selectors.homeClubFormation} ${this.selectors.playerNames}`);
    }


    private get awayStartingPlayers () {
        return $$(`${this.selectors.awayClubFormation} ${this.selectors.playerNames}`);
    }

    private get homeBenchPlayers () {
        return $$(`${this.selectors.homeClubBench} ${this.selectors.playerNames}`);
    }

    private get awayBenchPlayers () {
        return $$(`${this.selectors.awayClubBench} ${this.selectors.playerNames}`);
    }

    private get homeManagers () {
        return $$(`${this.selectors.homeClubManagers} ${this.selectors.playerNames}`);
    }

    private get awayManagers () {
        return $$(`${this.selectors.awayClubManagers} ${this.selectors.playerNames}`);
    }

    /**
     * Overwrites the page open function
     * @param urlpath a string with the URL path to follow the root URL
     */
    public open (urlPath = 'competitions/mls-regular-season/2025/matches/stlvspor-07-13-2025/lineups') {
        return super.open(urlPath);
    }

    /**
    *   This function is used to delay execution until the page is fully loaded
    */
    public async isLoaded(){
        return await super.isLoaded(this.selectors);
    }

    /**
     * 
     * @returns a key pair array with the keys 'home' and 'away' and string representing the home and away team names as valyues
     */
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

    /**
     * 
     * @param playerType A string with the value of 'startingHome', 'benchHome', 'managerHome', 'startingAway', 'benchAway', or 'managerAway' to denote what the desired output is
     * @returns an array of names of the given type determined by playerType
     */
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
