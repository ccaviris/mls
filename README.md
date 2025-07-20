# MLS Competition Page Test

## Setup
After cloning the repository, run `npm install`.
To execute the tests, run `npm run wdio`.

## Discription of Contents

### resources folder

This includes the `feeds.xml` file. Any files that might be stored with information to assist the test would go here. In a real production setup, this likely would not exist and the xml data would likely be obtained dynamically from an API request. 

## test / pageobjects

This folder includes the page objects that are used to run the tests. Currently that is `page.ts` and `match.page.ts`. Everything is in the same directory. If tests across multiple parts of the product were covered by this test, this would be aranged in sub-folders.

`page.ts` includes functions used across all pages. This includes an open function with a hard coded base url, an isLoaded function to be used by child pages, and a function to accept cookies. Both the isLoaded and waitForDialogueAndAcceptCookies functions have a boolean input to determine if a failure on this step will trigger throwing an error that will terminate the test or if it will instead log a console message and attempt to continue. For the tests written here, an attempt at recovery is always made. However, for a smoke test it may be beneficial to throw an error and result in an imediate test failure.

`match.page.ts` handles all of the functions specific to the match page. This includes an array of selectors for elements that are specific to that page along with various get functions to return those page elemetns. This array of selectors is used in a local isLoaded function that passes it as an input to the parrent isLoaded function. An open function over rides the page version and call on it. The full page path is can be passed in, though a default value is used for all tests. One potential improvement would be to create this URL path dynamically by passing in the sub values of `MatchInformation.General`, specifically `CompetitionName` to determine if it is a regular season game or different type of game, `Season` for the year, and `PlannedKickoffTime` to extract the date. getClubNames is used to get a key pair array with the home and away team names. getPlayerNames is used to get an array of player names. Depending on the input, the array with include the names for starting players, bench players, or management on either the home or away team as strings. One possible improvement to this function would be to also read player numbers and positions for additional validation. 

## test / specs  / test.ts

This includes seven tests. Starting, bench, and management rosters for home and away teams each have their own individual tests. There is also a test that validates the home and away team names. A before hook calls functions to the page, accepts the cookie consent, and waits for all page elements to load. By design, if waitForDialogueAndAcceptCookies or isLoaded encouter issues, a console log will be printed and the test will attempt to continue execution.

## util

This folder includes general helper functions.

`compareArrays.ts` was created to validate that two arrays contain the same values. This is done by sorting and joining them before performing a simple string comparison. One significant improvement that could be performed here is to compare all individual valyes of the array and include logging about the specific differences between the expected and observed vales. Due to the modular nature in which this is written, that upgrade can be made to the function while maintaining full backwards compatibility.

`feedParser.ts` parses and returns information from the `feeds.xml` file. My assumption here is that the `feed.xml` file was given as a standin for an API call that would result in a more dynamic test. getNames is used to collect relevant information for the test and return it in a usable array. A filter function returns only the specific names of a given category (club names, home club bench players, etc.) with wraper functions used to simplify use. These functions are admittedly tailored fairly specifically to this test. Whith a better understanding of API endpoint documentation and how this data might be used elsewhere, this entire file would be modified to have more general application.

## Other pages
`.gitignore` is used to prevent node modules from being committed to git.

`package-lock.json` and `package.json` contain information about dependancies and packages.

`README.md` is this file.

`tsconfig.json` and `wdio.conf.ts` contain various config information.


# Challenge Enhancements and Possible Improvements

- As noted above, bench players and coaches are being validated.

- To generate an alert on a failure there are several options. In the past, I have set up cron runs to be triggered through services like Bamboo, Travis, and Lambdatest. Of the three, I felt that Bamboo offered the best combination of functionality and cost. From what I have personally seen, tests running on Bamboo encountered fewer issues than Travis and Lambdatest and Bamboo was cheaper than Travis. Whichever tool is to be used, the procedure would be similar. First something would trigger the tests. This could be a nightly or weekly trigger if it is desired to run tests on a regular schedule. Alternatively, runs against a development environment could be triggered by the creation of pull requests or production runs may be triggered when there is a release. Plug ins to GitHub, BitBucket, or other versioning tools would be used to check out and build the tests as well as to automate any developmental builds of the release candidate if required. One method for reporting that I found to be efficient and easily implemented was to use a slack integration to post a message when there was a failure. For a robust and healthy system, this can be beneficial to make sure that failures are visible and quickly raise alerts. Another solution that I had implemented in the past was to build an elk stack server to display an executive suite with metrics on past test results. For smaller test suites, this is likely over kill. For very large test suites where the volume of tests may make it difficult to track past failures, something like this might prove beneficial. 

- If I need to run the same code against parallel matches running at the same time, there is not a lot that would need to be changed. As it is, the `feed.xml` file path is stored as a variable in `test.ts`. In keeping with the current configuration, the value for this file path would need to be updated as an argument when executing the test. As I mentioned above, it appears that the `feed.xml` file contains enough information to dynamically create the URL and potentially eliminate the need for passing in static URLs. Ideally, I would use API calls to trigger this test. Assuming there was an API endpoint that returns `CompetitionId` values for all matches of a given data, then I would write a script that would make a request to that endpoint and trigger an instance of this test for each `CompetitionId` returned. I am assuming that an endpoint exists such that I can call a `get` request with a `CompetitionId` and recieve information similar to what is contained in the `feeds.xml` file which would provide me everything needed to run tests against all matches for a given date. 