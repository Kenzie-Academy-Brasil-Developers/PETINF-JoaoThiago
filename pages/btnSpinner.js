export function btnSpinner() {
    const spinner = document.getElementById('btnAcess')
    spinner.innerHTML = ''
    
    spinner.addEventListener('click', (evt) => {
      
      const imgSpinner = document.createElement('img')
      imgSpinner.src = '/src/home/spinner.svg'
      imgSpinner.classList.add('spinnerSplendi')
      
      spinner.append(imgSpinner)
   })
}