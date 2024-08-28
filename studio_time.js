// Controleer of er al data in localStorage staat, zo niet, gebruik testdata
if (!localStorage.getItem('studioTimes')) {
    const initialData = [
        { date: "2023-08-20", hours: 3, notes: "Worked on vocals" },
        { date: "2023-08-21", hours: 5, notes: "Mixing tracks" },
        { date: "2023-08-22", hours: 2, notes: "Recording guitar" },
        { date: "2023-08-23", hours: 4, notes: "Editing and mastering" },
        { date: "2023-08-24", hours: 6, notes: "Finalizing the album" }
    ];
    localStorage.setItem('studioTimes', JSON.stringify(initialData));
}

// Laad de studioTimes uit localStorage
let studioTimes = JSON.parse(localStorage.getItem('studioTimes')) || [];

// Update localStorage met de huidige data
function updateLocalStorageStudioTimes() {
    localStorage.setItem('studioTimes', JSON.stringify(studioTimes));
}

// Functie om de studio time lijst te renderen
function renderStudioTimeList() {
    const studioTimeList = document.getElementById('studioTimeList');
    if (studioTimeList) {
        studioTimeList.innerHTML = '';

        studioTimes.forEach((time, index) => {
            studioTimeList.innerHTML += `<li class="list-group-item">
                <strong>Date: ${time.date}</strong><br>
                <span>Hours: ${time.hours}</span><br>
                <span>Notes: ${time.notes}</span>
                <div class="btn-group float-right">
                    <button class="btn btn-primary btn-sm" onclick="editStudioTime(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudioTime(${index})">Delete</button>
                </div>
            </li>`;
        });
    }
}

// Functie om een studio time entry te verwijderen
function deleteStudioTime(index) {
    studioTimes.splice(index, 1); // Verwijder het item uit de array
    updateLocalStorageStudioTimes(); // Werk localStorage bij
    renderStudioTimeList(); // Render de bijgewerkte lijst
    renderStudioTimeChart(); // Werk de grafiek bij
}

// Functie om een studio time entry te bewerken
function editStudioTime(index) {
    const time = studioTimes[index];
    document.getElementById('studioTimeIndex').value = index;
    document.getElementById('date').value = time.date;
    document.getElementById('hours').value = time.hours;
    document.getElementById('notes').value = time.notes;
}

// Functie om de studio time grafiek te renderen
function renderStudioTimeChart() {
    const ctx = document.getElementById('studioTimeChart').getContext('2d');
    
    const labels = studioTimes.map(time => time.date);
    const data = studioTimes.map(time => time.hours);

    // Controleer of er al een bestaande grafiek is en vernietig deze indien nodig
    if (window.studioTimeChart) {
        window.studioTimeChart.destroy();
    }

    // Maak een nieuwe grafiek en sla deze op in een variabele zodat deze later kan worden bijgewerkt of verwijderd
    window.studioTimeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Hours Spent in Studio',
                data: data,
                backgroundColor: 'rgba(18, 69, 89, 0.2)',
                borderColor: '#124559ff',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Functie om een nieuwe of bijgewerkte studio time entry op te slaan
document.getElementById('studioTimeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const index = document.getElementById('studioTimeIndex').value;
    const date = document.getElementById('date').value;
    const hours = document.getElementById('hours').value;
    const notes = document.getElementById('notes').value;

    if (index === '') {
        // Voeg een nieuwe studio time entry toe
        studioTimes.push({ date, hours, notes });
    } else {
        // Werk een bestaande studio time entry bij
        studioTimes[index] = { date, hours, notes };
    }

    updateLocalStorageStudioTimes(); // Werk localStorage bij
    renderStudioTimeList(); // Render de bijgewerkte lijst
    renderStudioTimeChart(); // Werk de grafiek bij

    // Reset het formulier na het opslaan
    document.getElementById('studioTimeForm').reset();
    document.getElementById('studioTimeIndex').value = '';
});

// Initialiseer en render de lijsten en grafieken
renderStudioTimeList();
renderStudioTimeChart();
