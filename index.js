
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
        searchAPI(e.target.textsearch.value) //I need 'textsearch' to display correct results?
    })
})

let clientID = 'a45eb12484d24c4199050bdefee6d24b'
let clientSecret = 'f9765ecc897c46a8998cd3508002ae86'
const redirectURI = 'http://127.0.0.1:5500/index.html'
const scope = 'user-read-private user-read-email'
const TOKEN = 'https://accounts.spotify.com/api/token'


const requestAuthorization = () => {
    let authURL = 'https://accounts.spotify.com/authorize'
    authURL += '?client_id=' + clientID
    authURL += '&response_type=code'
    authURL += '&redirect_uri=' + encodeURI(redirectURI)
    authURL += '&scope=' + scope
    authURL += '&show_dialog=true'
    window.location.href = authURL //show Spotify's authorization screen
}


//Add user input to the DOM
const searchAPI = (search) => {
    let p = document.createElement('p')
    p.textContent = search
}


  //https://accounts.spotify.com/authorize?response_type=token&client_id=a45eb12484d24c4199050bdefee6d24b&scope=user-read-private user-read-email&redirect_uri=http://localhost:8888