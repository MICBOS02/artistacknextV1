// Load existing data from localStorage
let leads = JSON.parse(localStorage.getItem('leads')) || [];
let contentPlans = JSON.parse(localStorage.getItem('contentPlans')) || [];
let studioTimes = JSON.parse(localStorage.getItem('studioTimes')) || [];

// Bereken het totaal aantal leads (All-Time)
const totalLeads = leads.length;

// Bereken het aantal leads deze week
const startOfWeek = new Date();
startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Zet de datum terug naar het begin van de week (zondag)

const leadsThisWeek = leads.filter(lead => {
    const leadDate = new Date(lead.date || new Date()); // Zorg ervoor dat de lead data wordt opgeslagen als string datum
    return leadDate >= startOfWeek;
}).length;

// Render the list of leads on the dashboard
function renderDashboardLeads() {
    const dashboardLeads = document.getElementById('dashboardLeads');
    if (dashboardLeads) {
        dashboardLeads.innerHTML = '';

        leads.forEach(lead => {
            dashboardLeads.innerHTML += `<li class="list-group-item">
                <strong>${lead.name}</strong><br>
                <span>Email: ${lead.email}</span><br>
                <span>Phone: ${lead.phone}</span>
            </li>`;
        });
    }
}

// Render the list of content plans on the dashboard
function renderDashboardContentPlans() {
    const dashboardContentPlans = document.getElementById('dashboardContentPlans');
    if (dashboardContentPlans) {
        dashboardContentPlans.innerHTML = '';

        contentPlans.forEach(plan => {
            dashboardContentPlans.innerHTML += `<li class="list-group-item">
                <strong>Date: ${plan.date}</strong><br>
                <span>Details: ${plan.details}</span>
            </li>`;
        });
    }
}

// Render the list of studio times on the dashboard
function renderDashboardStudioTime() {
    const dashboardStudioTime = document.getElementById('dashboardStudioTime');
    if (dashboardStudioTime) {
        dashboardStudioTime.innerHTML = '';

        studioTimes.forEach(time => {
            dashboardStudioTime.innerHTML += `<li class="list-group-item">
                <strong>Date: ${time.date}</strong><br>
                <span>Hours: ${time.hours}</span><br>
                <span>Notes: ${time.notes}</span>
            </li>`;
        });
    }
}

// Render the studio time chart as a line chart
function renderStudioTimeChart() {
    const ctx = document.getElementById('studioTimeChart').getContext('2d');
    
    const labels = studioTimes.map(time => time.date);
    const data = studioTimes.map(time => time.hours);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Hours Spent in Studio',
                data: data,
                backgroundColor: 'rgba(18, 69, 89, 0.2)', // Kleur van de lijnvulling (doorzichtig)
                borderColor: '#124559ff', // Kleur van de lijn
                borderWidth: 2,
                fill: true, // Vul het gebied onder de lijn
                tension: 0.4 // Maak de lijn wat soepeler voor een gladde curve
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
                    display: true // Toon de legenda
                }
            }
        }
    });
}

// Render de leads grafiek
function renderLeadsChart() {
    const ctx = document.getElementById('leadsChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar', // Staafdiagram voor het totale aantal leads
        data: {
            labels: ['All-Time', 'This Week'],
            datasets: [{
                label: 'Number of Leads',
                data: [totalLeads, leadsThisWeek],
                backgroundColor: ['#124559ff', '#124559ff'], // Blauwe kleur voor beide balken
                borderColor: ['#01161eff', '#01161eff'], // Blauwe randkleur voor beide balken
                borderWidth: 1
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
                    display: true // Toon de legenda
                }
            }
        }
    });
}

// Render the content ideas as small square tiles
function renderContentIdeasOverview() {
    const contentIdeasOverview = document.getElementById('contentIdeasOverview');
    if (contentIdeasOverview) {
        contentIdeasOverview.innerHTML = '';

        contentPlans.forEach(plan => {
            // Haal de eerste drie letters van het eerste woord van het content idee
            const firstThreeLetters = plan.details.split(' ')[0].substring(0, 3).toUpperCase() + '...';
            contentIdeasOverview.innerHTML += `
                <div class="col-md-2">
                    <div class="card text-white bg-primary mb-3 text-center" style="width: 100px; height: 100px;">
                        <div class="card-body d-flex align-items-center justify-content-center">
                            <h5 class="card-title">${firstThreeLetters}</h5>
                        </div>
                    </div>
                </div>`;
        });
    }
}

// Initial render of the dashboard lists and charts
renderDashboardLeads();
renderDashboardContentPlans();
renderDashboardStudioTime();
renderStudioTimeChart(); // Render de lijngrafiek voor studio time
renderLeadsChart(); // Render de staafgrafiek voor leads
renderContentIdeasOverview(); // Render de tiles voor content ideeën
