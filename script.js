
// SMART STUDENT PORTAL

document.addEventListener("DOMContentLoaded", function () {

    // Welcome message
    console.log("Welcome to Smart Student Portal!");

    // Smooth navigation
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            console.log("Navigation:", link.textContent);
        });
    });

    // Google search function
    const searchGoogle = function (query) {
        if (query.trim() !== "") {
            window.open(
                "https://www.google.com/search?q=" +
                encodeURIComponent(query),
                "_blank"
            );
        }
    };

    // Search function available for future pages
    window.searchGoogle = searchGoogle;

});

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});


