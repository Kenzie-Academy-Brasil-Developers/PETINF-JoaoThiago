export function btnSpinner() {
   const spinner = document.querySelector('.btn_acess')
   spinner.innerHTML = ''

      const imgSpinner = document.createElement('img')
      imgSpinner.src = '/src/home/spinner.svg'
      imgSpinner.classList.add('spinnerSplendi')

      spinner.append(imgSpinner)
}