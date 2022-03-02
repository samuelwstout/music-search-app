// API Documentation: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1

//DOMContentLoaded for the submit form from index.html
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#textsearch')
    searchInput.oninput = handleInput
    function handleInput(e) {
        var resetbutton = document.querySelector('#resetbutton')
        if (e) {
            resetbutton.style.backgroundColor = 'transparent'
        }
    }
   resetbutton.addEventListener('click', handleResetClick)
    function handleResetClick(e) {
        if (e) {
            resetbutton.style.backgroundColor = 'white'
        }
    }
    document.querySelector('#textsearch').addEventListener('input', (e) => {
      if (e.target.value === '') {
        resetbutton.style.backgroundColor = 'white'
      }
    })
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        searchAPI(e.target.value)
    })
})
//Add user input to the DOM
function searchAPI (search) {
    let p = document.createElement('p')
    p.textContent = search
   

//Apple API URL 
    const baseUrl = "https://itunes.apple.com/search?"
    let searchPath = search
    let finalUrl = `${baseUrl}term=${searchPath}&media=music&limit=20`

    // let spotifyUrl = `https://api.spotify.com/v1/search?q=${searchPath}&type=track%2Calbum%2Cartist&limit=20&include_external=audio`
    // const spotifyToken = 'BQCXcf6UvBdKtobVV3FamA0SqYortAd_QpRZuOkLWtnjOgUG6ZjJ-LtEgVbHSc8H-JlK8xWuS9fbU1DR9kYRv0N5QQWCTyAn3lTejruyVj7ziwIpSo9zZtDjsD7oQv8t-OGdSJQLR5SZhfVZsYiEmfPxj1KA3GKuG-U'

//Fetch Request
fetch(finalUrl)
    .then(res => {
     return res.json(); 
    })
   .then(json => {
        const html = json.results      
        .map(searchTerm => {
            return `
            <div class="musician">
                <p>${searchTerm.artistName}</p>
                <p><a class="link" target="_blank" rel="noopener noreferrer" href=${searchTerm.artistViewUrl}>Artist Profile</a></p>
                <p><a class="link" target="_blank" rel="noopener noreferrer" href=${searchTerm.trackViewUrl}>${searchTerm.trackName}</a></p>
                <p><a class="link" target="_blank" rel="noopener noreferrer" href=${searchTerm.collectionViewUrl}>${searchTerm.collectionName}</a></p>
                <audio controls src=${searchTerm.previewUrl}> Your browser does not support the <code>audio</code> element.</audio>
                <p><img src=${searchTerm.artworkUrl100}></img></p>
            </div>
            `
        })
        //Add search results to the DOM
document.querySelector('#apple-list').innerHTML = html.join('');
    })
}

// const input = document.querySelector('#textsearch')
// input.addEventListener('input', updateValue)

// const updateValue = (e) => {
//     console.log(e.target.value)
// }