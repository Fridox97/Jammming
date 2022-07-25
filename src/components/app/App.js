import {SearchBar} from '../searchbar/searchbar'
import {SearchResults} from '../searchresults/searchresults'
import {Playlist} from '../playlist/playlist'
import Spotify from '../../util/spotify'
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'Season',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return
    }
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

  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri
    })
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(data => {
      this.setState({searchResults: data})
    })
    
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}
                                    onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  } 
}

export default App;
