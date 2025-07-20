import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';


class feedParser {

  public getPlayers(feedsFilePath) {
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
        if(player.Starting === 'true'){
          playerData.push({
            shortname: player.Shortname,
            role: 'starting',
          });
        } else {
          playerData.push({
            shortname: player.Shortname,
            role: 'bench',
          });

        }
      }
      
      const managers = team.TrainerStaff.Trainer;
        for (const manager of managers) {
          playerData.push({
            shortname: manager.Shortname,
            role: 'manager',
        });
      }
    }

    return playerData;
  }

  filterPlayers(starting = 'starting', feedsFilePath){
    const players = this.getPlayers(feedsFilePath);
    const startingPlayers = [];
    for (const player of players) {
        if(player.role === starting){
          startingPlayers.push(player.shortname)
        }
    }
    return startingPlayers;
  }

  getStartingPlayers(feedsFilePath){
    return this.filterPlayers('starting', feedsFilePath);
  }

  getBenchPlayers(feedsFilePath){
    return this.filterPlayers('bench', feedsFilePath);
  }

  getManagers(feedsFilePath){
    return this.filterPlayers('manager', feedsFilePath);
  }

}
export default new feedParser();