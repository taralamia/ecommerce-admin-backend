import app from "./app";
import { env } from "./config/env.config";
import { AppDataSource } from "./database/data-source";

const startServer = async () => {
    try {
        await AppDataSource.initialize();

        console.log("✅ Database connected successfully.");

        app.listen(env.PORT, () => {
            console.log(`🚀 Server is running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to the database.");
        console.error(error);

        process.exit(1);
    }
};

startServer();