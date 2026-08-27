document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const age = document.getElementById("age").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const interestElement = document.getElementById("interest");
        const availabilityElement = document.getElementById("availability");

        const interest = interestElement
            ? interestElement.value
            : "";

        const availability = availabilityElement
            ? availabilityElement.value
            : "";

        const message = document.getElementById("registerMessage");

        /* Basic validation */

        if (!name || !email || !phone || !age || !password || !confirmPassword) {

            message.textContent = "Please fill in all required fields.";
            message.style.color = "#b33a32";

            return;
        }

        /* Email validation */

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            message.textContent = "Please enter a valid email address.";
            message.style.color = "#b33a32";

            return;
        }

        /* Password validation */

        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            message.style.color = "#b33a32";

            return;
        }

        /* Confirm password */

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.style.color = "#b33a32";

            return;
        }

        /* Get existing volunteers */

        let volunteers = JSON.parse(
            localStorage.getItem("volunteers") || "[]"
        );

        /* Check only the email */

        const existingVolunteer = volunteers.find(function (volunteer) {

            return volunteer.email === email;

        });

        if (existingVolunteer) {

            message.textContent =
                "This email is already registered. Please use another email.";

            message.style.color = "#b33a32";

            return;
        }

        /* Create new volunteer */

        const volunteer = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            age: age,

            password: password,

            interest: interest,

            availability: availability,

            skills: "",

            address: "",

            registeredAt: new Date().toLocaleString()

        };

        /* Add new volunteer */

        volunteers.push(volunteer);

        /* Save ALL volunteers */

        localStorage.setItem(
            "volunteers",
            JSON.stringify(volunteers)
        );

        /* Login the newly registered volunteer */

        localStorage.setItem(
            "currentVolunteer",
            JSON.stringify(volunteer)
        );

        /* Success */

        message.textContent =
            "Registration successful! Redirecting...";

        message.style.color = "#397155";

        /* Go to dashboard */

        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 800);

    });

});