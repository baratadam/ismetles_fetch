const navButtons = document.querySelectorAll(".nav-btn");
const extraInputs = document.getElementById("extra-inputs");
const getJokeBtn = document.getElementById("getJoke");
const jokeDisplay = document.getElementById("jokeDisplay");

let currentMode = "random";

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;

    extraInputs.innerHTML = "";
    if (currentMode === "id") {
      extraInputs.innerHTML = `
        <input type="number" id="jokeId" placeholder="Add meg a vicc ID-ját">
      `;
    } else if (currentMode === "type") {
      extraInputs.innerHTML = `
        <select id="jokeType">
          <option value="general">General</option>
          <option value="knock-knock">Knock-Knock</option>
          <option value="programming">Programming</option>
        </select>
      `;
    }
  });
});

getJokeBtn.addEventListener("click", async () => {
  let url = "";
  if (currentMode === "random") {
    url = "https://official-joke-api.appspot.com/jokes/random";
  } else if (currentMode === "id") {
    const id = document.getElementById("jokeId")?.value;
    if (!id) return alert("Adj meg egy ID-t!");
    url = `https://official-joke-api.appspot.com/jokes/${id}`;
  } else if (currentMode === "type") {
    const type = document.getElementById("jokeType")?.value;
    url = `https://official-joke-api.appspot.com/jokes/${type}/random`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    const joke = Array.isArray(data) ? data[0] : data;

    jokeDisplay.innerHTML = `
      <div class="joke-card">
        <p class="setup">👉 ${joke.setup}</p>
        <p class="punchline">😂 ${joke.punchline}</p>
        <p class="meta">ID: ${joke.id} | Típus: ${joke.type}</p>
      </div>
    `;
  } catch (error) {
    jokeDisplay.innerHTML = `<p class="text-red">❌ Hiba történt a vicc lekérésekor!</p>`;
  }
});
