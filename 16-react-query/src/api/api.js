import axios from "axios"

const fetchData = async (page) => {
    const data = await axios.get(`http://localhost:3000/posts?_sort=-id&${page ? `_page=${page}&_per_page=5` : ""}`)
    return data.data
}

const fetchCountry = async () => {
    const data = await axios.get('http://localhost:3000/Country')
    return data.data
}

const addPost = async (post) => {
    const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(post)
    })
    return response.json()
}

export {fetchData, addPost, fetchCountry}