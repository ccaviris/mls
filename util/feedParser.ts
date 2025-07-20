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

  filterNames(type = 'starting', home = true, feedsFilePath: any){
    const players = this.getNames(feedsFilePath);
    const startingPlayers = [];
    for (const player of players) {
        if(player.type === type && player.home === home){
          startingPlayers.push(player.shortname)
        }
    }
    return startingPlayers;
  }

  getHomeStartingPlayers(feedsFilePath: string){
    return this.filterNames('starting', true, feedsFilePath);
  }

  getAwayStartingPlayers(feedsFilePath: string){
    return this.filterNames('starting', false, feedsFilePath);
  }

  getHomeBenchPlayers(feedsFilePath: string){
    return this.filterNames('bench', true, feedsFilePath);
  }

  getAwayBenchPlayers(feedsFilePath: string){
    return this.filterNames('bench', false, feedsFilePath);
  }

  getHomeManagers(feedsFilePath: string){
    return this.filterNames('manager', false, feedsFilePath);
  }
  getAwayManagers(feedsFilePath: string){
    return this.filterNames('manager', false, feedsFilePath);
  }

  getHomeClubName(feedsFilePath: string){
    return this.filterNames('club', true, feedsFilePath)[0];
  }

  getAwayClubName(feedsFilePath: string){
    return this.filterNames('club', false, feedsFilePath)[0];
  }

}
export default new feedParser();