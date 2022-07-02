

const { validationResult } = require("express-validator")

const handelValidation = () => {
    return (req, res, next) => {
        try {
            const validationError = validationResult(req)

            if (validationError.isEmpty()) {
                next()
            } else {
                res.json({ message: "validation err", error: validationError.errors })
            }


        } catch (error) {
            res.json({ message: "server error" , error})

        }

    }
}


module.exports = handelValidation