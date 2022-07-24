import React from "react";
import './track.css'

export class Track extends React.Component {
    renderAction(isRemoval){
        if(isRemoval){
            return <button className="Trackaction">-</button>
        }else{
            return <button className="Trackaction">+</button>
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action"></button>
            </div>
        )
    }
}