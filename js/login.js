document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");


    if (!loginForm) {
        return;
    }


    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        const message =
            document.getElementById("loginMessage");


        /* Get registered volunteers */

        const volunteers =
            JSON.parse(
                localStorage.getItem("volunteers") || "[]"
            );


        /* Find matching account */

        const user =
            volunteers.find(function (volunteer) {

                return (
                    volunteer.email === email &&
                    volunteer.password === password
                );

            });


        /* Invalid login */

        if (!user) {

            message.textContent =
                "Invalid email or password.";

            message.style.color =
                "#b33a32";

            return;
        }


        /* Save logged-in user */

        localStorage.setItem(
            "currentVolunteer",
            JSON.stringify(user)
        );


        /* Success message */

        message.textContent =
            "Login successful! Opening dashboard...";

        message.style.color =
            "#397155";


        /* Redirect */

        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 800);

    });

});