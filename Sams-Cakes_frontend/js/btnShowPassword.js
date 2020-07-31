var boton = document.getElementById('sh')
var input = document.getElementById('pass')

boton.addEventListener('click', showPassword)

function showPassword() {
    if (input.type == "password") {
        input.type = "text"
        boton.src = "../img/hide.png"
    } else {
        input.type = "password"
        boton.src = "../img/show.png"
    }
}