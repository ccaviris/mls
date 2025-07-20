import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';


export class feedParser {
  private players: any[]
  constructor(feedsFilePath: string){
    this.players = this.getNames(feedsFilePath)
  }
  
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
            home: team.Role === 'home',
        });
      }
    }

    return playerData;
  }

  filterNames(type = 'starting', home = true){
    const startingPlayers = [];
    for (const player of this.players) {
        if(player.type === type && player.home === home){
          startingPlayers.push(player.shortname)
        }
    }
    return startingPlayers;
  }

  getHomeStartingPlayers(){
    return this.filterNames('starting', true);
  }

  getAwayStartingPlayers(){
    return this.filterNames('starting', false);
  }

  getHomeBenchPlayers(){
    return this.filterNames('bench', true);
  }

  getAwayBenchPlayers(){
    return this.filterNames('bench', false);
  }

  getHomeManagers(){
    return this.filterNames('manager', true);
  }
  getAwayManagers(){
    return this.filterNames('manager', false);
  }

  getHomeClubName(){
    return this.filterNames('club', true)[0];
  }

  getAwayClubName(){
    return this.filterNames('club', false)[0];
  }

}