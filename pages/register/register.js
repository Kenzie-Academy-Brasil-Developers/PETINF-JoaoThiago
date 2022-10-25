// Desenvolva sua lógica aqui...//
import { createUser} from "../../api.js";

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
    form.addEventListener('submit', async (e)=> {
        e.preventDefault()


        const body = {
            username: form[0].value,
            email: form[1].value,
            password: form[3].value,
            avatar: form[2].value
        }
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

