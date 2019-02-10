if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb+srv://utspantonia:secret123@cluster0-oguaj.mongodb.net:27017/activitytracker?retryWrites=true&ssl=false"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}