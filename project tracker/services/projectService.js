let projects = require('../data/projects');


const getNextId = () => {
  const maxId = projects.reduce((max, project) => (project.id > max ? project.id : max), 0);
  return maxId + 1;
};

// GET ALL PROJECTS
const getAllProjects = () => {
  return projects;
};

// GET A SINGLE PROJECT BY ID
const getProjectById = (id) => {
  return projects.find(project => project.id === parseInt(id));
};

// ADD A NEW PROJECT
const createProject = (newProject) => {
  const projectToAdd = {
    id: getNextId(),
    ...newProject,
    status: newProject.status || "ongoing" // SET DEFAULT STATUS
  };
  projects.push(projectToAdd);
  return projectToAdd;
};

// UPDATE AN EXISTING PROJECT
const updateProject = (id, updatedProject) => {
  const index = projects.findIndex(project => project.id === parseInt(id));
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedProject };
    return projects[index];
  }
  return null; 
};

// DELETE A PROJECT
const deleteProject = (id) => {
  const index = projects.findIndex(project => project.id === parseInt(id));
  if (index !== -1) {
    const deletedProject = projects.splice(index, 1);
    return deletedProject[0];
  }
  return null; 
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};