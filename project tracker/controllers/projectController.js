// THIS CONTROLLER HANDLES THE REQUEST AND RESPONSE LOGIC.

const projectService = require('../services/projectService');

const getProjects = (req, res) => {
  const projects = projectService.getAllProjects();
  res.status(200).json(projects);
};

const getProject = (req, res) => {
  const { id } = req.params;
  const project = projectService.getProjectById(id);
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).send('PROJECT NOT FOUND');
  }
};

const createProject = (req, res) => {
  const newProject = req.body;
  if (!newProject.name || !newProject.description) {
    return res.status(400).send('NAME AND DESCRIPTION ARE REQUIRED');
  }
  const createdProject = projectService.createProject(newProject);
  res.status(201).json(createdProject);
};

const updateProject = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedProject = projectService.updateProject(id, updatedData);
  if (updatedProject) {
    res.status(200).json(updatedProject);
  } else {
    res.status(404).send('PROJECT NOT FOUND');
  }
};

const deleteProject = (req, res) => {
  const { id } = req.params;
  const deletedProject = projectService.deleteProject(id);
  if (deletedProject) {
    res.status(200).json(deletedProject);
  } else {
    res.status(404).send('PROJECT NOT FOUND');
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};