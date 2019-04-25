const express = require('express');

const app = express();

const hbs = require('hbs');

const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}>: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('err', err)
        }
    })
    next();
})


// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // res.send('<h1>Text here</h1>')
    // res.send({ name: 'Paolo' })
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Hi there',
    })


});

app.get('/about', (req, res) => {
    // res.send('<h1>Text here</h1>')
    // res.send({ name: 'Paolo' })
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));