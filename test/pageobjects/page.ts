import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {  
    public get acceptAndContinueButton () {
        return $('button#onetrust-accept-btn-handler');
    }
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        return browser.url(`https://www.mlssoccer.com/${path}`)
    }

    public async isLoaded(selectors) {
        await selectors.forEach(async (selector) => {
            await $(selector).waitForDisplayed();
        });
    }

    public waitForDialogueAndAcceptCookies(){
        const accept = this.acceptAndContinueButton;
        accept.waitForDisplayed();
        accept.click();
    }
}
