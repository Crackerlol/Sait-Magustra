
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(el => el.style.display = 'none');
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
}

function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function registerUser() {
    const username = document.getElementById("reg-name").value;
    const password = document.getElementById("reg-pass").value;

    fetch("register.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert("Регистрация успешна!");
            localStorage.setItem("magistrUser", username);
            localStorage.setItem("isLoggedIn", "true");
            closeModal("registerModal");
            showGreeting();
            showSection("profile");
        } else {
            alert("Ошибка: " + data.message);
        }
    });
}

function loginUser() {
    const username = document.getElementById("login-name").value;
    const password = document.getElementById("login-pass").value;

    fetch("login.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert("Вход выполнен!");
            localStorage.setItem("magistrUser", username);
            localStorage.setItem("isLoggedIn", "true");
            closeModal("loginModal");
            showGreeting();
            showSection("profile");
        } else {
            alert("Ошибка: " + data.message);
        }
    });
}

function logoutUser() {
    localStorage.setItem("isLoggedIn", "false");
    location.reload();
}

function showGreeting() {
    const username = localStorage.getItem("magistrUser");
    const loggedIn = localStorage.getItem("isLoggedIn");
    const profileBtn = document.getElementById("profileButton");
    const profileDisplay = document.getElementById("profileDisplayName");

    if (username && loggedIn === "true") {
        if (profileBtn) profileBtn.style.display = "inline-block";
        if (profileDisplay) profileDisplay.innerText = username;
        const header = document.querySelector("header h1");
        if (header) header.innerText = "Слава Магистру, " + username + "!";
    }
}

window.onload = showGreeting;
