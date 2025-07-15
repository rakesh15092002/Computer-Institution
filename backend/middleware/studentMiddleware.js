import jwt from "jsonwebtoken";

const studentAuth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authorizationHeader.split(" ")[1]; // Extract the token after 'Bearer'

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        req.body.studentId = decoded_token.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { studentAuth };
