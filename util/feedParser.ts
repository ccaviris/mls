import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';


class feedParser {

  public getPlayers(feedsFilePath = '../resources/feeds.xml') {
    const feedsPath = path.join(__dirname, feedsFilePath);
    const feedsXml = fs.readFileSync(feedsPath, 'utf-8');
    const parser = new XMLParser({
      // Don't check for attributes. Treats everything as tag
      ignoreAttributes: false,
      // Identify attributes with this prefix otherwise treat them as a tag
      attributeNamePrefix: '',
    });

    const parsedFeed = parser.parse(feedsXml);
    const teams = parsedFeed.PutDataRequest.MatchInformation.Teams.Team;

    const playerData = [];

    for (const team of teams) {
      const players = team.Players.Player;

      for (const player of players) {
        playerData.push({
          shortname: player.Shortname,
          //Convert the string "true" or "false" to a boolean value
          starting: player.Starting === 'true',
        });
      }
    }

    return playerData;
  }

  getStartingPlayers(feedsFilePath = '../resources/feeds.xml'){
    const players = this.getPlayers(feedsFilePath);
    const startingPlayers = [];
    for (const player of players) {
        if(player.starting === true){
          startingPlayers.push(player.shortname)
        }
  }
  return startingPlayers;
}
}
export default new feedParser();