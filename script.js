function getApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

function saveApplications(apps) {
    localStorage.setItem('applications', JSON.stringify(apps));
}

function addOrUpdateApplication() {
    const apps = getApplications();
    const editIndex = localStorage.getItem('editIndex');

    const appData = {
        company: document.getElementById('company').value,
        role: document.getElementById('role').value,
        dateApplied: document.getElementById('dateApplied').value,
        status: document.getElementById('status').value
    };

    if (editIndex !== null) {
        // Update existing entry
        apps[editIndex] = appData;
        localStorage.removeItem('editIndex');
        localStorage.removeItem('editData');
    } else {
        // Add new entry
        apps.push(appData);
    }

    saveApplications(apps);
    window.location.href = 'index.html';
}

function deleteApp(index) {
    const apps = getApplications();
    apps.splice(index, 1);
    saveApplications(apps);
    window.location.reload();
}

function editApp(index) {
    const apps = getApplications();
    const app = apps[index];
    localStorage.setItem('editIndex', index);
    localStorage.setItem('editData', JSON.stringify(app));
    window.location.href = 'add.html';
}

window.addEventListener('load', () => {
    const editIndex = localStorage.getItem('editIndex');
    const editData = localStorage.getItem('editData');
    if(editIndex !== null && editData) {
        const app = JSON.parse(editData);
        document.getElementById('company').value = app.company;
        document.getElementById('role').value = app.role;
        document.getElementById('dateApplied').value = app.dateApplied;
        document.getElementById('status').value = app.status;
    }
    

    // Attach the form submission to addOrUpdateApplication
    const form = document.getElementById('appForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addOrUpdateApplication();
        });
    }
});
