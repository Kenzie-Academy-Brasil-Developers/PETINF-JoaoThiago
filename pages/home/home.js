import { getLocalStorage } from "../../scripts/localStorage.js";
import { createPosts, getPosts, getUser, editPost, deletePost } from '../../api.js'
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
                    <button  id='edit-${id}' class="btn_edit">Editar</button>
                    <button id='delet-${id}' class="btn_del">Excluir</button>
                </form>
            </div>
            <div class="li_post">
                <h2> ${title} </h2>
                <p> ${content} </p>
                <button id='view-${id}'>Acessar publicação</button>
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
                <button id='view-${id}'>Acessar publicação</button>
            </div>
        </li>
        `)
        }
        showModalEditPost(title, content, id)
        showModalDelete(id)
        viewPost(user, createdAt, title, content, id)
    })
}
renderizarPost()

async function showModalEditPost(title, content, id) {

    const btnEdit = document.querySelector(`#edit-${id}`)
    if (btnEdit !== null) {
        btnEdit.addEventListener('click', (e) => {
            e.preventDefault()
            editModal.classList.remove('hidden')

            const inputTitle = document.querySelector('#postEditTitle')
            const inputContent = document.querySelector('#postEditContent')
            inputTitle.innerText = title
            inputContent.innerText = content

            const saveEdit = document.querySelector('.btnSaveEdit')
            console.log(saveEdit)
            saveEdit.addEventListener('click', async (evt) => {
                evt.preventDefault()
                const body = {
                    title: inputTitle.value,
                    content: inputContent.value,
                }
                await editPost(body, id)
                window.location.reload()
            })

        })
        const editModal = document.querySelector('#editPost')
        const escEdit = document.querySelector('#escEdit')
        const closeModalEdit = document.querySelector('#closeEdit')

        escEdit.addEventListener('click', () => {
            editModal.classList.add('hidden')

        })
        closeModalEdit.addEventListener('click', () => {
            editModal.classList.add('hidden')

        })
    }
}

function showModalDelete(id) {

    const deleteModal = document.querySelector('#deletePost')
    const deleteBtn = document.querySelector(`#delet-${id}`)
    const closeModalx = document.querySelector('.delete_esc_btn')
    const closeModalCancel = document.querySelector('.delete_esc_btn_cancel')
    const yesBtn = document.querySelector('.yesBtn')

    if (deleteBtn !== null) {
        deleteBtn.addEventListener('click', (evt) => {
            evt.preventDefault()
            deleteModal.classList.remove('hidden')
            yesBtn.addEventListener('click', (evt) => {
                evt.preventDefault()
                deletePost(id)
            })
        })
        closeModalx.addEventListener('click', (evt) => {
            evt.preventDefault()
            deleteModal.classList.add('hidden')
        })
        closeModalCancel.addEventListener('click', (evt) => {
            evt.preventDefault()
            deleteModal.classList.add('hidden')
        })


    }


}
function viewPost(user, createdAt, title, content, id) {

    const modalSee = document.querySelector('#showPost')
    const modalSeeUserInfo = document.querySelector('.userInfo')
    const modalSeeUserInfoTime = document.querySelector('.userInfo_time')
    const modalSeeH2 = document.querySelector('.modal_h2')
    const modalSeeText = document.querySelector('.modal_post_text')
    const btnSee = document.getElementById(`view-${id}`)
    const btnEscape = document.querySelector('.btnEscape')
    
    if (btnSee !== null) {
        btnSee.addEventListener('click', (evt) => {
            evt.preventDefault()
            modalSee.classList.remove('hidden')
            modalSeeUserInfo.innerText = user
            modalSeeUserInfoTime.innerText = createdAt
            modalSeeH2.innerText = title
            modalSeeText.innerText = content
            btnEscape.addEventListener('click',evt=> modalSee.classList.add('hidden'))
        })
    }
}


renderName()
renderUser()
showModalCreatePost()
checkLogin()
