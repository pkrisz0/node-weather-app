const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGtyaXN6ODkiLCJhIjoiY2s4OHN0dHNkMGF2NzNvbXFoaTdhM2h2YyJ9.hyW-MHjO6MKloxZ4SBcKVg&limit=1&language=hu`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geo service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location with that name!', undefined)
        } else {
            callback(undefined, { 
                lat: body.features[0].center[1], 
                lon:  body.features[0].center[0], 
                location: body.features[0].place_name, 
            })
        }
    })
}

module.exports = geocode;