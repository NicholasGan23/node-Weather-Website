
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



// form and input are values in index.hbs html file
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    msg1.textContent = "loading..."
    msg2.textContent = ""
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                // console.log(data.error)
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast

                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })

})