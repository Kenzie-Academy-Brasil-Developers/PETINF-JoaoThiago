// Desenvolva sua lógica aqui...//
import { createUser } from "../../api.js";
import { btnSpinner } from "../btnSpinner.js";

// const user = {
//     username: "koemenor",
//     email: "koemenor@gmail.com",
//     password: "123456",
//     avatar: "https://i.pinimg.com/originals/27/87/5d/27875d70cf52a0a643aeda13bbb7b0cd.jpg"
//   }

//   await createUser(user)


function eventRegister() {
    const form = document.querySelector('form')
    // const elements = [...form.elements]
    // console.log(form)
    // console.log(elements)
    form.addEventListener('submit', async (e) => {
        e.preventDefault()


        const body = {
            username: form[0].value,
            email: form[1].value,
            password: form[3].value,
            avatar: form[2].value
        }
        function disabled() {
        
                const registerUser = document.getElementById("username").value
                const registerEmail = document.getElementById("email").value
                const registerPhoto = document.getElementById("avatar").value
                const registerPass = document.getElementById("password").value
                // const btnCadastro = document.getElementById("btnCadastro")
                if(registerUser && registerEmail && registerPhoto && registerPass) {
                    document.querySelector("#btnCadastro").disabled = false
                    return
                }
                document.querySelector("#btnCadastro").disabled = true
        
        }
        disabled()
        console.log(body)

        // elements.forEach((elem) => {
        // if(elem.tagName == 'INPUT' && elem.value !== ''){
        //     body[elem.id] = elem.value
        // }

        // })
        await createUser(body)
    })
}
eventRegister()

function backToLoginBtn() {
    const buttonBack = document.querySelector('#buttonBack')
    const btnBack = document.querySelector('#btnBack')

    buttonBack.addEventListener('click', (evt) => {
        evt.preventDefault()
        window.location.replace('/index.html')

    })

    btnBack.addEventListener('click', (evt) => {
        evt.preventDefault()
        window.location.replace('/index.html')

    })

}
backToLoginBtn()

