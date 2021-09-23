Outcome.origin.controller = {};

Outcome.origin.controller.create = document.getElementById("outcome-origin-create-form");
if(Outcome.origin.controller.create){
	Outcome.origin.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let origin = {
			id: event.target.elements.namedItem("id").value,
			category_id: event.target.elements.namedItem("category-id").value,
			name: event.target.elements.namedItem("name").value
		};

		let response = await API.response(Outcome.origin.save, origin);
		if(!response){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("name").value = "";
		Outcome.origin.controller.filter.submit.click();
	});
}

Outcome.origin.controller.filter = document.getElementById("outcome-origin-filter-form");
if(Outcome.origin.controller.filter){
	Outcome.origin.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let origin = {
			category_id: event.target.elements.namedItem("category-id").value,
			name: event.target.elements.namedItem("name").value
		};

		let origins = await API.response(Outcome.origin.filter, origin);
		if(!origins){ return false };

		document.getElementById("outcome-origin-filter-div").style.display = "";
		document.getElementById("outcome-origin-filter-box").children.namedItem("carousel-navigation").style.display = "";
		
		document.getElementById("outcome-origin-show-box").style.display = "none";
		document.getElementById("origin-payment-show-box").style.display = "none";

		const pagination = { pageSize: 9, page: 0};
		(function(){ lib.carousel.execute("outcome-origin-filter-box", Outcome.origin.view.filter, origins, pagination); }());
	});
}

Outcome.origin.controller.show = async (id) => {
	let origin = await API.response(Outcome.origin.findById, id);
	if(!origin){ return false };

	document.getElementById("outcome-origin-filter-div").style.display = "none";
	document.getElementById("outcome-origin-filter-box").children.namedItem("carousel-navigation").style.display = "none";

	document.getElementById("origin-payment-show-box").style.display = "none";

	document.getElementById("origin-payment-create-form").elements.namedItem("origin-id").value = origin.id;
	document.getElementById("origin-payment-filter-form").elements.namedItem("origin-id").value = origin.id;

	Outcome.origin.payment.controller.filter.submit.click();

	Outcome.origin.view.show(origin);
};

Outcome.origin.controller.edit = async (id) => {
	let origin = await API.response(Outcome.origin.findById, id);
	if(!origin){ return false };

	document.getElementById("outcome-origin-create-form").elements.namedItem("id").value = origin.id;
	document.getElementById("outcome-origin-create-form").elements.namedItem("category-id").value = origin.category_id;
	document.getElementById("outcome-origin-create-form").elements.namedItem("name").value = origin.name;
};

Outcome.origin.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir a origem?');
	if(r){
		if(!await API.response(Outcome.origin.delete, id)){ return false };
		
		Outcome.origin.controller.filter.submit.click();
	};
};

Outcome.origin.payment.controller = {};

Outcome.origin.payment.controller.create = document.getElementById("origin-payment-create-form");
if(Outcome.origin.payment.controller.create){
	Outcome.origin.payment.controller.create.addEventListener("submit", async event => {
		event.preventDefault();

		let payment = {
			id: event.target.elements.namedItem("id").value,
			origin_id: event.target.elements.namedItem("origin-id").value,
			method: event.target.elements.namedItem("payment-method").value
		};

		if(payment.method == "Pix"){
			payment.pix_receiver = event.target.elements.namedItem("pix-receiver").value;
			payment.pix_key = lib.removeChar(event.target.elements.namedItem("pix-key").value, ['/\./g','/\ /g']);
		} else if(payment.method == "Transferência bancária"){
			payment.transfer_receiver = event.target.elements.namedItem("transfer-receiver").value;
			payment.transfer_register = event.target.elements.namedItem("transfer-register").value;
			payment.transfer_bank = event.target.elements.namedItem("transfer-bank").value;
			payment.transfer_agency = event.target.elements.namedItem("transfer-agency").value;
			payment.transfer_account = event.target.elements.namedItem("transfer-account").value;
			payment.transfer_account_type = event.target.elements.namedItem("transfer-account-type").value;
		}

		let response = await API.response(Outcome.origin.payment.save, payment);
		if(!response){ return false };

		event.target.elements.namedItem("id").value = "";
		event.target.elements.namedItem("pix-receiver").value = "";
		event.target.elements.namedItem("pix-key").value = "";
		event.target.elements.namedItem("transfer-receiver").value = "";
		event.target.elements.namedItem("transfer-register").value = "";
		event.target.elements.namedItem("transfer-bank").value = "";
		event.target.elements.namedItem("transfer-agency").value = "";
		event.target.elements.namedItem("transfer-account").value = "";
		event.target.elements.namedItem("transfer-account-type").value = "";
		Outcome.origin.payment.controller.filter.submit.click();
	});
}

Outcome.origin.payment.controller.filter = document.getElementById("origin-payment-filter-form");
if(Outcome.origin.payment.controller.filter){
	Outcome.origin.payment.controller.filter.addEventListener("submit", async event => {
		event.preventDefault();

		let payment = {
			origin_id: event.target.elements.namedItem("origin-id").value
		};

		let payments = await API.response(Outcome.origin.payment.filter, payment);
		if(!payments){ return false };

		const pagination = { pageSize: 9, page: 0};
		(function(){ lib.carousel.execute("origin-payment-filter-box", Outcome.origin.payment.view.filter, payments, pagination); }());
	});
}

Outcome.origin.payment.controller.show = async (id) => {
	let payment = await API.response(Outcome.origin.payment.findById, id);
	if(!payment){ return false };

	document.getElementById("origin-payment-filter-box").style.display = "none";

	Outcome.origin.payment.view.show(payment);
};

Outcome.origin.payment.controller.edit = async (id) => {
	let payment = await API.response(Outcome.origin.payment.findById, id);
	if(!payment){ return false };

	document.getElementById("origin-payment-create-form").style.display = "";
	document.getElementById("origin-payment-create-form").elements.namedItem("id").value = payment.id;
	document.getElementById("origin-payment-create-form").elements.namedItem("origin-id").value = payment.origin_id;
	document.getElementById("origin-payment-create-form").elements.namedItem("payment-method").value = payment.method;
	
	lib.eventEmmiter(document.getElementById("origin-payment-create-form").elements.namedItem("payment-method"), "change");

	if(payment.method == "Pix"){
		document.getElementById("origin-payment-create-form").elements.namedItem("payment-method").value = payment.method;
		document.getElementById("origin-payment-create-form").elements.namedItem("pix-receiver").value = payment.pix_receiver;
		document.getElementById("origin-payment-create-form").elements.namedItem("pix-key").value = payment.pix_key;

		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-receiver").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-register").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-bank").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-agency").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account-type").value = "";
	} else if(payment.method == "Transferência bancária"){
		document.getElementById("origin-payment-create-form").elements.namedItem("payment-method").value = payment.method;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-receiver").value = payment.transfer_receiver;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-register").value = payment.transfer_register;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-bank").value = payment.transfer_bank;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-agency").value = payment.transfer_agency;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account").value = payment.transfer_account;
		document.getElementById("origin-payment-create-form").elements.namedItem("transfer-account-type").value = payment.transfer_account_type;

		document.getElementById("origin-payment-create-form").elements.namedItem("pix-receiver").value = "";
		document.getElementById("origin-payment-create-form").elements.namedItem("pix-key").value = "";
	}
};

Outcome.origin.payment.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o pagamento?');
	if(r){
		if(!await API.response(Outcome.origin.payment.delete, id)){ return false };
		
		Outcome.origin.payment.controller.filter.submit.click();
	};
};