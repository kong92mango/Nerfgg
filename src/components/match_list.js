import React from 'react';

import ChampionJson from './champions.json';

class MatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state =({
      outputText:""
    });
    this.setState = this.setState.bind(this);
  }

  logData(value){
     console.log(value, this.props.rawList, this.props.searchedName);
  }

  getParticipantNumber(gameNumber){
    if (this.props.rawList){
      for (var participant in this.props.rawList[gameNumber].participantIdentities){
        if (this.props.rawList[gameNumber].participantIdentities[participant].player.summonerName.toLowerCase()
         === this.props.searchedName.toLowerCase()){
          return this.props.rawList[gameNumber].participantIdentities[participant].participantId;
        }
      }
    }
  }

  getChampionId(gameNumber, participantNumber){
    if (this.props.rawList){
      participantNumber = participantNumber-1;
      // paticipant 1 is always in position 0
      return this.props.rawList[gameNumber].participants[participantNumber].championId;
    }
  }

  getKda(gameNumber, participantNumber){
    if (this.props.rawList){
      participantNumber = participantNumber-1;
      var kills = this.props.rawList[gameNumber].participants[participantNumber].stats.kills;
      var deaths = this.props.rawList[gameNumber].participants[participantNumber].stats.deaths;
      var assists = this.props.rawList[gameNumber].participants[participantNumber].stats.assists;
      return kills+"/"+deaths+"/"+assists
    }
  }

  getResults(gameNumber, participantNumber){
    if (this.props.rawList){
      participantNumber = participantNumber-1;
      if (this.props.rawList[gameNumber].participants[participantNumber].stats.win){
        return "WIN"
      } else {
        return "LOSE"
      }
    }
  }

  buildFinalString(matchHistory){
    var finalString = "";
    var championDict = {}
    ChampionJson.forEach(function(champ) {
      championDict[champ.key] = champ.name
    })
    for (var game in matchHistory){
      var participantNumber = this.getParticipantNumber(game);
      var championName = championDict[this.getChampionId(game, participantNumber)];
      var kda = this.getKda(game, participantNumber);
      var results = this.getResults(game, participantNumber);
      finalString += "Recent game " + (parseInt(game)+1) + " " + results + " as " + championName + " with KDA of " + kda + ".\n\n";
    }
    return finalString;
  }

  render(){
    var separatedMatchInfo = this.props.rawList;

    return  (<div>
        <span>{this.buildFinalString(separatedMatchInfo)}</span>
    </div>)
  }
}

export default MatchList;
