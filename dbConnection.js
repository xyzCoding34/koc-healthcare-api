import pkg from "pg"; // 'pg' modülünü default olarak import et
const { Client } = pkg; // Client'ı içeri aktarıyoruz

const client = new Client({
  user: "admin",
  host: "3.8.198.10",
  database: "xyzdatabase",
  password: "123321",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("PostgreSQL bağlantısı başarılı"))
  .catch((err) => console.error("PostgreSQL bağlantı hatası:", err.stack));

export default client; // client'ı export et
