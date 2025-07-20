import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';


class feedParser {

  public getNames(feedsFilePath: any) {
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
      playerData.push({
        shortname: team.ShortName,
        type: 'club',
        home: team.Role === 'home',
      })

      const players = team.Players.Player;

      for (const player of players) {
        if(player.Starting === 'true'){
          playerData.push({
            shortname: player.Shortname,
            type: 'starting',
            home: team.Role === 'home',
          });
        } else {
          playerData.push({
            shortname: player.Shortname,
            type: 'bench',
            home: team.Role === 'home',
          });

        }
      }
      
      const managers = team.TrainerStaff.Trainer;
        for (const manager of managers) {
          playerData.push({
            shortname: manager.Shortname,
            type: 'manager',
            home: team.role === 'home',
        });
      }
    }

    return playerData;
  }

  filterNames(type = 'starting', feedsFilePath: any){
    const players = this.getNames(feedsFilePath);
    const startingPlayers = [];
    for (const player of players) {
        if(player.type === type){
          startingPlayers.push(player.shortname)
        }
    }
    return startingPlayers;
  }

  getStartingPlayers(feedsFilePath: string){
    return this.filterNames('starting', feedsFilePath);
  }

  getBenchPlayers(feedsFilePath: string){
    return this.filterNames('bench', feedsFilePath);
  }

  getManagers(feedsFilePath: string){
    return this.filterNames('manager', feedsFilePath);
  }

  getClubNames(feedsFilePath: string){
    return this.filterNames('club', feedsFilePath);
  }

}
export default new feedParser();