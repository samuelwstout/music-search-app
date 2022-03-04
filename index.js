
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

const onPageLoad = () => {
    if (window.location.search.length > 0) {
        handleRedirect()
    }
}

const handleRedirect = () => {
    let code = getCode()
    fetchAccessToken( code )
}

const fetchAccessToken = ( code ) => {
    let body = 'grant_type=authorization_code'
    body += '&code=' + code
    body += '&redirect_uri=' + encodeURI(redirectURI)
    body += '&client_id=' + clientID
    body += '&client_secret=' + clientSecret
    callAuthorizationApi(body)
}

const callAuthorizationApi = (body) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', TOKEN, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('Authorization', 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64'))
    xhr.send(body)
    xhr.onload = handleAuthorizationResponse
}

const handleAuthorizationResponse = () => {
    if (res.status == 200){
        let data = JSON.parse(this.responseText)
        if ( data.access_token != undefined) {
            access_token = data.access_token
            localStorage.set('refresh_token', refresh_token)
        }
        if ( data.refresh_token != undefined) {
            refresh_token = data.refresh_token
            localStorage.setItem('refresh_token', refresh_token)
        }
        onPageLoad()
    }
}

const getCode = () => {
    let code = null
    const queryString = window.location.search
    if ( queryString.length > 0 ) {
        const urlParams = new URLSearchParams(queryString)
        code = urlParams.get('code')
    }
    return code
}

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