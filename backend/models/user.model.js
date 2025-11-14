import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,

        },
        password: {
            type: String,
            required: true,

        },
        role: {
            type: String,
            enum["admin", "manager", "guest"],
            default: "guest"

        },
        isVerified: {
            type: Boolean,
            default: false;

        },
    },
    {
        timestamps
    },
)
/**
 * Haash password before saving it
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified(pasword)) {
        next()
    }
    const salt = await.bcrypt.gensalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
})
/**
 * match the user entered password to the database
 */
userSchema.methods.matchPassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
}
const user = mongoose.model("User", userSchema)
export default user