if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb://utspantonia:secret123@activitytracker-prod-0pf4a.mongodb.net/actvitytracker"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}