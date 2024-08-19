import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Array to store products
const products = [
    {
        id: 1,
        title: 'Camera',
        content: 'This is the first joke'
    },
    {
        id: 2,
        title: 'Car',
        content: 'This is the second joke'
    },
    {
        id: 3,
        title: 'Bike',
        content: 'This is the third joke'
    },
    {
        id: 4,
        title: 'Mobile',
        content: 'This is the fourth joke'
    },
    {
        id: 5,
        title: 'Laptop',
        content: 'This is the fifth joke'
    },
    {
        id: 6,
        title: 'Chair',
        content: 'This is the sixth joke'
    },
    {
        id: 7,
        title: 'Iphone',
        content: 'This is the seventh joke'
    },
];

// GET route to fetch products
app.get('/api/products', (req, res) => {
    if (req.query.search) {
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(req.query.search.toLowerCase())
        )
        setTimeout(() => {
            res.send(filteredProducts);
            
        }, 2000);
        return;
    }

    setTimeout(() => {
        res.send(products);
    }, 3000);
});

// POST route to add a new product
app.post('/api/products', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send({ error: 'Title and content are required' });
    }

    const newProduct = {
        id: products.length + 1,
        title,
        content
    };

    products.push(newProduct);

    res.status(201).send(newProduct);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
