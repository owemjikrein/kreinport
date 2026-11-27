
/* =====================================
   FLORES.IFF — COMPLETE JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       1. BUNNY INTRO SCREEN
    ===================================== */

    const introScreen = document.querySelector(".intro-screen");

    if (introScreen) {
        const introShown = sessionStorage.getItem("floresIntroShown");

        if (!introShown) {
            document.body.style.overflow = "hidden";

            setTimeout(() => {
                introScreen.classList.add("hide");
                sessionStorage.setItem("floresIntroShown", "true");

                setTimeout(() => {
                    introScreen.remove();
                    document.body.style.overflow = "";
                }, 850);

            }, 1800);

        } else {
            introScreen.remove();
        }
    }


    /* =====================================
       2. PAGE TRANSITIONS
    ===================================== */

    const pageLinks = document.querySelectorAll(
        'a[href$=".html"], a[href*=".html#"]'
    );

    pageLinks.forEach(link => {

        link.addEventListener("click", event => {

            const destination = link.getAttribute("href");

            if (
                !destination ||
                link.target === "_blank" ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.metaKey
            ) {
                return;
            }

            const url = new URL(destination, window.location.href);

            if (
                url.origin !== window.location.origin ||
                (
                    url.pathname === window.location.pathname &&
                    url.hash
                )
            ) {
                return;
            }

            event.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = url.href;
            }, 350);

        });

    });


    /* =====================================
       3. PAGE ENTRANCE ANIMATIONS
    ===================================== */

    const animatedElements = document.querySelectorAll(
        ".home-copy > *, " +
        ".home-visual, " +
        ".page-heading > *, " +
        ".motto-panel, " +
        ".personal-info-panel, " +
        ".personal-extra-panel, " +
        ".school-section, " +
        ".recognition-section, " +
        ".school-image-card, " +
        ".gallery-card, " +
        ".profile-panel, " +
        ".detail-panel, " +
        ".milestone-card, " +
        ".grad-featured-card"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {

        animatedElements.forEach((element, index) => {

            element.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(20px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 650,
                    delay: Math.min(index * 65, 650),
                    easing: "ease-out",
                    fill: "both"
                }
            );

        });

    }


    /* =====================================
       4. PROFILE PORTRAIT POP-IN
    ===================================== */

    const portraits = document.querySelectorAll(
        ".home-portrait, .profile-photo img"
    );

    portraits.forEach(portrait => {

        if (!prefersReducedMotion) {

            portrait.animate(
                [
                    {
                        opacity: 0,
                        transform: "scale(0.88)"
                    },
                    {
                        opacity: 1,
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 900,
                    easing: "cubic-bezier(.2,.8,.2,1)",
                    fill: "both"
                }
            );

        }

    });


    /* =====================================
       5. AUTOMATIC ACTIVE NAVIGATION
    ===================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    const navigationLinks = document.querySelectorAll(
        ".navbar nav a"
    );

    navigationLinks.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (!linkPage) return;

        const cleanLink = linkPage.split("#")[0];

        if (cleanLink === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    /* =====================================
       6. CARD HOVER EFFECTS
    ===================================== */

    const cards = document.querySelectorAll(
        ".gallery-card, " +
        ".detail-panel, " +
        ".personal-info-panel, " +
        ".personal-extra-panel, " +
        ".school-image-card, " +
        ".recognition-card, " +
        ".milestone-card, " +
        ".grad-featured-card"
    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("card-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("card-hover");
        });

    });


    /* =====================================
       7. IMAGE LOADING EFFECT
    ===================================== */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        if (image.complete && image.naturalWidth > 0) {
            image.classList.add("image-loaded");
        } else {

            image.addEventListener("load", () => {
                image.classList.add("image-loaded");
            });

            image.addEventListener("error", () => {
                console.warn(
                    "Image could not be loaded:",
                    image.src
                );
            });

        }

    });


    /* =====================================
       8. BUTTON CLICK EFFECT
    ===================================== */

    const buttons = document.querySelectorAll(
        ".button, .text-link"
    );

    buttons.forEach(button => {

        button.addEventListener("click", () => {
            button.classList.add("button-clicked");

            setTimeout(() => {
                button.classList.remove("button-clicked");
            }, 250);
        });

    });


    /* =====================================
       9. BACKGROUND ANIMATION SUPPORT
    ===================================== */

    const background = document.querySelector(
        ".background-glow"
    );

    if (background && !prefersReducedMotion) {
        background.classList.add("background-active");
    }


    /* =====================================
       10. CLICKABLE GRADUATION PHOTOS
           AND CERTIFICATES
    ===================================== */

    const proofCards = document.querySelectorAll(
        ".proof-trigger"
    );

    const proofModal = document.getElementById("proofModal");

    const proofModalImg =
        document.getElementById("proofModalImg") ||
        document.getElementById("proofImage");

    const proofClose = document.getElementById("proofClose");

    function closeProofModal() {

        if (!proofModal) return;

        proofModal.classList.remove("open");
        document.body.style.overflow = "";

        if (proofModalImg) {
            proofModalImg.src = "";
        }

    }

    if (proofModal && proofModalImg) {

        proofCards.forEach(card => {

            card.addEventListener("click", () => {

                const cardImage = card.querySelector("img");

                if (!cardImage) return;

                if (!cardImage.complete || cardImage.naturalWidth === 0) {
                    console.warn("Cannot open image:", cardImage.src);
                    return;
                }

                proofModalImg.src = cardImage.src;
                proofModalImg.alt = cardImage.alt || "Enlarged image";

                proofModal.classList.add("open");

                document.body.style.overflow = "hidden";

            });

        });


        /* CLOSE BUTTON */

        if (proofClose) {
            proofClose.addEventListener(
                "click",
                closeProofModal
            );
        }


        /* CLICK OUTSIDE TO CLOSE */

        proofModal.addEventListener("click", event => {

            if (event.target === proofModal) {
                closeProofModal();
            }

        });


        /* ESCAPE KEY TO CLOSE */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeProofModal();
            }

        });

    }


    /* =====================================
       11. PAGE INITIALIZATION
    ===================================== */

    document.body.classList.add("page-loaded");

    console.log(
        "FLORES.IFF portfolio loaded successfully."
    );

});
