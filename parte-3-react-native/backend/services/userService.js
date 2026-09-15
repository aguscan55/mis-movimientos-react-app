const db = require('../db');

const completeInvestorTest = async (userId) => {
  const [result] = await db.query(
    'UPDATE users SET has_investor_profile = TRUE WHERE id = ?',
    [userId]
  );
  return result.affectedRows > 0;
};

const getUserNavigation = async (userId) => {
  const [rows] = await db.query(
    'SELECT role, has_investor_profile FROM users WHERE id = ?', 
    [userId]
  );
  if (!rows.length) throw new Error('Usuario no encontrado');
  return { role: rows[0].role, hasInvestorProfile: !!rows[0].has_investor_profile };
};

module.exports = { completeInvestorTest, getUserNavigation };