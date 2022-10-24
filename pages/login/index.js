import {login} from '../../api.js'

function loginUser() {
    const form = document.querySelector('form')
    const elements = [...form.elements]
    
    // console.log(elements)
    form.addEventListener('submit', async (e)=> {
        e.preventDefault()
      

        const body = {}
        
        elements.forEach((elem)=> {
          if(elem.tagName == 'INPUT' && elem.value !== ''){
            body[elem.id] = elem.value
          }
        })
        console.log(body)
     
        await login(body)
    })
}
loginUser()

function getBack (){
  const btnRegister = document.querySelector('.btn_register')
  const btnAcess = document.querySelector('.btn_acess')

  // btnAcess.addEventListener('click',(evt)=> {
  //   evt.preventDefault()

  // })
  
    btnRegister.addEventListener('click', (evt) => {
      evt.preventDefault()
      window.location.replace("./pages/register/register.html")
    })

}
getBack()

function btnSpinner() {
  const spinner = document.querySelector(".btn_acess")
  spinner.addEventListener('click', (evt) => {
    spinner.innerHTML = ''

    const imgSpinner = document.createElement('img')
    imgSpinner.src = '/src/home/spinner.svg'
    imgSpinner.classList = 'spinnerSplendi'
    
    spinner.append(imgSpinner)

  })
}
btnSpinner()
export {btnSpinner}