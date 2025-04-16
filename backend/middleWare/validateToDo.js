const { Validator } = require('node-input-validator');

const validateTodo = async (req, res, next) => {
  const v = new Validator(req.body, {
    taskName: 'required|string',
    taskText: 'required|string',
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).json({
      success: false,
      errors: v.errors,
    });
  }

  next(); // All good!
};

module.exports = validateTodo;
