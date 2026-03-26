const roles = ["ML Engineer"];
let index = 0;
let charIndex = 0;

const typing = document.getElementById("typing");

if (typing) {
    function typeEffect() {
        if (charIndex < roles[index].length) {
            typing.textContent += roles[index].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 1500);
        }
    }

    function eraseEffect() {
        if (charIndex > 0) {
            typing.textContent = roles[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            index = (index + 1) % roles.length;
            setTimeout(typeEffect, 200);
        }
    }

    typeEffect();
}

/* --- Theme Toggle Logic --- */
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

// Check local storage for theme
let currentTheme = localStorage.getItem("theme");

// Apply the theme based on local storage
if (currentTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        let theme = "dark";
        if (document.body.classList.contains("light-mode")) {
            theme = "light";
            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        } else {
            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        }
        localStorage.setItem("theme", theme);
    });
}
(function () { emailjs.init("2o0dsbfwte5zuTCx9"); })();

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        emailjs.sendForm("service_zgh6u46", "template_6xtknmz", this)
            .then(() => alert("Message sent"))
            .catch(err => alert("Error " + err.text));
    });
}

// Dynamic CV Modal Logic
document.body.addEventListener("click", function (e) {
    // Check if the clicked element is a View CV button
    const btn = e.target.closest("#viewCvBtn, .view-cv-btn, a[href='cv.html'], a.view-cv");
    if (btn) {
        e.preventDefault();

        let cvModal = document.getElementById("cvModal");

        // If the modal exists but has hardcoded content, or doesn't exist, we replace/create it
        if (!cvModal || !cvModal.dataset.dynamic) {
            if (cvModal) cvModal.remove(); // Remove hardcoded modal to avoid duplicates

            // Create modal dynamically
            cvModal = document.createElement("div");
            cvModal.id = "cvModal";
            cvModal.className = "modal";
            cvModal.dataset.dynamic = "true";
            cvModal.innerHTML = `
                <div class="modal-content" style="max-width: 800px; text-align: center;">
                    <span class="close-btn" id="closeCvModal">&times;</span>
                    <div class="modal-body" id="cvModalBody" style="padding: 20px; background: transparent;">
                        <img src="rohit.jpg" alt="Rohit Kumar CV" style="width: 100%; height: auto; border-radius: 10px; box-shadow: 0 0 20px rgba(0,247,255,0.2);">
                    </div>
                </div>
            `;
            document.body.appendChild(cvModal);

            // Event listeners for closing
            cvModal.querySelector("#closeCvModal").addEventListener("click", () => {
                cvModal.style.display = "none";
                document.body.style.overflow = "auto";
            });
            window.addEventListener("click", (evt) => {
                if (evt.target == cvModal) {
                    cvModal.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            });
        }

        cvModal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
});