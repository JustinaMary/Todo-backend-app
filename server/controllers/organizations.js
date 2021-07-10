const Organizations = require('../models').Organizations;
const Projects = require('../models').Projects;
const Users = require('../models').Users;

module.exports = {
    // to insert organization 
    create(req, res) {
        return Organizations
            .create({
                name: req.body.name,
                contactNo: req.body.contactNo,
                webUrl: req.body.webUrl,
                address: req.body.address,
            })
            .then((org) => res.status(201).send(org))
            .catch((error) => res.status(400).send(error));
    },
    // to list all registered organizations
    list(req, res) {
        return Organizations
            .findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((org) => res.status(200).send(org))
            .catch((error) => res.status(400).send(error));
    },
    // to retrieve the organization based on OrgId with projects and users records associated with that organizations
    retrieve(req, res) {
        return Organizations
            .findById(req.params.orgId, {
                include: [{
                    model: Projects,
                    as: 'projects',
                },
                {
                    model: Users,
                    as: 'users',
                }],
            })
            .then((org) => {
                if (!org) {
                    return res.status(404).send({
                        message: 'Organization Not Found',
                    });
                }
                return res.status(200).send(org);
            })
            .catch((error) => res.status(400).send(error));
    },
// to update the organization
    update(req, res) {
        return Organizations
            .findById(req.params.orgId, {
                include: [{
                    model: Projects,
                    as: 'projects',
                },
                {
                    model: Users,
                    as: 'users',
                }],
            })
            .then(org => {
                if (!org) {
                    return res.status(404).send({
                        message: 'Organization Not Found',
                    });
                }
                return org
                    .update({
                        name: req.body.name || org.name,
                        contactNo: req.body.contactNo || org.contactNo,
                        webUrl: req.body.webUrl || org.webUrl,
                        address: req.body.address || org.address,
                    })
                    .then(() => res.status(200).send(org))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
// to delete the organization
    destroy(req, res) {
        return Organizations
            .findById(req.params.orgId)
            .then(org => {
                if (!org) {
                    return res.status(400).send({
                        message: 'Organization Not Found',
                    });
                }
                return org
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
