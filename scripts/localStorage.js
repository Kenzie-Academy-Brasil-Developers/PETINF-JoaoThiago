/* Desenvolva seu código aqui */

export function getLocalStorage() {
    const user = JSON.parse(localStorage.getItem('User')) || ""

    return user
}