const button = document.getElementById('button');
const queryType = document.getElementById('queryType');
const inputValue = document.getElementById('inputValue');
const output = document.getElementById('output');

const API_BASE = 'https://official-joke-api.appspot.com/jokes';

button.addEventListener('click', () => {
  const type = queryType.value;
  const value = inputValue.value.trim();

  let url = '';

  switch (type) {
    case 'random':
      url = `${API_BASE}/random`;
      break;
    case 'id':
      if (!value) return alert('Adj meg egy ID-t!');
      url = `${API_BASE}/${value}`;
      break;
    case 'type':
      if (!value) return alert('Adj meg egy típust!');
      url = `${API_BASE}/${value}`;
      break;
  }

  fetchData(url);
});

async function fetchData(url) {
  output.innerHTML = '🔄 Betöltés...';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Hiba a lekérés során');
    const data = await response.json();
    displayData(data);
  } catch (error) {
    output.innerHTML = `<p style="color:red;">❌ Hiba: ${error.message}</p>`;
  }
}

function displayData(data) {
  output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
