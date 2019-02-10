if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb+srv://utspantonia:secret123@cluster0-shard-00-01-oguaj.mongodb.net:27017/activitytracker?ssl=true"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}