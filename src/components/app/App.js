import {SearchBar} from '../searchbar/searchbar'
import {SearchResults} from '../searchresults/searchresults'
import {Playlist} from '../playlist/playlist'
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [
        {
          id: 21,
          name: 'no matter what',
          artist: 'Papa Roach',
          album: 'Time For Annihilation'
        }
      ],
      playlistName: 'Season',
      playlistTracks: [
        {
          id: 19,
          name: 'Running up that hill',
          artist: 'Loveless',
          album: 'Running up that hill'
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return
    }
    console.log(track)
    this.setState(prevlist => ({
      playlistTracks: [...prevlist.playlistTracks, track]
    }))
  }

  removeTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      this.setState({playlistTracks: this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id)})
    }
    return
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    )
  } 
}

export default App;
