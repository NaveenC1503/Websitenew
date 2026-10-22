
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the footer year.
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation.
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  // Project gallery filters.
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      projectCards.forEach((card) => {
        const matches =
          selectedFilter === "all" ||
          card.dataset.category === selectedFilter;

        card.hidden = !matches;
      });
    });
  });

  // Prepare the customer's enquiry in WhatsApp.
  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!enquiryForm.reportValidity()) {
        return;
      }

      const name = document.getElementById("customerName").value.trim();
      const phone = document.getElementById("customerPhone").value.trim();
      const service = document.getElementById("projectType").value;
      const location = document.getElementById("projectLocation").value.trim();
      const message = document.getElementById("projectMessage").value.trim();

      const whatsappMessage = [
        "Hello Shri Vetrivel Developers,",
        "",
        "I would like to enquire about your services.",
        "",
        "Name: " + name,
        "Contact Number: " + phone,
        "Service Required: " + service,
        "Project Location: " + (location || "Not specified"),
        "Project Details: " + (message || "Not specified"),
        "",
        "Please contact me to discuss further."
      ].join("\n");

      const whatsappURL =
        "https://wa.me/916382055634?text=" +
        encodeURIComponent(whatsappMessage);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }
});
