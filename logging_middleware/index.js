const axios = require("axios");
require("dotenv").config();

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, packageName, message) {
    try {
        const response = await axios.post(
            LOG_API,
            {
                stack: stack,
                level: level,
                package: packageName,
                message: message
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Log created:", response.data);
    } catch (error) {
        console.error(
            "Logging failed:",
            error.response?.data || error.message
        );
    }
}

module.exports = Log;