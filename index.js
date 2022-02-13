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


//API URL 
    const BASE_URL = "https://itunes.apple.com/search?"
    let SEARCH_PATH = search
    let FINAL_URL = `${BASE_URL}term=${SEARCH_PATH}&media=music&limit=20`


//Render Functions 
const renderSearchResults = (searchResult) => {
    let card = document.createElement('li')
    card.className = card
    card.addEventListener('click', () => {
        let searchObj = {
            artistName: searchResult.artistName,
            artistViewUrl: searchResult.artistViewUrl,
            trackViewUrl: searchResult.trackViewUrl,
            trackName: searchResult.trackName,
            collectionViewUrl: searchResult.collectionViewUrl,
            collectionName: searchResult.collectionName,
            previewUrl: searchResult.previewUrl,
            artworkUrl100: searchResult.artworkUrl100,
        }
        postClickedResult(searchObj)
    })
    card.innerHTML = `
    <div class="musician">
    <p id="artistName">${searchResult.artistName}</p>
    <p id="artistProfile"><a target="_blank" rel="noopener noreferrer" href=${searchResult.artistViewUrl}>Artist Profile</a></p>
    <p id="song"><a target="_blank" rel="noopener noreferrer" href=${searchResult.trackViewUrl}>${searchResult.trackName}</a></p>
    <p id="album"><a target="_blank" rel="noopener noreferrer" href=${searchResult.collectionViewUrl}>${searchResult.collectionName}</a></p>
    <audio id="audio" controls src=${searchResult.previewUrl}> Your browser does not support the <code>audio</code> element.</audio>
    <p id="img"><img src=${searchResult.artworkUrl100}></img></p>
</div>
    `
    document.querySelector('.result-list').appendChild(card)
}

const renderClickedResults = (searchResult) => {
    let clickedCard = document.createElement('li')
    clickedCard.className = clickedCard
    clickedCard.innerHTML = `
    <div class="clickedMusician"
    <p id="artistName">${searchResult.artistName}</p>
    <p id="artistProfile"><a target="_blank" rel="noopener noreferrer" href=${searchResult.artistViewUrl}>Artist Profile</a></p>
    <p id="song"><a target="_blank" rel="noopener noreferrer" href=${searchResult.trackViewUrl}>${searchResult.trackName}</a></p>
    <p id="album"><a target="_blank" rel="noopener noreferrer" href=${searchResult.collectionViewUrl}>${searchResult.collectionName}</a></p>
    <audio id="audio" controls src=${searchResult.previewUrl}> Your browser does not support the <code>audio</code> element.</audio>
    <p id="img"><img src=${searchResult.artworkUrl100}></img></p>
</div>
    `
    document.querySelector('.clicked-list').appendChild(clickedCard)
    updateClickedResult(searchResult)
}

//Fetch Requests
    fetch(FINAL_URL)
     .then(res =>  res.json())
     .then(json => {
        json.results
         .map(searchResult => {
             renderSearchResults(searchResult)
         })
     })

    const postClickedResult = (searchObj) => {
        fetch('http://localhost:3001/clicked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchObj)
        })
         .then(res => res.json())
         .then(searchResult => renderClickedResults(searchResult))
      
  }
  const updateClickedResult = (searchResult) => {
      fetch(`http://localhost:3001/clicked`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(searchResult)
      })
        .then(res => res.json())
        .then(searchResult => console.log(searchResult))
  }
}
