// STUDENT HELP PORTAL - JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    // DARK / LIGHT THEME
    const savedTheme = localStorage.getItem("portalTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
        button.addEventListener("click", function () {

            document.body.classList.toggle("dark");

            const currentTheme = document.body.classList.contains("dark")
                ? "dark"
                : "light";

            localStorage.setItem("portalTheme", currentTheme);
        });
    });

    // GOOGLE SEARCH
    const searchForms = document.querySelectorAll("[data-google-search]");

    searchForms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const input = form.querySelector("input");
            if (!input || input.value.trim() === "") {
                alert("Please enter something to search.");
                return;
            }

            const query = encodeURIComponent(input.value.trim());
            window.open(
                "https://www.google.com/search?q=" + query,
                "_blank"
            );
        });
    });

});

// GOOGLE SEARCH FUNCTION
function searchGoogle() {
    const input = document.getElementById("googleSearch");

    if (!input || input.value.trim() === "") {
        alert("Please enter something to search.");
        return;
    }

    const query = encodeURIComponent(input.value.trim());

    window.open(
        "https://www.google.com/search?q=" + query,
        "_blank"
    );
}
