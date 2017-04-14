const logging = require('../../../../modules/console')

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const redis = require('../../../../modules/redis')
const db = require('../../../../modules/database/driver')
const models = db.get()

const crypto = require('crypto')

// Schemas
const schemas = require("./schema")

// Classes
class TokenResponse {
  constructor(success, token, error) {
    this.success = success
    this.token = token
    this.error = error
  }
}
module.exports = function(req, res, next) {
  // Resolvers
  const root = {
    login: function(params) {
      return models.User.findOne({ 'config.email': params.user }).then(function(userDocument) {
        if (userDocument) {
          var challenge = crypto.pbkdf2(params.pass, userDocument.auth.salt, userDocument.auth.iterations, 512, 'sha512', (err, key) => {return key.toString('hex')})
          
          if (challenge === userDocument.auth.pass) {
             return redis.getAsync(userDocument.id).then(function(res) {
              logging.info(res)
              if (!res) {
                var token = crypto.randomBytes(128).toString("hex");
                redis.set(userDocument.id, token)
                redis.expire(userDocument.id, 43200) // TODO, token refresh system ey
                
                return new TokenResponse(1, token, null)
                
              } else {
                return new TokenResponse(1, res, null)
              }
            })
          } else {
            return new TokenResponse(0, null, "Email and password to not match.")
          }
          
        } else {
          return new TokenResponse(0, null, "Email and password do not match.")
        }
        
      }).catch(function(err) {
        logging.err("Mongoose error while handling api endpoint!",{err:err,endpoint:"auth",method:"GET"})
      })
    }
  }
  if (schemas[req.method]) {
    if (schemas[req.method][req.params.p]) {
       graphqlHTTP({
        schema: schemas[req.method][req.params.p],
        rootValue: root,
        graphiql: false
      })(req, res, next)
    } else {
      res.status(404).send(`Endpoint ${req.params.p || "/"} not found for method ${req.method}`)
    }
  } else {
    res.status(405).send("Method not supported")
  }
}