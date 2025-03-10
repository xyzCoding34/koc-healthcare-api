import client from "./dbConnection.js";

export const createHeartRateRecord = async (userId, rate) => {
  try {
    const insertQuery = `
      INSERT INTO t_heart_rates (id, user_id, rate, create_date)
      VALUES (gen_random_uuid(), $1, $2, NOW())
      RETURNING *;
    `;

    const dbResult = await client.query(insertQuery, [userId, rate]);
    return dbResult.rows[0];
  } catch (error) {
    console.error("createHeartRateRecord hatası:", error);
    throw new Error("Veritabanına kaydedilemedi.");
  }
};

export const createOxygenLevelRecord = async (userId, rate) => {
  try {
    const insertQuery = `
      INSERT INTO t_oxygen_levels (id, user_id, level, create_date)
      VALUES (gen_random_uuid(), $1, $2, NOW())
      RETURNING *;
    `;

    const dbResult = await client.query(insertQuery, [userId, rate]);
    return dbResult.rows[0];
  } catch (error) {
    console.error("createOxygenLevelRecord hatası:", error);
    throw new Error("Veritabanına kaydedilemedi.");
  }
};

export const getUserByUsername = async (username) => {
  try {
    const result = await client.query(
      "SELECT * FROM t_users WHERE user_name = $1",
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error("getUserByUsername hatası:", error);
    throw new Error("Veritabanı hatası.");
  }
};
