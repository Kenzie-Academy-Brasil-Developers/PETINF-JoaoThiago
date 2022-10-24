import { btnSpinner } from "./pages/login/index.js"


const baseUrl = 'http://localhost:3333'


async function createUser(body) {
    try {
        const request = await fetch(`${baseUrl}/users/create`,{
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    })
    if(request.ok){
        const response = await request.json()
        btnSpinner()
        const modalCall = document.querySelector('.sucess')
        modalCall.classList.remove('hidden')
        setTimeout(() => {
            window.location.replace('/index.html')
        },4000)
    } else {
        alert('Deu ruim')
    }
}
    catch(err) {
        console.log(err)
    }
}

async function login(body) {
    
    try {
        const request = await fetch(`${baseUrl}/login`,{
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    })
    if(request.ok){
        const response = await request.json()
        btnSpinner()
        console.log(response)
        localStorage.setItem('User',JSON.stringify(response) || '')
        setTimeout(() => {
            window.location.replace("/pages/home/home.html")
        },4000)
        
    } else {
        const messageError = document.querySelector('.error')
        messageError.classList.remove('w')      
    }
}
    catch(err) {
        console.log(err)
    }
}

export {createUser ,login}