console.log('client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const one = document.querySelector('#weather-one')
const two = document.querySelector('#weather-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    one.textContent = ''
    two.textContent = ''

    const searchTerm = search.value
    getWeather(searchTerm)
})

const getWeather = (location) => fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            one.textContent = `${data.error}`
        } else {
            one.textContent = `${data.location}`
            two.textContent = `${data.forecast}`
        }
    })
})