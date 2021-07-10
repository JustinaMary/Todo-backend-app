const Users = require('../models').Users;
const Todo = require('../models').Todos;
const TodoItems = require('../models').TodoItems;

module.exports = {
    // to insert User 
    create(req, res) {
        return Users
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                orgId: req.params.orgId,              
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },
    // to list all registered users
    list(req, res) {
        return Users
            .findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
    },
    // to retrieve the users based on user Id with list of Todos and its TodoItems associated with userId parameter
    retrieve(req, res) {
        return Users
            .findById(req.params.userId,{
                include: [
                    {
                        model: Todo,
                        as: 'todo',
                        include: [
                            {
                                model: TodoItems,
                                as: 'todoItems'
                            }
                        ]
                    }
                ]
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => res.status(400).send(error));
    },
// to update the User record
    update(req, res) {
        return Users
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        firstName: req.body.firstName || user.firstName,
                        lastName: req.body.lastName || user.lastName,
                        gender: req.body.webUrl || user.gender,
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
// to delete the user
    destroy(req, res) {
        return Users
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
};
