// Email regex: basic validation pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex: Minimum 8 characters, at least 1 letter & 1 number
// You can extend this with special character requirement if needed
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// ✅ Validate registration fields
const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Name length
    if (name.trim().length < 3) {
        return res.status(400).json({ message: "Name must be at least 3 characters long" });
    }

    // Email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long and contain at least one letter and one number"
        });
    }

    next(); // Pass to the next middleware/controller
};

// ✅ Validate login fields
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Check empty fields
    if (!email?.trim() || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    next(); // Pass to the next middleware/controller
};

module.exports = { validateRegister, validateLogin };
