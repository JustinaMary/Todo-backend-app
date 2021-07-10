const ProjectAttachment = require('../models').ProjectAttachment;

module.exports = {
    // to insert new project attachment
  create(req, res) {
    return ProjectAttachment
      .create({
        name: req.body.name,
        path: req.body.path,
        projId: req.params.projId,
      })
      .then(attachment => res.status(201).send(attachment))
      .catch(error => res.status(400).send(error));
  },
// to update project attachment
  update(req, res) {
    return ProjectAttachment
      .find({
        where: {
          id: req.params.attachmentId,
          projId: req.params.projId,
        },
      })
      .then(attachment => {
        if (!attachment) {
          return res.status(404).send({
            message: 'Attachment not found',
          });
        }

        return attachment
          .update({
            name: req.body.name || attachment.name,
            path: req.body.path || attachment.path,
          })
          .then(updateAttachment => res.status(200).send(updateAttachment))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
// to delete project attachment
  destroy(req, res) {
    return ProjectAttachment
      .find({
        where: {
          id: req.params.attachmentId,
          projId: req.params.projId,
        },
      })
      .then(attachment => {
        if (!attachment) {
          return res.status(404).send({
            message: 'Attachment Not Found',
          });
        }

        return attachment
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
