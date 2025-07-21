import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';


export class feedParser {
  private players: any[]
  constructor(feedsFilePath: string){
    this.players = this.getNames(feedsFilePath)
  }
  
  /**
   * 
   * @param feedsFilePath A string with a file path to the feeds.xml value
   * @returns An array of key pair arrays with names for (clubs, starting players, bench players, and managers), if they are home or away, and what they are (a club, starting player, etc)
   */
  private getNames(feedsFilePath: string) {
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

  /**
   * 
   * @param type a string used to filter what type of names will be returned. Values can me starting, bench, manager, or club.
   * @param home a boolean used to filer between home and away values. If home values are desired, use true. If away values are desired, use false.
   * @returns an array of strings with the requested names
   */
  private filterNames(type = 'starting', home = true){
    const startingPlayers = [];
    for (const player of this.players) {
        if(player.type === type && player.home === home){
          startingPlayers.push(player.shortname)
        }
    }
    return startingPlayers;
  }

  /**
   * 
   * @returns An array with the names of the starting home players
   */
  public getHomeStartingPlayers(){
    return this.filterNames('starting', true);
  }

  /**
   * 
   * @returns An array with the names of the starting away players
   */
  public getAwayStartingPlayers(){
    return this.filterNames('starting', false);
  }

  /**
   * 
   * @returns An array with the names of the bench home player
   */
  public getHomeBenchPlayers(){
    return this.filterNames('bench', true);
  }

  /**
   * 
   * @returns An array with the names of the bench away player
   */
  public getAwayBenchPlayers(){
    return this.filterNames('bench', false);
  }

  /**
   * 
   * @returns An array with the names of the home managers
   */
  public getHomeManagers(){
    return this.filterNames('manager', true);
  }

  /**
   * 
   * @returns An array with the names of the away managers
   */
  public getAwayManagers(){
    return this.filterNames('manager', false);
  }

  /**
   * 
   * @returns A string with the name of the home club
   */
  public getHomeClubName(){
    return this.filterNames('club', true)[0];
  }

  /**
   * 
   * @returns A string with the name of the away club
   */
  public getAwayClubName(){
    return this.filterNames('club', false)[0];
  }

}