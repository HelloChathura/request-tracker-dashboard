// lib/db.ts
import sql from 'mssql';

const config: sql.config = {
  user: 'admin777',
  password: 'r#s65ra>',
  server: 'jkit-so-sqlserver-devtest-0.database.windows.net',
  database: 'jkit-so-sqldb-devtest-0',
  options: {
    encrypt: true,
  },
};

export async function getMonthlyRequestCount() {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`
      SELECT 
          FORMAT(CreatedDate, 'yyyy-MM') AS RequestMonth,
          COUNT(*) AS RequestCount
      FROM [jso].[SOF_T_OTE_Request]
      GROUP BY FORMAT(CreatedDate, 'yyyy-MM')
      ORDER BY RequestMonth;
    `);

    return result.recordset;
  } catch (err) {
    console.error('DB Error', err);
    throw new Error('Database query failed');
  }
}
