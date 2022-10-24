import { getLocalStorage } from "../../scripts/localStorage.js";

function renderName (){
    const user = getLocalStorage()
    console.log(user)

    const p = document.querySelector('#UserName')

    p.innerText = user.username
}
renderName()

