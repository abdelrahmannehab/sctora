const { roles } = require("../../middlewear/auth");

const endPoint = {
    ActorProfile : [roles.Admin , roles.Actor],
    UpdatePassword: [roles.Admin]
}

module.exports = endPoint