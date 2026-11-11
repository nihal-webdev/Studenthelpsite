
const STORAGE_KEY = "labPortalStudent";

/* Get saved student */
function getStudent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

/* Registration */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim().toLowerCase(),
      mobile: document.getElementById("mobile").value.trim(),
      college: document.getElementById("college").value.trim(),
      semester: document.getElementById("semester").value,
      password: document.getElementById("password").value
    };

    if (!student.name || !student.email || !student.mobile ||
        !student.college || !student.semester || !student.password) {
      alert("Please fill all fields.");
      return;
    }

    const existing = getStudent();

    if (existing && existing.email === student.email) {
      alert("This email is already registered. Please login.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(student));

    alert("Registration successful! Please login now.");
    window.location.href = "login.html";
  });
}

/* Login */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const student = getStudent();

    if (!student || student.email !== email || student.password !== password) {
      alert("Incorrect email or password. Please register first or check your details.");
      return;
    }

    sessionStorage.setItem("loggedInStudent", student.email);
    window.location.href = "dashboard.html";
  });
}

/* Dashboard login check */
if (document.body.classList.contains("dashboard-page")) {
  const student = getStudent();
  const loggedInEmail = sessionStorage.getItem("loggedInStudent");

  if (!student || !loggedInEmail || student.email !== loggedInEmail) {
    alert("Please login first.");
    window.location.href = "login.html";
  } else {
    const nameElement = document.getElementById("studentName");

    if (nameElement) {
      nameElement.textContent = student.name;
    }

    loadProfile(student);
  }
}

/* Load profile */
function loadProfile(student) {
  const fields = {
    profileName: student.name,
    profileMobile: student.mobile,
    profileCollege: student.college,
    profileSemester: student.semester
  };

  Object.entries(fields).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (field) field.value = value || "";
  });
}

/* Profile open and close */
const profileToggle = document.getElementById("profileToggle");

if (profileToggle) {
  profileToggle.addEventListener("click", function () {
    const section = document.getElementById("profileDetails");

    if (!section) return;

    section.hidden = !section.hidden;
    profileToggle.textContent = section.hidden
      ? "View Profile →"
      : "Close Profile ↑";

    if (!section.hidden) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* Save profile */
const profileForm = document.getElementById("profileForm");

if (profileForm) {
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const student = getStudent();
    if (!student) return;

    student.name = document.getElementById("profileName").value.trim();
    student.mobile = document.getElementById("profileMobile").value.trim();
    student.college = document.getElementById("profileCollege").value.trim();
    student.semester = document.getElementById("profileSemester").value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(student));

    const nameElement = document.getElementById("studentName");
    if (nameElement) nameElement.textContent = student.name;

    alert("Profile saved successfully!");
  });
}

/* Google Search */
const googleSearchForm = document.getElementById("googleSearchForm");

if (googleSearchForm) {
  googleSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = document.getElementById("googleQuery").value.trim();

    if (query) {
      window.open(
        "https://www.google.com/search?q=" + encodeURIComponent(query),
        "_blank",
        "noopener"
      );
    }
  });
}

/* Dark and light theme */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    themeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light"
      : "🌙 Theme";
  });
}

/* Logout */
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("loggedInStudent");
    window.location.href = "login.html";
  });
}
