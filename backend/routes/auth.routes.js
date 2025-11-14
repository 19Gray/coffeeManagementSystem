import express from "express"

const router = express.router()

router.post("/login")
router.post("/register")
router.post("/verify")
router.post("/resend-otp")
router.route("/profile").get().put()

/**
 * Admin routes for user Management
 */
router.route("/users").get(protect, admin, getUsers)

router
    .route("/users/:id")
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser)


exportdefault router