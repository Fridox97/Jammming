import React from "react";
import {Track} from '../track/track'

export class TrackList extends React.Component {
    render(){
        return (
            <div className="TrackList">
                {console.log(this.props.tracks)}
                {this.props.tracks.map(track=> {
                    return <Track track={track} key={track.id}/>
                })}
            </div>
        )
    }
}