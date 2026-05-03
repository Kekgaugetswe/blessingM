async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const navbarEl = document.createElement("div");
  navbarEl.id = "navbar";
  document.body.prepend(navbarEl);

  const footerEl = document.createElement("div");
  footerEl.id = "footer";
  document.body.appendChild(footerEl);

  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
});