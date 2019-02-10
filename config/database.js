if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb://activitytracker-prod-shard-00-00-0pf4a.mongodb.net:27017,activitytracker-prod-shard-00-01-0pf4a.mongodb.net:27017,activitytracker-prod-shard-00-02-0pf4a.mongodb.net:27017/test?replicaSet=activitytracker-prod-shard-0 --ssl --authenticationDatabase admin --username utspantonia --password secret123"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}