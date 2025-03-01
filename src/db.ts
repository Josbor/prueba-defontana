import * as dotenv from "dotenv";
import * as sql from "mssql";

dotenv.config();

const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER as string,
  port: parseInt(process.env.DB_PORT ?? "1433"),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  requestTimeout : 60000

};


export async function connectDB(): Promise<void> {
  try {
    await sql.connect(dbConfig);
    console.log("✅ Conexión exitosa a SQL Server");
  } catch (error) {
    console.error("❌ Error al conectar a SQL Server:", error);
  }
}
connectDB().then(() => {
    console.log("La función connectDB se ejecutó correctamente.");
}).catch((error) => {
    console.error("Error al ejecutar la función connectDB:", error);
});

export { sql };
