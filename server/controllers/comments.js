const Comments = require('../models').Comments;

module.exports = {
    // to insert new comment
    create(req, res) {
        return Comments
            .create({
                comment: req.body.comment,
                taskId: req.params.taskId,
            })
            .then(comment => res.status(201).send(comment))
            .catch(error => res.status(400).send(error));
    },
    // to update comment
    update(req, res) {
        return Comments
            .findById(req.params.commentId)
            .then(comment => {
                if (!comment) {
                    return res.status(404).send({
                        message: 'Comment not found',
                    });
                }

                return comment
                    .update({
                        comment: req.body.comment || comment.comment,
                    })
                    .then(updateComment => res.status(200).send(updateComment))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    // to delete comments
    destroy(req, res) {
        return Comments
            .findById(req.params.commentId)
            .then(comment => {
                if (!comment) {
                    return res.status(404).send({
                        message: 'Comment Not Found',
                    });
                }

                return comment
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
