import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page for mthe match information
 */
class MatchPage extends Page {

    /**
     * overwrite specific options to adapt it to page object
     */
    public open (urlPath = 'competitions/mls-regular-season/2025/matches/stlvspor-07-13-2025/lineups') {
        return super.open(urlPath);
    }
}

export default new MatchPage();
