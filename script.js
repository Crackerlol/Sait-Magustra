function showSection(id) {
    document.querySelectorAll('.content-section').forEach(el => el.style.display = 'none');
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
}

function toggleSecret() {
    showSection('secret');
}

function checkSecretCode() {
    const input = document.getElementById('secret-code').value;
    const hash = btoa(input);
    const allowed = "Njc1NDI=";
    const content = document.getElementById('secret-content');
    if (hash === allowed) {
        content.style.display = 'block';
    } else {
        content.innerHTML = "<p>Неверный код. Доступ запрещён.</p>";
        content.style.display = 'block';
    }
}

function openModal(id) {
    document.getElementById(id).style.display = "block";
}
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function registerUser() {
    const name = document.getElementById("reg-name").value;
    const pass = document.getElementById("reg-pass").value;
    if (name && pass) {
        localStorage.setItem("magistrUser", name);
        localStorage.setItem("magistrPass", btoa(pass));
		localStorage.setItem("isLoggedIn", "true");
        document.cookie = "user=" + name;
        alert("Регистрация успешна!");
        closeModal("registerModal");
        showGreeting();
        showSection('profile');
    }
}

function loginUser() {
    const name = document.getElementById("login-name").value;
    const pass = document.getElementById("login-pass").value;
    const storedPass = localStorage.getItem("magistrPass");
    if (name && pass && storedPass === btoa(pass)) {
        localStorage.setItem("magistrUser", name);
		localStorage.setItem("isLoggedIn", "true");
        document.cookie = "user=" + name;
        alert("Вход выполнен!");
        closeModal("loginModal");
        showGreeting();
        showSection('profile');
    } else {
        alert("Неверный логин или пароль!");
    }
}

function showGreeting() {
    const name = localStorage.getItem("magistrUser");
    const loggedIn = localStorage.getItem("isLoggedIn");

    const profileBtn = document.getElementById("profileButton");
    const profileDisplay = document.getElementById("profileDisplayName");

    if (name && loggedIn === "true") {
        if (profileBtn) profileBtn.style.display = "inline-block";
        if (profileDisplay) profileDisplay.innerText = name;
        const header = document.querySelector("header h1");
        if (header) header.innerHTML = "Слава Магистру, " + name + "!";
    }
}

function logoutUser() {
    localStorage.setItem("isLoggedIn", "false");
    alert("Вы вышли из профиля.");
    location.reload();
}
window.onload = showGreeting;