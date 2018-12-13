const Joi = require('joi');


//Contact validation
const validate_contact_create = function (data){
    const schema = {
      firstname: Joi.string().trim().min(3).max(55).required().error(new Error("First name validation Error")),
      lastname: Joi.string().trim().min(3).max(55).required().error(new Error("Last name validation Error")),
      email: Joi.string().trim().email({ minDomainAtoms: 2 }).required().error(new Error("Email validation Error")),
      phone: Joi.number().min(6).required(),
      category: Joi.string().trim().min(10).required().error(new Error("Category validation Error"))
    } 
    return Joi.validate(data, schema)
  }

  const validate_contact_update = function (data){
    const schema = {
        id: Joi.string().trim().min(3).max(55).required().error(new Error("Developer ID validation Error")),
      firstname: Joi.string().trim().min(3).max(55).required().error(new Error("First name validation Error")),
      lastname: Joi.string().trim().min(3).max(55).required().error(new Error("Last name validation Error")),
      email: Joi.string().trim().email({ minDomainAtoms: 2 }).required().error(new Error("Email validation Error")),
      phone: Joi.number().min(6).required(),
      category: Joi.string().trim().min(10).required().error(new Error("Category validation Error"))
    } 
    return Joi.validate(data, schema)
  }

  const validate_contact_delete = function (data){
    const schema = {
      id: Joi.string().trim().min(3).max(55).required().error(new Error("Developer ID validation Error")),
       } 
    return Joi.validate(data, schema)
  }


  //Category Validation
  const validate_category_create = function (data){
    const schema = {
      name: Joi.string().trim().min(3).max(55).required().error(new Error("Category name validation Error")),
      } 
    return Joi.validate(data, schema)
  }

  const validate_category_update = function (data){
    const schema = {
      id: Joi.string().trim().min(3).max(55).required().error(new Error("Category ID validation Error")),
      name: Joi.string().trim().min(3).max(55).required().error(new Error("Category name validation Error")),
      } 
    return Joi.validate(data, schema)
  }

  const validate_category_delete = function (data){
    const schema = {
      id: Joi.string().trim().min(3).max(55).required().error(new Error("Category ID validation Error")),
         } 
    return Joi.validate(data, schema)
  }

  //Users Validation

  function validate_user_create(user){
    const schema = {
      firstname: Joi.string().trim().min(2).max(55).required().error(new Error("First name validation Error")),
      lastname: Joi.string().trim().min(2).max(55).required().error(new Error("Last name validation Error")),
      email: Joi.string().trim().email({ minDomainAtoms: 2 }).required().error(new Error("Email validation Error")),
      password: Joi.string().trim().min(5).max(50).required().error(new Error("Password validation Error")),
        } 
    return Joi.validate(user, schema)
  }

  function validate_user_login(user){
    const schema = {
      email: Joi.string().trim().email({ minDomainAtoms: 2 }).required().error(new Error("Email validation Error")),
      password: Joi.string().trim().min(5).max(50).required().error(new Error("Password validation Error"))
    } 
    return Joi.validate(user, schema)
  }


  module.exports = {
      validate_contact_create, 
      validate_contact_update, 
      validate_contact_delete,
      validate_category_create,
      validate_category_update,
      validate_category_delete,
      validate_user_create,
      validate_user_login
    };