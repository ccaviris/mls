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

    public async isLoaded(selectors = {}) {
        for (const [key, selector] of Object.entries(selectors)) {
            console.log(await $(selector).waitForDisplayed({timeoutMsg: `Failed to load the ${key} element.`}));
        }
    }

    public async waitForDialogueAndAcceptCookies(){
        try{
            const accept = this.acceptAndContinueButton;
            await accept.waitForDisplayed();
            return await accept.click();
        } catch (error) {
            console.log('The confirmation button for the cookie consent popup failed to load. Attempting to continue with test execution.')
        }
    }
}
