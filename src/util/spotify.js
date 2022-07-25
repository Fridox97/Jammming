import { SearchResults } from "../components/searchresults/searchresults"

const clientId = '7bc75ea06afc424ba487181a8333b2f0'
const redirectUri = 'http://Jeison.surge.sh/'
let userAccessToken

const Spotify = {
    getAccessToken(){
        if(userAccessToken){
            return userAccessToken
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if(accessTokenMatch && expiresInMatch){
            userAccessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000)
            window.history.pushState('Access Token', null, '/') //Esta linea fue copiada directo de la solución, investigar mas como funciona
            return userAccessToken
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl
        }
    },

    search(term){
        const userAccessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
              Authorization: `Bearer ${userAccessToken}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse){
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    savePlaylist(name, trackURIs){
        if(!name || !trackURIs){
            return
        }

        const accessToken = Spotify.getAccessToken()
        const headers = { Authorization: `Bearer ${accessToken}` }
        let userID

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            userID = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => {
                return response.json()
            }).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
                })
            })
        })
    }
}


export default Spotify