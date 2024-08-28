// Load existing data from localStorage or initialize with test data
let leads = JSON.parse(localStorage.getItem('leads')) || [
    { name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321" }
];

// Update localStorage with current data
function updateLocalStorage() {
    localStorage.setItem('leads', JSON.stringify(leads));
}

// Render the list of leads on the leads page
function renderLeadList() {
    const leadList = document.getElementById('leadList');
    leadList.innerHTML = '';

    leads.forEach((lead, index) => {
        leadList.innerHTML += `<li class="list-group-item">
            <strong>${lead.name}</strong><br>
            <span>Email: ${lead.email}</span><br>
            <span>Phone: ${lead.phone}</span>
            <button class="btn btn-sm btn-primary float-right ml-2" onclick="editLead(${index})">Edit</button>
            <button class="btn btn-sm btn-danger float-right" onclick="deleteLead(${index})">Delete</button>
        </li>`;
    });
}

// Add or update lead entry
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const index = document.getElementById('leadIndex').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (index === '') {
        leads.push({ name, email, phone });
    } else {
        leads[index] = { name, email, phone };
    }

    updateLocalStorage();
    renderLeadList();
    resetForm('leadForm');
});

// Edit a lead entry
function editLead(index) {
    document.getElementById('leadIndex').value = index;
    document.getElementById('name').value = leads[index].name;
    document.getElementById('email').value = leads[index].email;
    document.getElementById('phone').value = leads[index].phone;
}

// Delete a lead entry
function deleteLead(index) {
    leads.splice(index, 1);
    updateLocalStorage();
    renderLeadList();
}

// Reset the form
function resetForm(formId) {
    document.getElementById(formId).reset();
    document.getElementById('leadIndex').value = '';
}

// Initial render of the lead list
renderLeadList();
