const userService = require('../services/userService');

const getNavigationConfig = async (req, res) => {
  try {
    const config = await userService.getUserNavigation(req.user.id);
    res.json(config);
  } catch (error) {
    console.error('Error en getNavigationConfig:', error);
    res.status(500).json({ error: error.message });
  }
};

const submitInvestorTest = async (req, res) => {
  try {
    await userService.completeInvestorTest(req.user.id);
    res.json({ message: 'Perfil de inversor completado', hasInvestorProfile: true });
  } catch (error) {
    console.error('Error en submitInvestorTest:', error);
    res.status(500).json({ error: 'Error al actualizar perfil', details: error.message });
  }
};

module.exports = { getNavigationConfig, submitInvestorTest };