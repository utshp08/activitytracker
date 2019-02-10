if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb://utspantonia:secret123@cluster0-shard-00-00-oguaj.mongodb.net:27017,cluster0-shard-00-01-oguaj.mongodb.net:27017,cluster0-shard-00-02-oguaj.mongodb.net:27017/activitytracker?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}