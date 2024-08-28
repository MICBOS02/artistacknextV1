// Placeholder data storage using localStorage
let studioTimes = JSON.parse(localStorage.getItem('studioTimes')) || [];
let leads = JSON.parse(localStorage.getItem('leads')) || [];
let contentPlans = JSON.parse(localStorage.getItem('contentPlans')) || [];

// Function to update the dashboard chart with aggregated data
function updateDashboardChart() {
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    
    const studioHours = studioTimes.reduce((total, time) => total + parseFloat(time.hours), 0);
    const totalLeads = leads.length;
    const totalContentPlans = contentPlans.length;

    if (window.dashboardChart) {
        window.dashboardChart.data.datasets[0].data = [studioHours, totalLeads, totalContentPlans];
        window.dashboardChart.update();
    } else {
        window.dashboardChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Studio Hours', 'Leads', 'Content Plans'],
                datasets: [{
                    label: 'Overall Data',
                    data: [studioHours, totalLeads, totalContentPlans],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
}

// Initial render of the dashboard chart
updateDashboardChart();
