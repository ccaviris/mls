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
    public open (path = '') {
        //One potential improvement is to support alternate base URLs for development or staging environments
        return browser.url(`https://www.mlssoccer.com/${path}`)
    }

    /**
     * This function is used to delay execution while pages load
     * @param selectors An array of CSS selectors that one expects to find on the page after it has loaded
     * @param attemptRecovery a boolean value. If true, errors will be caught and script execution will continue to see if it can remove. If false erros will be thrown if elements fail to load
     */
    public async isLoaded(selectors = {}, attemptRecovery = true) {
        for (const [key, selector] of Object.entries(selectors)) {
            try{
                await $(selector).waitForDisplayed({timeoutMsg: `Failed to load the ${key} element.`});
            } catch (error) {
                if(attemptRecovery){
                    console.log(`Failed to load the ${key} element. Attempting to continue with test execution.`);
                } else {
                    throw error;
                }
                //One potential improvement is to return true or false if everything loads as expected or not. This could be used as the basis for a smoke test.
            }
        }
    }

    /**
     *This function waits for and accepts the cookie consent popup.
     * @param attemptRecovery a boolean value. If true, errors will be caught and script execution will continue to see if it can remove. If false erros will be thrown if elements fail to load
     * @returns 
     */
    public async waitForDialogueAndAcceptCookies(attemptRecovery = true){
        try{
            const accept = this.acceptAndContinueButton;
            await accept.waitForDisplayed({timeoutMsg: 'The confirmation button for the cookie consent popup failed to load.'});
            return await accept.click();
        } catch (error) {
            if(attemptRecovery){
                console.log('The confirmation button for the cookie consent popup failed to load. Attempting to continue with test execution.');
            } else {
                throw error;
            }
        }
        //With some light modification this could be used as the basis for a test of the cookie consent popup
    }
}
