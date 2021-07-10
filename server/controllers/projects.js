const Projects = require('../models').Projects;
const ProjectAttachment = require('../models').ProjectAttachment;
const Tasks = require('../models').Tasks;

module.exports = {
    // to insert project 
    create(req, res) {
        return Projects
            .create({
                title: req.body.title,
                orgId: req.params.orgId,
                tasks: [{
                    title: req.body.taskTitle
                }]
            }, {
                include: [{
                    model: Tasks,
                    as: 'tasks'
                }]
            })
            .then((proj) => res.status(201).send(proj))
            .catch((error) => res.status(400).send(error));
    },
    // to list all created projects
    list(req, res) {
        return Projects
            .findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((proj) => res.status(200).send(proj))
            .catch((error) => res.status(400).send(error));
    },
    // to retrieve projects based on projId with projectattachment and tasks records associated with that projects
    retrieve(req, res) {
        return Projects
            .findById(req.params.projId, {
                include: [{
                    model: ProjectAttachment,
                    as: 'attachment',
                },
                {
                    model: Tasks,
                    as: 'tasks',
                }],
            })
            .then((proj) => {
                if (!proj) {
                    return res.status(404).send({
                        message: 'Project Not Found',
                    });
                }
                return res.status(200).send(proj);
            })
            .catch((error) => res.status(400).send(error));
    },
    // to update the Project
    update(req, res) {
        return Projects
            .findById(req.params.projId, {
                include: [{
                    model: ProjectAttachment,
                    as: 'attachment',
                },
                {
                    model: Tasks,
                    as: 'tasks',
                }],
            })
            .then(proj => {
                if (!proj) {
                    return res.status(404).send({
                        message: 'Project Not Found',
                    });
                }
                return proj
                    .update({
                        title: req.body.title || proj.title,
                    })
                    .then(() => res.status(200).send(proj))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    // to delete the project
    destroy(req, res) {
        return Projects
            .findById(req.params.projId)
            .then(proj => {
                if (!proj) {
                    return res.status(400).send({
                        message: 'Project Not Found',
                    });
                }
                return proj
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
