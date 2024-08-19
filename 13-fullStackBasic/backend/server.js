import express from 'express'

const app = express()
app.get('/', (req, res) => {
    res.send("Server is ready")
})

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'A Joke',
            content: 'This is the first joke'
        },
        {
            id: 2,
            title: 'A Joke',
            content: 'This is the second joke'
        },
        {
            id: 3,
            title: 'A Joke',
            content: 'This is the third joke'
        },
        {
            id: 4,
            title: 'A Joke',
            content: 'This is the fourth joke'
        },
        {
            id: 5,
            title: 'A Joke',
            content: 'This is the fifth joke'
        },
        {
            id: 6,
            title: 'A Joke',
            content: 'This is the sixth joke'
        },
        {
            id: 7,
            title: 'A Joke',
            content: 'This is the seventh joke'
        },
    ]
    res.send(jokes)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})