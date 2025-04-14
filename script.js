
function showSection(id) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');
    const target = document.getElementById(id);
    if (target) {
        target.style.display = 'block';
    }
}

function toggleSecret() {
    showSection('secret');
}

function checkCode() {
    const input = document.getElementById('secret-code').value;
    const content = document.getElementById('secret-content');
    if (input == '67542') {
        content.style.display = 'block';
    } else {
        content.innerHTML = "<p>Неверный код. Доступ запрещён.</p>";
        content.style.display = 'block';
    }
}
