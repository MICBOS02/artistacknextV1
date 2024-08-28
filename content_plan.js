// Load existing content plans from localStorage or initialize with an empty array
let contentPlans = JSON.parse(localStorage.getItem('contentPlans')) || [];

// Update localStorage with current data
function updateLocalStorage() {
    localStorage.setItem('contentPlans', JSON.stringify(contentPlans));
}

// Render the list of content plans on the content plan page
function renderContentList() {
    const contentList = document.getElementById('contentList');
    contentList.innerHTML = '';

    contentPlans.forEach((plan, index) => {
        contentList.innerHTML += `<li class="list-group-item">
            <strong>Date: ${plan.date}</strong><br>
            <span>Details: ${plan.details}</span>
            <button class="btn btn-sm btn-primary float-right ml-2" onclick="editContentPlan(${index})">Edit</button>
            <button class="btn btn-sm btn-danger float-right" onclick="deleteContentPlan(${index})">Delete</button>
        </li>`;
    });
}

// Add or update content plan entry
document.getElementById('contentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const index = document.getElementById('contentIndex').value;
    const date = document.getElementById('contentDate').value;
    const details = document.getElementById('contentDetails').value;

    if (index === '') {
        contentPlans.push({ date, details });
    } else {
        contentPlans[index] = { date, details };
    }

    updateLocalStorage();
    renderContentList();
    resetForm('contentForm');
});

// Edit a content plan entry
function editContentPlan(index) {
    document.getElementById('contentIndex').value = index;
    document.getElementById('contentDate').value = contentPlans[index].date;
    document.getElementById('contentDetails').value = contentPlans[index].details;
}

// Delete a content plan entry
function deleteContentPlan(index) {
    contentPlans.splice(index, 1);
    updateLocalStorage();
    renderContentList();
}

// Reset the form
function resetForm(formId) {
    document.getElementById(formId).reset();
    document.getElementById('contentIndex').value = '';
}

// Initial render of the content list
renderContentList();
