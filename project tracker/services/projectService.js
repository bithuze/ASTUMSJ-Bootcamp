// THIS SERVICE HANDLES ALL THE MONGODB DATA LOGIC.

const Project = require('../models/project');

// GET ALL PROJECTS
const getAllProjects = async () => {
  return await Project.find();
};

// GET A SINGLE PROJECT BY ID
const getProjectById = async (id) => {
  return await Project.findById(id);
};

// ADD A NEW PROJECT
const createProject = async (newProject) => {
  const project = new Project(newProject);
  return await project.save();
};

// UPDATE AN EXISTING PROJECT
const updateProject = async (id, updatedProject) => {
  return await Project.findByIdAndUpdate(id, updatedProject, { new: true });
  // {new: true} RETURNS THE UPDATED DOCUMENT INSTEAD OF THE ORIGINAL ONE.
};

// DELETE A PROJECT
const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
