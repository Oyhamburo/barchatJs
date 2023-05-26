import { UserService } from "../services/index.service.js";
import { urlGame } from "../utils/index.util.js";

const start = async () => {
  const userService = new UserService();
  let response = await userService.isLogin();
  if (response) {
    window.location.assign(urlGame);
  } else {
    const form = document.getElementById("signInForm");

    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evitar envío del formulario

      // Obtener valores de los campos
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const validate = validateSignIn(email, password);

      if (validate) {
        const userService = new UserService();
        let response = await userService.signIn(email, password);
        if (response) {
          window.location.assign(urlGame);
        } else {
          alert("Usuario o contraseña incorrecta");
        }
      }
    });
  }
};

const validateSignIn = (email, password) => {
  if (!email.length || !password.length) {
    alert("Faltan campos");
    return false;
  } else {
    return true;
  }
};

start();
