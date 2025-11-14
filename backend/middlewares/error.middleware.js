const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    console.log("Error middleware caught:", err)

    /**
     * statusCode error response
     */
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
        res.status(statusCode)
    res.json({
        message: err.message
        stack: process.env.NODE_ENV === "Production" ? "" : err.stack,
    })
}