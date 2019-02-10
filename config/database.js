if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb://utspantonia:secret@123@activitytracker-prod-shard-00-00-0pf4a.mongodb.net:27017,activitytracker-prod-shard-00-01-0pf4a.mongodb.net:27017,activitytracker-prod-shard-00-02-0pf4a.mongodb.net:27017/test?ssl=true&replicaSet=activitytracker-prod-shard-0&authSource=admin&retryWrites=true"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}