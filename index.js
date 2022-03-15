// API Documentation: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1

//DOMContentLoaded for the submit form from index.html
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#textsearch')

    const handleInput = (e) => {
        var resetbutton = document.querySelector('#resetbutton')
        if (e) {
            resetbutton.style.backgroundColor = 'transparent'
        }
    }

    searchInput.oninput = handleInput

    resetbutton.addEventListener('click', (e) => {
        if (e) {
            resetbutton.style.backgroundColor = 'white'
        }
    })
    document.querySelector('#textsearch').addEventListener('input', (e) => {
        if (e.target.value === '') {
          resetbutton.style.backgroundColor = 'white'
        }
      })
    
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        searchAPI(e.target.textsearch.value)
    })
})
//Add user input to the DOM
function searchAPI (search) {
    let p = document.createElement('p')
    p.textContent = search

//API URL 
    const BASE_URL = "https://itunes.apple.com/search?"
    let SEARCH_PATH = search
    let FINAL_URL = `${BASE_URL}term=${SEARCH_PATH}&media=music&limit=20`

//Fetch Request
   fetch(FINAL_URL)
    .then(res => {
     return res.json()
    })
   .then(json => {
        const html = json.results      
        .map(searchTerm => {
            return `
            <div class="musician">
                <p><img src=${searchTerm.artworkUrl100}></img></p>
                <p><a class="resultText" target="_blank" rel="noopener noreferrer" href=${searchTerm.artistViewUrl}>${searchTerm.artistName}</a></p>
                <p><a class="resultText" target="_blank" rel="noopener noreferrer" href=${searchTerm.trackViewUrl}>${searchTerm.trackName} | </a>
                <a class="resultText" target="_blank" rel="noopener noreferrer" href=${searchTerm.collectionViewUrl}>${searchTerm.collectionName}</a></p>
                <audio controls src=${searchTerm.previewUrl}> Your browser does not support the <code>audio</code> element.</audio>
            </div>
             `
        })
if ( ! (document.querySelector('#result-list').innerHTML = html.join(''))) {
    document.querySelector('#result-list').innerHTML = `<h2 class='error'>Your search '${search}' does not match.</h2>`
}
})
}