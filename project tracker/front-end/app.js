// THIS SCRIPT HANDLES ALL FRONTEND LOGIC.

document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.getElementById('project-list');
    const projectForm = document.getElementById('project-form');
    const backendUrl = 'http://localhost:3000/api/projects'; // THE BACKEND URL
  
    // FUNCTION TO FETCH PROJECTS FROM THE BACKEND API AND DISPLAY THEM
    const fetchProjects = async () => {
      try {
        const response = await fetch(backendUrl);
        const projects = await response.json();
        displayProjects(projects);
      } catch (error) {
        console.error('ERROR FETCHING PROJECTS:', error);
        projectList.innerHTML = '<P>FAILED TO LOAD PROJECTS. PLEASE CHECK THE BACKEND API.</P>';
      }
    };
  
    // FUNCTION TO DISPLAY THE PROJECTS ON THE PAGE
    const displayProjects = (projects) => {
      projectList.innerHTML = ''; // CLEAR THE EXISTING LIST
      projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        
        const statusClass = project.status === 'completed' ? 'completed' : 'ongoing';
  
        projectItem.innerHTML = `
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <p>STATUS: <span class="status ${statusClass}">${project.status.toUpperCase()}</span></p>
        `;
        projectList.appendChild(projectItem);
      });
    };
  
    // ADD AN EVENT LISTENER TO THE FORM SUBMIT
    projectForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // PREVENT THE DEFAULT FORM SUBMISSION
  
      const projectName = document.getElementById('projectName').value;
      const projectDescription = document.getElementById('projectDescription').value;
      const projectStatus = document.getElementById('projectStatus').value;
  
      const newProject = {
        name: projectName,
        description: projectDescription,
        status: projectStatus
      };
  
      try {
        await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProject),
        });
  
        projectForm.reset(); // RESET THE FORM INPUTS
        fetchProjects(); // RELOAD THE PROJECT LIST TO SHOW THE NEW PROJECT
      } catch (error) {
        console.error('ERROR CREATING PROJECT:', error);
        alert('FAILED TO ADD PROJECT. PLEASE CHECK THE BACKEND API.');
      }
    });
  
    // INITIAL LOAD OF PROJECTS WHEN THE PAGE LOADS
    fetchProjects();
  });