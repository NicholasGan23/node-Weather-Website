
const path = require("path")
const express = require("express") // is actually a function, call it to create a new express application
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require("./Utils/forecast")


const app = express() //does not take in any parameters

//Define paths for express config
//customise folder name for views, instad of ../views can be ../template
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
// allows to set a value for given express setting, key and value 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dicrectory to serve
//way to customise the server
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Nicholas Gan"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Nicholas Gan"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Nicholas Gan',
        message: "This is a page to seek help"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
 
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error }) 
            }

            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


//this matches any page that url starts with "/help/"
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404cls",
        name: 'Nicholas Gan',
        message: 'Help article not found'
    })
})



//comes last for 404 page
//'*' is a wildcard character
app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        name: 'Nicholas Gan',
        message: 'Page not found'
    })
})


//to start the server, port number, callback function
//asynchronous function
app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) // the argument provided inside the port number
//http: port 80




// imagine owning app.com domain
// multiple pages: app.com   //  app.com/help    //  app.com/about



//takes in 2 arguments, first: route, second: function
//route means "/help", "/about" type
//object arguments: request, response
//request = req shortform
//response = res shortform, bunch of methods allowing us to customise what to send back 
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>') //sending something back, in this case: HTML

// }) // lets us configure what this serve r does 



// app.get('/help', (req,res) => {
//     // res.send({
//     //     name: "Nicholas",
//     //     age: 23
//     // }) //sending back JSON, pass back object or array 

//     //Object format
//     res.send([{
//         name: "Nicholas"
//     }, {
//         name: "Potato"
//     }
//     ])
// })

// app.get('/about', (req,res) => {
//     res.send('<h2>About page</h2>')
// })
