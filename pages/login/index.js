import { login } from '../../api.js'
const btnAcess = document.querySelector('#btnAcess')

const btnRegister = document.querySelector('#indexRegister')

function loginUser() {
  const form = document.querySelector('form')
  const elements = [...form.elements]

  // console.log(elements)
  form.addEventListener('submit', async (e) => {
    e.preventDefault()


    const body = {}

    elements.forEach((elem) => {
      if (elem.tagName == 'INPUT' && elem.value !== '') {
        body[elem.id] = elem.value
      }
    })
    // console.log(body)

    await login(body)
    
  })
  // getBack()

  btnRegister.addEventListener('click', (evt) => {
    evt.preventDefault()
    window.location.replace("./pages/register/register.html")
  })
}
loginUser()
