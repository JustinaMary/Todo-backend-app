const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const organizationsController = require('../controllers').organizations;
const projectsController = require('../controllers').projects;
const attachmentController = require('../controllers').projectattachment;
const usersController = require('../controllers').users;
const tasksController = require('../controllers').tasks;
const commentController = require('../controllers').comments;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos/:userId', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);

  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );

  // API endpoints for organizations
  app.post('/api/organizations', organizationsController.create);
  app.get('/api/organizations', organizationsController.list);
  app.get('/api/organizations/:orgId', organizationsController.retrieve);
  app.put('/api/organizations/:orgId', organizationsController.update);
  app.delete('/api/organizations/:orgId', organizationsController.destroy);

  // API endpoints for projects
  app.post('/api/projects/:orgId', projectsController.create);
  app.get('/api/projects', projectsController.list);
  app.get('/api/projects/:projId', projectsController.retrieve);
  app.put('/api/projects/:projId', projectsController.update);
  app.delete('/api/projects/:projId', projectsController.destroy);

  // API endpoints for project attachment
  app.post('/api/attachment/:projId/items', attachmentController.create);
  app.put('/api/attachment/:projId/items/:attachmentId', attachmentController.update);
  app.delete(
    '/api/attachment/:projId/:attachmentId', attachmentController.destroy
  );

  // API endpoints for users
  app.post('/api/users/:orgId', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:userId', usersController.retrieve);
  app.put('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);

  // API endpoints for project tasks
  app.post('/api/tasks/:projId/items', tasksController.create);
  app.get('/api/tasks/:taskId', tasksController.retrieve);
  app.put('/api/tasks/items/:taskId', tasksController.update);
  app.delete(
    '/api/tasks/:taskId', tasksController.destroy
  );


   // API endpoints for comments
   app.post('/api/comments/:taskId/items', commentController.create);
   app.put('/api/comments/items/:commentId', commentController.update);
   app.delete(
     '/api/comments/:commentId', commentController.destroy
   );

  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
