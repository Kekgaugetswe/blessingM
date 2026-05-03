document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector("#hireSection .grid");

  try {
    const response = await fetch("data/hire.json");
    const packages = await response.json();

    grid.innerHTML = packages.map(pkg => {
      const email =
        pkg.id === 1
          ? "bookings@musiqheart.com"
          : "hire@musiqheart.com";

      const subject = `Booking Request: ${pkg.title}`;

      const body = `
Hi MusiqHeart Team,

I would like to book the "${pkg.title}" package.

Preferred Date:
Preferred Time:
Location / Venue:
Any Notes or Additional Info:

Please confirm availability and next steps.

Thank you.`.replace(/\n/g, "\r\n");

      const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      return `
        <div class="card">
          <img src="${pkg.image}" alt="${pkg.title}" />
          <div class="card-content">
            <h3>${pkg.title}</h3>
            <p>${pkg.description}</p>
            <ul>
              ${pkg.features.map(f => `<li>${f}</li>`).join("")}
            </ul>
            <h4>${pkg.price}</h4>
            <a class="cta" href="${mailto}">
              Book Now
            </a>
          </div>
        </div>
      `;
    }).join("");

  } catch (error) {
    console.error("Error loading packages:", error);
    grid.innerHTML = `<p>Unable to load packages at the moment.</p>`;
  }
});
