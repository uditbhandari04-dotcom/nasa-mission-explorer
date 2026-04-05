const API_KEY = "8vWMM30B8XRZtJ1t2mNnKxt75UfA6Kb2I1XjIPlg";


let allData = [];

async function getImages() {
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    if (!start || !end) {
        alert("Please select both dates!");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("result").innerHTML = "";

    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${start}&end_date=${end}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        allData = data;
        displayData(allData);

    } catch (error) {
        document.getElementById("result").innerHTML = "Error fetching data 😢";
    }

    document.getElementById("loading").style.display = "none";
}
function displayData(data) {
    const result = document.getElementById("result");

    result.innerHTML = data.map(item => `
        <div class="card">
            <h3>${item.title}</h3>
            ${
                item.media_type === "image"
                ? `<img src="${item.url}">`
                : `<iframe src="${item.url}" width="100%"></iframe>`
            }
            <p><b>Date:</b> ${item.date}</p>
            <button onclick="addFavorite('${item.title}')">❤️ Favorite</button>
        </div>
    `).join("");
}

// Search using filter()
function searchData() {
    const text = document.getElementById("searchInput").value.toLowerCase();

    const filtered = allData.filter(item =>
        item.title.toLowerCase().includes(text)
    );

    displayData(filtered);
}

function sortData() {
    const option = document.getElementById("sortOption").value;

    let sorted = [...allData];

    if (option === "asc") {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "desc") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayData(sorted);
}

function addFavorite(title) {
    alert(title + " added to favorites ⭐");
}