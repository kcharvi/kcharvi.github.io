/*==================== THEME SWITCH ====================*/

document.addEventListener('DOMContentLoaded', () => {
    // Function to play sound
    function playSound(sound) {
        const audio = new Audio(sound);
        audio.play();
    }

    // Check for saved theme in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        // Set default theme to light if no theme is saved
        document.body.classList.add('light-theme');
    }

    // Theme change button
    const themeButton = document.getElementById('theme-button');

    themeButton.addEventListener('click', () => {
        // Check if the current theme is light before toggling
        const isDarkTheme = document.body.classList.contains('light-theme');

        // Toggle theme
        document.body.classList.toggle('light-theme');

        // Check if the theme changed
        const themeChanged = isDarkTheme !== document.body.classList.contains('light-theme');

        // Play sound only if the theme changed due to the button click
        if (themeChanged) {
            playSound('assets/sound/switch.mp3');
        }

        // Save theme preference to local storage
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light-theme');
        } else {
            localStorage.setItem('theme', 'light-theme');
        }
    });
});

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    const skillsHeader = document.querySelectorAll('.skills__header');

    skillsHeader.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.parentNode;
            content.classList.toggle('skills__open');
            content.classList.toggle('skills__close');

            const arrow = header.querySelector('.skills__arrow');
            arrow.style.transform = content.classList.contains('skills__open') ? 'rotate(-180deg)' : 'rotate(0deg)';
        });
    });

    document.querySelectorAll('.skill__circle').forEach(circle => {
        let percentage = circle.getAttribute('data-percentage');
        let circumference = 2 * Math.PI * 24; // Calculate the circumference using the radius
        circle.querySelector('circle:last-child').style.strokeDashoffset = circumference - (circumference * percentage / 100);
    });
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
    tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("qualification__active");
        });

        target.classList.add("qualification__active");

        tabs.forEach((tab) => {
            tab.classList.remove("qualification__active");
        });
        tab.classList.add("qualification__active");
    });
});
const modalViewsQualification = document.querySelectorAll(".Qualification__modal"),
    modalBtnsQualification = document.querySelectorAll(".Qualification__button"),
    modalClosesQualification = document.querySelectorAll(".Qualification__modal-close");

let modalQualification = function (modalClick) {
    modalViewsQualification[modalClick].classList.add("qual-active-modal");
};

modalBtnsQualification.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modalQualification(i);
    });
});

modalClosesQualification.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViewsQualification.forEach((modalView) => {
            modalView.classList.remove("qual-active-modal");
        });
    });
});

/*==================== Expertise MODAL ====================*/
const modalViews = document.querySelectorAll(".Expertise__modal"),
    modalBtns = document.querySelectorAll(".Expertise__button"),
    modalCloses = document.querySelectorAll(".Expertise__modal-close");

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modal(i);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
        });
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.add("active-link");
        } else {
            document
                .querySelector(".nav__menu a[href*=" + sectionId + "]")
                .classList.remove("active-link");
        }
    });
}
window.addEventListener("scroll", scrollActive);

window.addEventListener("scroll", function () {
    const scrollUp = document.getElementById("scroll-up");
    let footer = document.getElementById("footer");
    let rect = footer.getBoundingClientRect(); // Gets the current position of the footer

    // Check if the top of the footer is visible
    if (rect.top <= window.innerHeight) {
        // If the footer is visible, change the button's color
        scrollUp.classList.add("scrollup--footer");
    } else {
        // Otherwise, remove the class
        scrollUp.classList.remove("scrollup--footer");
    }
});

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById("header");
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun");

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

// Google recaptcha
window.onload = function () {
    var el = document.getElementById("g-recaptcha-response");
    if (el) {
        el.setAttribute("required", "required");
    }
};

// validate all field in the contact form
document.getElementById("check").onclick = function () {
    let allAreFilled = true;
    document
        .getElementById("submit_form")
        .querySelectorAll("[required]")
        .forEach(function (i) {
            if (!allAreFilled) return;
            if (!i.value) {
                allAreFilled = false;
                return;
            }
        });
    if (!allAreFilled) {
        alert("Fill all the fields");
    }
};
