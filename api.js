import { btnSpinner } from "./pages/btnSpinner.js"
import { getLocalStorage } from "./scripts/localStorage.js"
const baseUrl = 'http://localhost:3333'

export async function createUser(body) {
    try {
        const request = await fetch(`${baseUrl}/users/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {
            // const response = await request.json()
            // btnSpinner()
            const modalCall = document.querySelector('.sucess')
            modalCall.classList.remove('hidden')
            setTimeout(() => {
                window.location.replace('/index.html')
            }, 4000)
        } else {
            alert('Deu ruim')
        }
    }
    catch (err) {
        console.log(err)
    }
}

export async function login(body) {

    try {
        const request = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {
            const response = await request.json()
            localStorage.setItem('User', JSON.stringify(response) || '')
            btnSpinner()
            setTimeout(() => {
                window.location.replace("/pages/home/home.html")
            }, 4000)
        } else {
            const messageError = document.querySelector('.error')
            messageError.classList.remove('w')

        }
    }
    catch (err) {
        console.log(err)
    }
}

export async function getUser() {
    const localS = getLocalStorage()
    try {
        const request = await fetch('http://localhost:3333/users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localS.token}`
            },
        });
        const resp = await request.json()
        return resp
    } catch (err) {
        console.log(err)
    }
}

export async function createPosts(body) {

    try {
        const localS = getLocalStorage()
        const request = await fetch(`${baseUrl}/posts/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localS.token}`
            },
            body: JSON.stringify(body)

        })
        const resp = await request.json()
        return resp
    } catch (err) {
        console.log(err)
    }
}

export async function getPosts() {

    try {
        const localS = getLocalStorage()
        const request = await fetch(`${baseUrl}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localS.token}`
            },
        })
        const resp = await request.json()
        return resp
    } catch (err) {
        console.log(err)
    }
}

export async function editPost(body, id) {

    try {
        const localS = getLocalStorage()
        const request = await fetch(`${baseUrl}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localS.token}`
            },
            body: JSON.stringify(body)

        })
        const resp = await request.json()
        return resp
    } catch (err) {
        console.log(err)
    }
}

export async function deletePost(id) {

    try {
        const localS = getLocalStorage()
        const request = await fetch(`${baseUrl}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localS.token}`
            },
        })
        if(request.ok){
            window.location.reload()
        }
        const resp = await request.json()       
        return resp
    } catch (err) {
        console.log(err)
    }
}