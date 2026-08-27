/* ==========================================
   CONTACT FORM
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const contactForm =
            document.getElementById(
                "contactForm"
            );


        if (!contactForm) {
            return;
        }


        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "contactName"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "contactEmail"
                        )
                        .value
                        .trim()
                        .toLowerCase();


                const subject =
                    document
                        .getElementById(
                            "contactSubject"
                        )
                        .value
                        .trim();


                const message =
                    document
                        .getElementById(
                            "contactMessage"
                        )
                        .value
                        .trim();


                const result =
                    document.getElementById(
                        "contactResult"
                    );


                /* Email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    result.textContent =
                        "Please fill in all fields.";

                    result.style.color =
                        "#b33a32";

                    return;
                }


                if (
                    !emailPattern.test(email)
                ) {

                    result.textContent =
                        "Please enter a valid email address.";

                    result.style.color =
                        "#b33a32";

                    return;
                }


                /* Get existing messages */

                const messages =
                    JSON.parse(
                        localStorage.getItem(
                            "contactMessages"
                        ) || "[]"
                    );


                /* Create message */

                const contactData = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    subject: subject,

                    message: message,

                    submittedAt:
                        new Date().toLocaleString()

                };


                /* Save message */

                messages.push(
                    contactData
                );


                localStorage.setItem(
                    "contactMessages",
                    JSON.stringify(
                        messages
                    )
                );


                /* Success */

                result.textContent =
                    "Thank you! Your message has been submitted successfully.";

                result.style.color =
                    "#397155";


                /* Clear form */

                contactForm.reset();

            }
        );

    }
);