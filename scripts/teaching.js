document.addEventListener("DOMContentLoaded", () => {
  fetch("data/teaching.json")
    .then(res => res.json())
    .then(renderLessons)
    .catch(err => console.error("Error loading lessons:", err));
});

function renderLessons(lessons) {
  const container = document.querySelector(".grid");
  container.innerHTML = "";

  lessons.forEach(lesson => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${lesson.thumbnail}" alt="${lesson.title}">
      <h3>${lesson.title}</h3>
      <p>${lesson.description}</p>
      <p><strong>Level:</strong> ${lesson.level}</p>
      ${lesson.videoUrl
        ? `<div class="video-wrapper">
             <iframe src="${lesson.videoUrl}"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowfullscreen>
             </iframe>
           </div>`
        : ""}
    `;
    container.appendChild(card);
  });
}