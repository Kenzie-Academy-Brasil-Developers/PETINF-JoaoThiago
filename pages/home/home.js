import { getLocalStorage } from "../../scripts/localStorage.js";
import { createPosts, getPosts, getUser } from '../../api.js'
async function renderName() {
    const user = getLocalStorage()
    return user
}

function checkLogin() {
    const localStorage = getLocalStorage()
    if (localStorage === '') {
        window.localStorage.replace('/index.html')
    }
}

async function renderUser() {
    const userLogged = [await getUser()]

    const imgTop = document.querySelector('#userImg')
    const main = document.querySelector('main')
    const divClose = document.querySelector('.div_close')


    userLogged.forEach((evt) => {

        imgTop.src = evt.avatar
        const leaveDiv = document.querySelector('.leave_div_btn')
        imgTop.addEventListener('click', () => {
            if (leaveDiv.classList.contains('hidden')) {
                leaveDiv.classList.remove('hidden')
            } else {
                leaveDiv.classList.add('hidden')
            }
            const tagP = document.querySelector('#userNameP')
            tagP.innerText = '@' + evt.username

            const btnLogout = document.querySelector('#logout')
            btnLogout.addEventListener('click', () => {
                localStorage.clear()
                window.location.replace('/index.html')
            })
        })

    })
}

function showModalCreatePost() {

    const inputTitle = document.querySelector('#postTitle')
    const inputContent = document.querySelector('#postContent')
    const btnPost = document.querySelector('.postBtn')
    const btnCloseModal = document.querySelector('#btn_closeModal')
    const btnCloseModall = document.querySelector('#btn_closeModall')
    const btnPub = document.querySelector('#btn_Save')

    btnPost.addEventListener('click', () => {
        const modalCreate = document.querySelector('#newPost')
        modalCreate.classList.remove('hidden')
    })
    btnCloseModal.addEventListener('click', () => {
        modalCreate.classList.add('hidden')

    })
    btnCloseModall.addEventListener('click', () => {
        modalCreate.classList.add('hidden')

    })

    btnPub.addEventListener('click', async () => {

        const body = {
            title: inputTitle.value,
            content: inputContent.value,
        }
        await createPosts(body)
        window.location.reload()
    })

}

async function renderizarPost() {
    const publi = await getPosts()

    const ul = document.querySelector('ul')
    ul.innerHTML = ''
    const loggedUser = [await getUser()]

    const userName = loggedUser.map(e => e.username)
    publi.map(({ user, createdAt, title, content, id }) => {
        const userData = user

        if (userName.includes(userData.username)) {
            ul.insertAdjacentHTML('afterend', `
            <li>
            <div class="header_li">
                <figure class="img_name_data">
                    <img src="${userData.avatar}" alt="">
                    <p class="userName">${userData.username}<span> | ${new Date(createdAt).toLocaleString()} </span></p>
                </figure>
                <form id="formBtn" class="btns">
                    <button id="${id}" class="btn_edit">Editar</button>
                    <button class="btn_del">Excluir</button>
                </form>
            </div>
            <div class="li_post">
                <h2> ${title} </h2>
                <p> ${content} </p>
                <button>Acessar publicação</button>
            </div>
        </li>
            `)
        } else {
            ul.insertAdjacentHTML('afterend', `
            <li>
            <div class="header_li">
                <figure class="img_name_data">
                    <img src="${userData.avatar}" alt="">
                    <p class="userName">${userData.username}<span>| ${new Date(createdAt).toLocaleString()} </span></p>
                </figure>
                <form class="btns">
                  
                </form>
            </div>
            <div class="li_post">
                <h2> ${title} </h2>
                <p> ${content} </p>
                <button>Acessar publicação</button>
            </div>
        </li>
        `)
        }
        showModalEditPost(id)

    })
}
renderizarPost()

async function showModalEditPost(id) {

    const form = document.querySelector('#formBtn')
    if(form !== null){
        form.addEventListener('click', (e)=> {
            e.preventDefault()
        })
    }
    const btnEdit = document.querySelector(`#${id}`)
    console.log(btnEdit)
    if(btnEdit !== null) {
        btnEdit.addEventListener('click', (e) => {
            e.preventDefault()
            editModal.classList.remove('hidden')
        })
    }
    const inputTitle = document.querySelector('#postEditTitle')
    const inputContent = document.querySelector('#postEditContent')
    const editModal = document.querySelector('#editPost')
    const escEdit = document.querySelector('#escEdit')
    const closeModalEdit = document.querySelector('#closeEdit')
    const saveEdit = document.querySelector('#btnSaveEdit')

    escEdit.addEventListener('click', () => {
        editModal.classList.add('hidden')

    })
    closeModalEdit.addEventListener('click', () => {
        editModal.classList.add('hidden')

    })

    saveEdit.addEventListener('click', () => {
        console.log('ok')



    })


}
renderName()
renderUser()
showModalCreatePost()
checkLogin()
