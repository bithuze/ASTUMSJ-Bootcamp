// THIS SCRIPT HANDLES ALL FRONTEND LOGIC.

document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.getElementById('project-list');
  const projectForm = document.getElementById('project-form');
  const projectIdInput = document.getElementById('projectId');
  const projectNameInput = document.getElementById('projectName');
  const projectDescriptionInput = document.getElementById('projectDescription');
  const projectStatusInput = document.getElementById('projectStatus');
  const submitBtn = document.getElementById('submitBtn');
  const messageArea = document.getElementById('message');
  
  const backendUrl = 'http://localhost:3000/api/projects'; // THE BACKEND URL

  // HELPER FUNCTION TO DISPLAY USER MESSAGES
  const showMessage = (text, type = 'success') => {
    messageArea.textContent = text;
    messageArea.className = `message ${type}`;
    setTimeout(() => {
      messageArea.textContent = '';
      messageArea.className = 'message';
    }, 3000);
  };

  // FUNCTION TO FETCH PROJECTS FROM THE BACKEND API AND DISPLAY THEM
  const fetchProjects = async () => {
    try {
      const response = await fetch(backendUrl);
      const projects = await response.json();
      displayProjects(projects);
    } catch (error) {
      console.error('ERROR FETCHING PROJECTS:', error);
      projectList.innerHTML = '<P>FAILED TO LOAD PROJECTS. PLEASE CHECK THE BACKEND API.</P>';
      showMessage('FAILED TO LOAD PROJECTS.', 'error');
    }
  };

  // FUNCTION TO DISPLAY THE PROJECTS ON THE PAGE
  const displayProjects = (projects) => {
    projectList.innerHTML = ''; // CLEAR THE EXISTING LIST
    if (projects.length === 0) {
      projectList.innerHTML = '<P>NO PROJECTS TO DISPLAY.</P>';
      return;
    }

    projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.classList.add('project-item');
      
      const statusClass = project.status === 'completed' ? 'completed' : 'ongoing';

      projectItem.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <p>STATUS: <span class="status ${statusClass}">${project.status.toUpperCase()}</span></p>
        <div class="actions">
          <button class="update-btn" data-id="${project._id}">UPDATE</button>
          <button class="delete-btn" data-id="${project._id}">DELETE</button>
        </div>
      `;
      projectList.appendChild(projectItem);
    });
  };

  // HANDLE FORM SUBMISSION (ADD OR UPDATE)
  projectForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // PREVENT THE DEFAULT FORM SUBMISSION

    const id = projectIdInput.value;
    const name = projectNameInput.value;
    const description = projectDescriptionInput.value;
    const status = projectStatusInput.value;

    const projectData = { name, description, status };
    
    try {
      if (id) {
        // UPDATE EXISTING PROJECT
        await fetch(`${backendUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
        showMessage('PROJECT UPDATED SUCCESSFULLY!');
      } else {
        // ADD NEW PROJECT
        await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
        showMessage('PROJECT ADDED SUCCESSFULLY!');
      }

      projectForm.reset(); // RESET THE FORM INPUTS
      projectIdInput.value = ''; // CLEAR THE HIDDEN ID
      submitBtn.textContent = 'ADD PROJECT'; // RESET THE BUTTON TEXT
      fetchProjects(); // RELOAD THE PROJECT LIST
    } catch (error) {
      console.error('ERROR SUBMITTING PROJECT:', error);
      showMessage('FAILED TO SUBMIT PROJECT.', 'error');
    }
  });

  // ADD EVENT LISTENER FOR UPDATE AND DELETE BUTTONS
  projectList.addEventListener('click', async (event) => {
    const target = event.target;
    const id = target.dataset.id;

    if (target.classList.contains('delete-btn')) {
      // HANDLE DELETE ACTION
      if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS PROJECT?')) {
        try {
          await fetch(`${backendUrl}/${id}`, {
            method: 'DELETE',
          });
          showMessage('PROJECT DELETED SUCCESSFULLY!');
          fetchProjects(); // RELOAD THE PROJECT LIST
        } catch (error) {
          console.error('ERROR DELETING PROJECT:', error);
          showMessage('FAILED TO DELETE PROJECT.', 'error');
        }
      }
    } else if (target.classList.contains('update-btn')) {
      // HANDLE UPDATE ACTION
      try {
        const response = await fetch(`${backendUrl}/${id}`);
        const projectToUpdate = await response.json();
        
        // POPULATE THE FORM WITH THE PROJECT'S DATA
        projectIdInput.value = projectToUpdate._id;
        projectNameInput.value = projectToUpdate.name;
        projectDescriptionInput.value = projectToUpdate.description;
        projectStatusInput.value = projectToUpdate.status;

        // CHANGE THE BUTTON TEXT
        submitBtn.textContent = 'UPDATE PROJECT';
        
        window.scrollTo({ top: 0, behavior: 'smooth' }); // SCROLL TO THE FORM
      } catch (error) {
        console.error('ERROR FETCHING PROJECT FOR UPDATE:', error);
        showMessage('FAILED TO LOAD PROJECT FOR UPDATE.', 'error');
      }
    }
  });

  // INITIAL LOAD OF PROJECTS WHEN THE PAGE LOADS
  fetchProjects();
});
