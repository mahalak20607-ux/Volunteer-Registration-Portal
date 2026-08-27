/* ==========================================
   VOLUNTEERHUB - EVENTS + DASHBOARD
========================================== */


/* ==========================================
   OPPORTUNITIES DATA
========================================== */

const opportunities = [

    {
        id: "tree-plantation",
        category: "Environment",
        icon: "🌱",
        title: "Community Tree Plantation",
        date: "12 September 2026",
        location: "Chennai",
        description:
            "Help plant and care for native trees in community spaces."
    },

    {
        id: "food-drive",
        category: "Community",
        icon: "🍲",
        title: "Food Distribution Drive",
        date: "19 September 2026",
        location: "Chennai",
        description:
            "Support the preparation and distribution of meals to families in need."
    },

    {
        id: "learning-support",
        category: "Education",
        icon: "📚",
        title: "Weekend Learning Support",
        date: "26 September 2026",
        location: "Chennai",
        description:
            "Spend a few hours helping school students with basic learning."
    },

    {
        id: "community-cleanup",
        category: "Environment",
        icon: "♻️",
        title: "Community Cleanup",
        date: "03 October 2026",
        location: "Chennai",
        description:
            "Join a team to clean and improve a shared public space."
    },

    {
        id: "wellness-camp",
        category: "Community",
        icon: "❤️",
        title: "Community Wellness Camp",
        date: "10 October 2026",
        location: "Chennai",
        description:
            "Assist organizers with registration and visitor support."
    },

    {
        id: "education-drive",
        category: "Education",
        icon: "🎓",
        title: "Education Support Drive",
        date: "17 October 2026",
        location: "Chennai",
        description:
            "Help provide learning materials and educational support."
    }

];



/* ==========================================
   GET REGISTERED EVENTS
========================================== */

function getRegisteredEvents() {

    return JSON.parse(
        localStorage.getItem("registeredEvents") || "[]"
    );

}



/* ==========================================
   EVENTS PAGE
========================================== */

function displayEvents(category = "All") {

    const eventGrid =
        document.getElementById("eventGrid");


    if (!eventGrid) {
        return;
    }


    let filteredEvents = opportunities;


    if (category !== "All") {

        filteredEvents =
            opportunities.filter(function (event) {

                return event.category === category;

            });

    }


    const registeredEvents =
        getRegisteredEvents();


    eventGrid.innerHTML =
        filteredEvents.map(function (event) {

            const isRegistered =
                registeredEvents.includes(event.id);


            return `

                <article class="event-card">

                    <div class="event-top">

                        <div class="event-icon">
                            ${event.icon}
                        </div>

                    </div>


                    <div class="event-body">

                        <span class="tag">
                            ${event.category}
                        </span>

                        <h3>
                            ${event.title}
                        </h3>

                        <p>
                            ${event.description}
                        </p>

                        <div class="event-meta">

                            <span>
                                📅 ${event.date}
                            </span>

                            <span>
                                📍 ${event.location}
                            </span>

                        </div>

                    </div>


                    <button
                        class="btn primary event-register"
                        data-id="${event.id}"
                        ${isRegistered ? "disabled" : ""}>

                        ${
                            isRegistered
                                ? "Registered ✓"
                                : "Register for Event"
                        }

                    </button>

                </article>

            `;

        }).join("");


    document
        .querySelectorAll(".event-register")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    registerForEvent(
                        button.dataset.id
                    );

                }
            );

        });

}



/* ==========================================
   REGISTER FOR EVENT
========================================== */

function registerForEvent(eventId) {

    const currentVolunteer =
        JSON.parse(
            localStorage.getItem(
                "currentVolunteer"
            ) || "null"
        );


    if (!currentVolunteer) {

        alert(
            "Please login before registering for an opportunity."
        );

        window.location.href =
            "login.html";

        return;

    }


    let registeredEvents =
        getRegisteredEvents();


    if (registeredEvents.includes(eventId)) {

        alert(
            "You are already registered for this opportunity."
        );

        return;

    }


    registeredEvents.push(eventId);


    localStorage.setItem(
        "registeredEvents",
        JSON.stringify(registeredEvents)
    );


    alert(
        "Successfully registered for the opportunity!"
    );


    displayEvents();

}



/* ==========================================
   DASHBOARD
========================================== */

function loadDashboard() {

    const currentVolunteer =
        JSON.parse(
            localStorage.getItem(
                "currentVolunteer"
            ) || "null"
        );


    /* If user isn't logged in */

    if (!currentVolunteer) {

        window.location.href =
            "login.html";

        return;

    }


    const registeredEvents =
        getRegisteredEvents();


    /* Welcome name */

    const welcomeName =
        document.getElementById(
            "welcomeName"
        );


    if (welcomeName) {

        welcomeName.textContent =
            currentVolunteer.name.split(" ")[0];

    }


    /* Registered count */

    const registeredCount =
        document.getElementById(
            "registeredCount"
        );


    if (registeredCount) {

        registeredCount.textContent =
            registeredEvents.length;

    }


    /* Interest */

    const interestValue =
        document.getElementById(
            "interestValue"
        );


    if (interestValue) {

        interestValue.textContent =
            currentVolunteer.interest || "—";

    }


    /* Availability */

    const availabilityValue =
        document.getElementById(
            "availabilityValue"
        );


    if (availabilityValue) {

        availabilityValue.textContent =
            currentVolunteer.availability || "—";

    }


    /* Profile */

    setText(
        "profileName",
        currentVolunteer.name
    );


    setText(
        "profileEmail",
        currentVolunteer.email
    );


    setText(
        "profilePhone",
        currentVolunteer.phone
    );


    setText(
        "profileAge",
        currentVolunteer.age
    );


    setText(
        "profileSkills",
        currentVolunteer.skills || "Not provided"
    );


    setText(
        "profileAddress",
        currentVolunteer.address || "Not provided"
    );


    /* Avatar */

    const avatar =
        document.getElementById(
            "profileAvatar"
        );


    if (avatar) {

        avatar.textContent =
            currentVolunteer.name
                .charAt(0)
                .toUpperCase();

    }


    /* Registered events */

    displayRegisteredEvents(
        registeredEvents
    );


    /* Logout */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );

    }

}



/* ==========================================
   SET TEXT HELPER
========================================== */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}



/* ==========================================
   DISPLAY REGISTERED EVENTS
========================================== */

function displayRegisteredEvents(
    registeredEventIds
) {

    const container =
        document.getElementById(
            "registeredEvents"
        );


    if (!container) {
        return;
    }


    const registered =
        opportunities.filter(function (event) {

            return registeredEventIds.includes(
                event.id
            );

        });


    if (registered.length === 0) {

        container.innerHTML = `

            <div class="empty-events">

                <span>🌱</span>

                <p>
                    You haven't joined any
                    opportunities yet.
                </p>

                <a
                    href="events.html"
                    class="text-link">

                    Find an opportunity →

                </a>

            </div>

        `;

        return;

    }


    container.innerHTML =
        registered.map(function (event) {

            return `

                <div class="registered-event">

                    <div class="registered-event-icon">

                        ${event.icon}

                    </div>


                    <div class="registered-event-info">

                        <h3>
                            ${event.title}
                        </h3>

                        <p>
                            📅 ${event.date}
                            &nbsp; • &nbsp;
                            📍 ${event.location}
                        </p>

                    </div>

                </div>

            `;

        }).join("");

}



/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem(
        "currentVolunteer"
    );

    window.location.href =
        "index.html";

}



/* ==========================================
   PAGE INITIALIZATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* Events page */

        if (
            document.getElementById(
                "eventGrid"
            )
        ) {

            displayEvents();


            document
                .querySelectorAll(".filter")
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            document
                                .querySelectorAll(".filter")
                                .forEach(function (item) {

                                    item.classList.remove(
                                        "active-filter"
                                    );

                                });


                            button.classList.add(
                                "active-filter"
                            );


                            displayEvents(
                                button.dataset.filter
                            );

                        }
                    );

                });

        }


        /* Dashboard page */

        if (
            document.getElementById(
                "registeredEvents"
            )
        ) {

            loadDashboard();

        }

    }
);