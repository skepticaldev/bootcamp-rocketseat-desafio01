const express = require("express");

const server = express();

server.use(express.json());

let numOfReq = 0;
const projects = [];

//Midllewares

server.use((req, res, next) => {
  numOfReq++;
  console.log(`Numero de requisicoes: ${numOfReq}`);
  return next();
});

function checkProjectInArray(req, res, next) {
  const { id } = req.params;

  const project = projects.find(item => item.id === id);

  if (!project) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  return next();
}

//POST - /projects - { "id":"1", "title":"novo projeto"}
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});
//GET - /projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});
//PUT - /projects/:id
server.put("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(item => item.id === id);

  project.title = title;

  return res.json(projects);
});
//DELETE - /projects/:id
server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const index = null;

  const projectIndex = projects.findIndex(item => item.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});
//POST - /projects/:id/tasks
server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const project = projects.find(item => item.id === id);

  project.tasks.push(task);

  return res.json(project);
});

server.listen(3000);
