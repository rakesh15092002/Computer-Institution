import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    console.log("hit hua")
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: 'Not authorized as admin' });
    }
    next();
  } catch (error) {
    console.log("❌ Admin Auth Failed:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default adminAuth;
