const request = require('request')

const weather = (lat, lon, callback) => {
    const url = `https://api.darksky.net/forecast/aa78cb93a356c8872542e94f1bd119dd/${encodeURIComponent(lat)},${encodeURIComponent(lon)}?units=si&lang=hu`    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, 
                `A homerseklet ${body.currently.temperature} fok. ${body.currently.precipProbability}% valoszinuseggel fog esni.`
            )
        }
    })
}

module.exports = weather;