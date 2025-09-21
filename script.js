const togglePassword = document.querySelector("#togglePassword");
const passwordField = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  this.querySelector("i").classList.toggle("fa-eye");
  this.querySelector("i").classList.toggle("fa-eye-slash");
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
  const loginBtn = document.querySelector(".btn-login");

  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("rememberedEmail", email);
  } else {
    localStorage.removeItem("rememberedEmail");
  }

  if (storedUsers[email] && storedUsers[email] === password) {
    alert("Login successful! 🎉");
    window.location.href = "main.html";
  } else {
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    loginBtn.classList.remove('left', 'right');
    loginBtn.classList.add('btn-escape', direction);
    setTimeout(() => {
      loginBtn.classList.remove('btn-escape', direction);
    }, 1000);
  }
});

const rememberedEmail = localStorage.getItem("rememberedEmail");
if (rememberedEmail) {
  document.getElementById("email").value = rememberedEmail;
  document.getElementById("rememberMe").checked = true;
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const regEmail = document.getElementById("regEmail").value;
  const regPassword = document.getElementById("regPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[regEmail]) {
    alert("Account already exists. Try logging in.");
  } else {
    users[regEmail] = regPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully! 🎉 You can now log in.");
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();
  }
});

const toggleRegPassword = document.querySelector("#toggleRegPassword");
const regPasswordField = document.querySelector("#regPassword");

toggleRegPassword.addEventListener("click", function () {
  const type = regPasswordField.getAttribute("type") === "password" ? "text" : "password";
  regPasswordField.setAttribute("type", type);
  this.querySelector("i").classList.toggle("fa-eye");
  this.querySelector("i").classList.toggle("fa-eye-slash");
});

regPasswordField.addEventListener("input", function () {
  const val = this.value;
  let strength = "Weak";
  if (val.length > 8 && /[A-Z]/.test(val) && /\d/.test(val) && /[!@#$%^&*]/.test(val)) {
    strength = "Strong";
  } else if (val.length > 6 && /[A-Z]/.test(val)) {
    strength = "Moderate";
  }
  document.getElementById("strengthMsg").textContent = "Strength: " + strength;
});

document.getElementById("email").setAttribute("title", "Enter your registered email.");
document.getElementById("password").setAttribute("title", "Enter your account password.");
document.getElementById("regEmail").setAttribute("title", "Enter a valid email to register.");
document.getElementById("regPassword").setAttribute("title", "Use at least 8 characters, include uppercase and symbols.");
new bootstrap.Tooltip(document.getElementById("email"));
new bootstrap.Tooltip(document.getElementById("password"));
new bootstrap.Tooltip(document.getElementById("regEmail"));
new bootstrap.Tooltip(document.getElementById("regPassword"));

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && document.activeElement.tagName === "INPUT") {
    e.preventDefault();
    if (document.activeElement.closest("#registerModal")) {
      document.getElementById("registerForm").requestSubmit();
    } else {
      document.querySelector("form").requestSubmit();
    }
  }
});

document.getElementById("email").addEventListener("blur", function () {
  const emailValid = /^[^@]+@[^@]+\.[a-z]{2,}$/.test(this.value);
  this.classList.toggle("is-invalid", !emailValid);
  this.classList.toggle("is-valid", emailValid);
});
