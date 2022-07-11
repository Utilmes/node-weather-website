const wetherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')



wetherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''
    
    fetch( '/weatherApp?search=' + location).then((response) => {
        response.json().then((data) =>{
            if (data.error){
                return messageOne.textContent =  data.error
            }
                messageOne.textContent = data.location
                messagetwo.textContent = data.forecastData
        })
    })
})