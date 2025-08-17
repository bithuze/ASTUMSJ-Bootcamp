// THIS CONTROLLER HANDLES THE REQUEST AND RESPONSE LOGIC.

const projectService = require('../services/projectService');

const getProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'ERROR GETTING PROJECTS', error: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).send('PROJECT NOT FOUND');
    }
  } catch (error) {
    res.status(500).json({ message: 'ERROR GETTING PROJECT', error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = req.body;
    if (!newProject.name || !newProject.description) {
      return res.status(400).send('NAME AND DESCRIPTION ARE REQUIRED');
    }
    const createdProject = await projectService.createProject(newProject);
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: 'ERROR CREATING PROJECT', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log('CONTROLLER RECEIVED UPDATE REQUEST FOR ID:', id);
    console.log('CONTROLLER RECEIVED UPDATE DATA:', updatedData);
    const updatedProject = await projectService.updateProject(id, updatedData);
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).send('PROJECT NOT FOUND');
    }
  } catch (error) {
    res.status(500).json({ message: 'ERROR UPDATING PROJECT', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('CONTROLLER RECEIVED DELETE REQUEST FOR ID:', id);
    const deletedProject = await projectService.deleteProject(id);
    if (deletedProject) {
      res.status(200).json(deletedProject);
    } else {
      res.status(404).send('PROJECT NOT FOUND');
    }
  } catch (error) {
    res.status(500).json({ message: 'ERROR DELETING PROJECT', error: error.message });
  }
};


module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
