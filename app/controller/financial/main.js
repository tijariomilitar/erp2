const userController = require('./../user');
const lib = require('jarmlib');

const Income = require('../../model/financial/income');
const Outcome = require('../../model/financial/outcome');

const financialController = {
	index: async (req, res) => {
		if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
			return res.redirect('/');
		};

		const incomeCategories = await Income.category.list();
		const outcomeCategories = await Outcome.category.list();

		res.render('financial/index', { user: req.user, incomeCategories, outcomeCategories });
	}
	// balance: async (req, res) => {
	// 	if(!await userController.verifyAccess(req, res, ['adm', 'fin'])){
	// 		return res.send({ unauthorized: "Você não tem permissão para acessar!" });
	// 	};

	// 	let period = { key: "", start: req.body.balance.periodStart, end: req.body.balance.periodEnd };
	// 	let params = { keys: [], values: [] };
	// 	let strict_params = { keys: [], values: [] };

	// 	// lib.insertParam("status", req.body.outcome.status, strict_params, strict_values);

	// 	try {
	// 		const incomeValue = await Income.incomeSum(period, params, values, strict_params, strict_values);
	// 		const outcomeValue = await Outcome.outcomeSum(period, params, values, strict_params, strict_values);

	// 		res.send({ incomeValue, outcomeValue });
	// 	} catch (err) {
	// 		console.log(err);
	// 		res.send({ msg: "Ocorreu um erro ao filtrar os registros, favor contatar o suporte" });
	// 	};
	// }
};

module.exports = financialController;