module.exports = {
    mongoURI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds243041.mlab.com:43041/mydevconnector`,
    secretOrKey:"secret"
}