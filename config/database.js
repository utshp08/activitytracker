if (process.env.NODE_ENV === "production") {
    module.exports = {
        mongoURI : "mongodb+srv://utspantonia:secret123@cluster0-oguaj.mongodb.net/activitytracker"
    }
} else {
    module.exports = {
        mongoURI : "mongodb://localhost/activitytracker-dev"
    }
}