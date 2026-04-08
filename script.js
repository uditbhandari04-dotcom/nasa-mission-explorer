const API_KEY = "8vWMM30B8XRZtJ1t2mNnKxt75UfA6Kb2I1XjIPlg";
 
let allData = [];
let favorites = new Set();
 
async function getImages() {
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;
 
    if (!start || !end) {
        alert("Please select both dates!");
        return;
    }
 
    document.getElementById("loading").style.display = "block";
    document.getElementById("result").innerHTML = "";
    document.getElementById("stats").style.display = "none";
 
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${start}&end_date=${end}`;
 
    try {
        const res = await fetch(url);
        const data = await res.json();
        allData = data;
        displayData(allData);
    } catch (error) {
        document.getElementById("result").innerHTML = "<p style='text-align:center;color:#888;padding:40px'>Error fetching data 😢</p>";
    }
 
    document.getElementById("loading").style.display = "none";
}
 
function displayData(data) {
    const result = document.getElementById("result");
    const stats = document.getElementById("stats");
 
    if (data.length === 0) {
        result.innerHTML = "<p style='text-align:center;color:#888;padding:40px;grid-column:1/-1'>No results found.</p>";
        stats.style.display = "none";
        return;
    }
 
    stats.style.display = "block";
    stats.textContent = `Showing ${data.length} result${data.length !== 1 ? "s" : ""}`;
 
    result.innerHTML = data.map(item => `
        <div class="card">
            <div>
                ${
                    item.media_type === "image"
                    ? `<img src="${item.url}" alt="${item.title}" loading="lazy">`
                    : `<iframe src="${item.url}" allowfullscreen title="${item.title}"></iframe>`
                }
            </div>
            <div class="card-body">
                <div class="card-date">${item.date}</div>
                <div class="card-title">${item.title}</div>
            </div>
            <div class="card-actions">
                <button class="btn-small ${favorites.has(item.title) ? 'fav-active' : ''}"
                    onclick="toggleFavorite(this, '${item.title.replace(/'/g, "\\'")}')">
                    ${favorites.has(item.title) ? "♥ Saved" : "♡ Favorite"}
                </button>
                ${item.hdurl
                    ? `<a class="btn-small" href="${item.hdurl}" target="_blank" rel="noopener">↗ HD View</a>`
                    : ""
                }
            </div>
        </div>
    `).join("");
}
 
// Search using filter() HOF
function searchData() {
    const text = document.getElementById("searchInput").value.toLowerCase();
    const option = document.getElementById("sortOption").value;
 
    let result = allData.filter(item => item.title.toLowerCase().includes(text));
    result = applySortHOF(result, option);
    displayData(result);
}
 
// Sort using sort() HOF
function sortData() {
    const text = document.getElementById("searchInput").value.toLowerCase();
    const option = document.getElementById("sortOption").value;
 
    let result = allData.filter(item => item.title.toLowerCase().includes(text));
    result = applySortHOF(result, option);
    displayData(result);
}
 
function applySortHOF(data, option) {
    const copy = [...data];
    if (option === "asc")    return copy.sort((a, b) => a.title.localeCompare(b.title));
    if (option === "desc")   return copy.sort((a, b) => b.title.localeCompare(a.title));
    if (option === "newest") return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (option === "oldest") return copy.sort((a, b) => new Date(a.date) - new Date(b.date));
    return copy;
}
 
function toggleFavorite(btn, title) {
    if (favorites.has(title)) {
        favorites.delete(title);
        btn.classList.remove("fav-active");
        btn.textContent = "♡ Favorite";
    } else {
        favorites.add(title);
        btn.classList.add("fav-active");
        btn.textContent = "♥ Saved";
    }
}