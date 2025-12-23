import dotenv from 'dotenv'
dotenv.config();

const IPWhitelistMiddleware = (req, res, next) => {
    const domain = req.get('origin');
    if (domain === process.env.FRONTEND_URL) {
        next();
    } else {
        res.status(403).send('Access Forbidden');
    }
};

export default IPWhitelistMiddleware;