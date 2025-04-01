import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "admin",
  host: "3.8.198.10",
  database: "xyzdatabase",
  password: "123321",
  port: 5432,
  keepAlive: true,
  ssl: { rejectUnauthorized: false }, // SSL kullanımı
  connectionTimeoutMillis: 5000,
});

const connectToDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL bağlantısı başarılı");
    client.release();
  } catch (err) {
    console.error("PostgreSQL bağlantı hatası:", err.message);
    setTimeout(connectToDatabase, 5000);
  }
};

connectToDatabase();

pool.on("error", (err) => {
  console.error(
    "PostgreSQL bağlantısı kesildi! Yeniden bağlanıyor...",
    err.message
  );
  setTimeout(connectToDatabase, 5000);
});

export default pool;

// backup

// import pkg from "pg";
// const { Client } = pkg;

// const client = new Client({
//   user: "admin",
//   host: "3.8.198.10",
//   database: "xyzdatabase",
//   password: "123321",
//   port: 5432,
//   keepAlive: true,
//   connectionTimeoutMillis: 5000,
// });

// const connectToDatabase = async () => {
//   try {
//     await client.connect();
//     console.log("PostgreSQL bağlantısı başarılı");
//   } catch (err) {
//     console.error("PostgreSQL bağlantı hatası:", err.message);
//     setTimeout(connectToDatabase, 5000);
//   }
// };

// connectToDatabase();

// client.on("error", (err) => {
//   console.error(
//     "PostgreSQL bağlantısı kesildi! Yeniden bağlanıyor...",
//     err.message
//   );
//   connectToDatabase();
// });

// export default client;
