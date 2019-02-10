if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb+srv://activitytracker-prod-0pf4a.mongodb.net/activitytracker"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}