import dotenv from 'dotenv'
dotenv.config();

const validateURL = (req, res, next) => {
    const APIKEY = req.get("X-API-KEY");
    if (APIKEY === process.env.APIKEY) {
        next();
    } else {
        res.status(403).send('Access Forbidden');
    }
};

export default validateURL;