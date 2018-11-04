import React from 'react';
import MatchList from './match_list.js'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state =({
      data:"",
      searchedSummoner:"",
      apiHost:`https://nerfedgg.herokuapp.com`
    });
    this.callServer = this.callServer.bind(this);
    this.getState = this.getState.bind(this);
    this.render = this.render.bind(this);
    this.setState = this.setState.bind(this);
  }

  getState = () => this.state;

  callServer = () => {
    fetch(`${this.state.apiHost}/dataRoute`,{
       method: 'POST',
       body: JSON.stringify({
         summonerName: this.state.searchedSummoner
       }),
       headers: {"Content-Type": "application/json"}
     })
     .then(function(response){
       return response.json()
     })
     .then(function(body){
       console.log(body);
       return body;
     }).then(body => this.setState({data: body}))
 }

 logData = () => console.log(this.state.data);

 onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.callServer();
    }
  }

  render(){
    return  (<div>
      <input type="text" value={this.state.searchedSummoner} onKeyDown={this.onKeyDown}
       onChange={browserEvent => this.setState({searchedSummoner: browserEvent.target.value})}
       style={{width: 300}} placeholder='Search NA Summoner Name'></input>
      <button type="submit" onClick={this.callServer}>Search</button>
      <br/>
      <MatchList rawList={this.state.data} searchedName={this.state.searchedSummoner}/>
    </div>)
  }
}

export default SearchBar;
