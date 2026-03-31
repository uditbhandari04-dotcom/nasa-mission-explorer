const API_KEY = "8vWMM30B8XRZtJ1t2mNnKxt75UfA6Kb2I1XjIPlg";

async function getImage() {
    document.getElementById("result").innerHTML = "";
    const date = document.getElementById("dateInput").value;
    if (!date) {
        alert("Please select a date!");
        return;
    }
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
    document.getElementById("lding").style.display = "block";
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        document.getElementById("result").innerHTML = "Error fetching data 😢";
    }
    document.getElementById("lding").style.display = "none";
}
function displayData(data) {
    const resultDiv = document.getElementById("result");
    if (data.media_type === "image") {
        resultDiv.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.url}" width="300">
            <p>${data.explanation}</p>
            <a style="color:black" href="${data.hdurl}" target="_blank">View HD Image</a>`;
    } else {
        resultDiv.innerHTML = `
            <h2>${data.title}</h2>
            <iframe src="${data.url}" width="300"></iframe>
            <p>${data.explanation}</p>`;
    }
}
