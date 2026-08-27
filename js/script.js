/* ==========================================
   VOLUNTEERHUB - COMMON JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       MOBILE NAVIGATION
    ====================================== */

    const menuButton =
        document.querySelector(".menu-btn");

    const navigation =
        document.querySelector(".navbar nav");


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                navigation.classList.toggle(
                    "mobile-open"
                );

            }
        );


        /* Close menu after clicking a link */

        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove(
                            "mobile-open"
                        );

                    }
                );

            });

    }



    /* ======================================
       CURRENT YEAR
    ====================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(
        function (element) {

            element.textContent =
                new Date().getFullYear();

        }
    );

});