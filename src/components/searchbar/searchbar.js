import React from "react";
import './searchbar.css'

export class SearchBar extends React.Component {
    render() {
        return (
            <div class="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" />
                <button class="SearchButton">SEARCH</button>
            </div>
        )
    }
}