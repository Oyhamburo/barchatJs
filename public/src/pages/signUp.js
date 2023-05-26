import { UserService } from "../services/index.service.js";
import { urlGame, urlSignIn } from "../utils/index.util.js";

const start = async () => {
  const userService = new UserService();
  let response = await userService.isLogin();
  if (response) {
    window.location.assign(urlGame);
  } else {
    const form = document.getElementById("signUpForm");

    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evitar envío del formulario

      // Obtener valores de los campos
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const validate = validateSignUp(email, password, username);

      if (validate) {
        const userService = new UserService();
        let response = await userService.signUp(email, username, password);
        if (response) {
          window.location.assign(urlSignIn);
        } else {
          alert("Usuario o contraseña incorrecta");
        }
      }
    });
  }
};

const validateSignUp = (email, password, username) => {
  if (!email.length || !password.length || !username.length) {
    alert("Faltan campos");
    return false;
  } else {
    return true;
  }
};

start();
