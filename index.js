// API Documentation: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1

//DOMContentLoaded for the submit form from index.html
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        searchAPI(e.target.text_search.value)
    })
})
//Add user input to the DOM
function searchAPI (search) {
    let p = document.createElement('p')
    p.textContent = search

//Apple API URL 
    const BASE_URL = "https://itunes.apple.com/search?"
    let SEARCH_PATH = search
    let FINAL_URL = `${BASE_URL}term=${SEARCH_PATH}&media=music&limit=20`

//Spotify API URL
    let spotifyUrl = `https://api.spotify.com/v1/search?q=${SEARCH_PATH}&type=track%2Calbum%2Cartist&limit=20&include_external=audio`
    
    const spotifyToken = 'BQATfWMYWOEe0igaSg7n0sV7nu0WSwRSfRMnlzR3NJcxRf53UjWSDw3debfPVnVNZGK5m6eMk3ZeP1FHOuGufLTr_EKkWriNZFaig7MrSC0fJokR0N4tZC_xjawXA_IR1WdTuD6ogsxaMph7FuEvQB9LU4vWMJM0VMA'

//Fetch Request
fetch(FINAL_URL)
    .then(res => {
     return res.json(); 
    })
   .then(json => {
        const html = json.results      
        .map(searchTerm => {
            return `
            <div class="musician">
                <p>${searchTerm.artistName}</p>
                <p><a target="_blank" rel="noopener noreferrer" href=${searchTerm.artistViewUrl}>Artist Profile</a></p>
                <p><a target="_blank" rel="noopener noreferrer" href=${searchTerm.trackViewUrl}>${searchTerm.trackName}</a></p>
                <p><a target="_blank" rel="noopener noreferrer" href=${searchTerm.collectionViewUrl}>${searchTerm.collectionName}</a></p>
                <audio controls src=${searchTerm.previewUrl}> Your browser does not support the <code>audio</code> element.</audio>
                <p><img src=${searchTerm.artworkUrl100}></img></p>
                <button id="like" type="button">Like</button>
            </div>
            `
        })
        //Add search results to the DOM
document.querySelector('#apple-list').innerHTML = html.join('');
    })

fetch(spotifyUrl, {
    method: 'GET',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${spotifyToken}`
        }
    })
 .then(r => r.json())
 .then(data => {
    console.log(data.artists.items)
    const html2 = data.albums.items
    .map(searchTerm2 => {
        return `<div class="musician2">
        <div>
          <p class="text">${searchTerm2.name}</p>
          <p><img src=${searchTerm2.images[1].url}></img></p>
          <p><a class="text" href=${searchTerm2.uri}>Go to Spotify</a></p>
        </div>
        <div>
        `
    })
document.querySelector('#albums').innerHTML = html2.join('');
 })


//Add like button to the DOM
const allLikeButtons = document.querySelectorAll('#like')

//To toggle the 'like' button on every search result
allLikeButtons.forEach((button) => {
   button.addEventListener('click', function() {
       button.classList.toggle('second')
   }) 
})
}
