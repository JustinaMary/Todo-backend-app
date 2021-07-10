const Tasks = require('../models').Tasks;
const Comments = require('../models').Comments;

module.exports = {
    // to insert new project task
    create(req, res) {
        return Tasks
            .create({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                assignedTo: req.body.assignedTo,
                projId: req.params.projId,
            })
            .then(tasks => res.status(201).send(tasks))
            .catch(error => res.status(400).send(error));
    },

    // to retrieve tasks based on taskId with comments associated with that tasks
    retrieve(req, res) {
        return Tasks
            .findById(req.params.taskId, {
                include: [{
                    model: Comments,
                    as: 'comments',
                }],
            })
            .then((task) => {
                if (!task) {
                    return res.status(404).send({
                        message: 'Task Not Found',
                    });
                }
                return res.status(200).send(task);
            })
            .catch((error) => res.status(400).send(error));
    },

    // to update project task
    update(req, res) {
        return Tasks
            .findById(req.params.taskId)
            .then(tasks => {
                if (!tasks) {
                    return res.status(404).send({
                        message: 'Task not found',
                    });
                }

                return tasks
                    .update({
                        title: req.body.title || tasks.title,
                        description: req.body.description || tasks.description,
                        status: req.body.status || tasks.status,
                        assignedTo: req.body.assignedTo || tasks.assignedTo
                    })
                    .then(updateTasks => res.status(200).send(updateTasks))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    // to delete project tasks
    destroy(req, res) {
        return Tasks
            .findById(req.params.taskId)
            .then(tasks => {
                if (!tasks) {
                    return res.status(404).send({
                        message: 'Task Not Found',
                    });
                }
                return tasks
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
