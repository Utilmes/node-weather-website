const wetherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const searchMyLocation = document.querySelector('#my-location-button')


wetherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''
    
    fetch( '/weatherApp?search=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                return messageOne.textContent =  data.error
            }
                messageOne.textContent = data.location
                messagetwo.textContent = data.forecastData
        })
    })
})

searchMyLocation.addEventListener('click', (e) => {
    e.preventDefault()

    console.log('Searching for your location')

    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        fetch(`/currentlocationweather?latitude=${latitude}&longitude=${longitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error){
                    return messageOne.textContent =  data.error
                }
                    messageOne.textContent = data.location
                    messagetwo.textContent = data.forecastData
            })
        })
       
       
    })

})