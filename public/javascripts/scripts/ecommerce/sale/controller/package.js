Ecommerce.sale.package.controller = {};

Ecommerce.sale.package.controller.dropdown = {
	filter: async (input, dropdown_id) => {
		event.preventDefault();

		let package = {
			 code: "",
			 name: input.value,
			 color: "",
			 brand: ""
		};
		
		if(package.name.length > 2){
			let products = await Product.package.filter(package);
			if(!products){ return false; };

			lib.dropdown.render(products, input.id, dropdown_id, "input", "id", ["code","name","color"]);
		} else {
			lib.dropdown.render([], input.id, dropdown_id, "input", "id", ["code","name","color"]);
		};
	}
};

Ecommerce.sale.package.kart = new lib.kart("ecommerce-sale-package-kart", "Ecommerce.sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"}]);

Ecommerce.sale.package.kart.add = document.getElementById("ecommerce-sale-package-kart-form");
if(Ecommerce.sale.package.kart.add){
	Ecommerce.sale.package.kart.add.addEventListener("submit", async (event) => {
		event.preventDefault();

		if(!document.getElementById("ecommerce-sale-package-kart-form").elements.namedItem("package").readOnly){ 
			return alert("Pacote inválido");
		};

		let package = document.getElementById("ecommerce-sale-package-kart-form").elements.namedItem("package");
		let amount = document.getElementById("ecommerce-sale-package-kart-form").elements.namedItem("amount").value;

		if(package.dataset.id <= 0 || !package.dataset.id || isNaN(package.dataset.id)){
			alert("É necessário selecionar um pacote.");
			return;
		};

		if(amount < 0.01 || !amount){
			alert("É necessário preencher a quantidade de pacotes.");
			return;
		};

		package = await API.response(Product.package.findById, package.dataset.id);
		if(!package){ return false };

		package.amount = parseInt(amount);
		package.id = 1;
		package.setup = "padrão";

		for(let i in Ecommerce.sale.package.kart.items){
			if(package.id <= parseInt(Ecommerce.sale.package.kart.items[i].id)){
				package.id = parseInt(Ecommerce.sale.package.kart.items[i].id) + 1;
			};
		};

		Ecommerce.sale.package.kart.insert("id", package);
		Ecommerce.sale.package.kart.update("code");

		// let stringified_kart = JSON.stringify(Ecommerce.sale.package.kart.items);
		// lib.localStorage.update(Ecommerce.sale.package.kart.name, stringified_kart);

		Ecommerce.sale.package.product = Ecommerce.sale.package.kart.items.reduce((kart_package, backup_package) => {
			for(let i in Ecommerce.sale.package.product){
				if(Ecommerce.sale.package.product[i].id == backup_package.id){
					return Ecommerce.sale.package.product;
				};
			};

			Ecommerce.sale.package.product["kart"+backup_package.id] = new lib.kart("ecommerce-sale-package-product-kart"+backup_package.id, "Ecommerce.sale.package.product.kart"+backup_package.id, [{"product_info":"Descrição"}]);
			Ecommerce.sale.package.product["kart"+backup_package.id].id = backup_package.id;

			for(let j in backup_package.products){
				Ecommerce.sale.package.product["kart"+backup_package.id].insert("product_id", backup_package.products[j]);
			};
			Ecommerce.sale.package.product["kart"+backup_package.id].update("product_code");

			return Ecommerce.sale.package.product;
		}, Ecommerce.sale.package.product);

		Ecommerce.sale.package.kart.list("Ecommerce.sale.package.kart", Ecommerce.sale.package.kart.props);
	
		for(let i in Ecommerce.sale.package.product){ Ecommerce.sale.package.kart.set(Ecommerce.sale.package.product[i].id); };

		document.getElementById("ecommerce-sale-package-kart-form").elements.namedItem('package').value = "";
		document.getElementById("ecommerce-sale-package-kart-form").elements.namedItem('package').dataset.id = "";
		document.getElementById("ecommerce-sale-package-kart-form").elements.namedItem('amount').value = "";
	});
};

Ecommerce.sale.package.kart.activate = () => {
	for(let i in Ecommerce.sale.package.product){ Ecommerce.sale.package.kart.set(Ecommerce.sale.package.product[i].id); };
};

Ecommerce.sale.package.kart.list = (kart, props) => {
	if(Ecommerce.sale.package.kart.items.length){
		let html = "";
		for(i in Ecommerce.sale.package.kart.items){
			html += "<div class='box b1 container border center padding-5 margin-top-5'>";
				html += "<div id='ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-hider' class='mobile-box b12 center pointer box-hover border-explicit' onclick='lib.displayDiv(`ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-box`, this);'>P"+Ecommerce.sale.package.kart.items[i].id+"</div>";
				html += "<div class='mobile-box b2 center'>"+Ecommerce.sale.package.kart.items[i].name+"</div>";
				html += "<div class='mobile-box b6 center'>"+Ecommerce.sale.package.kart.items[i].color+"</div>";
				html += "<div id='ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-setup' class='mobile-box b6 center'>"+Ecommerce.sale.package.kart.items[i].setup+"</div>";
				html += "<div class='mobile-box b4 center margin-top-10'><img class='icon size-15' src='/images/icon/decrease.png' onclick='"+kart+".decrease("+Ecommerce.sale.package.kart.items[i].id+")'></div>";
				html += "<input class='mobile-box b4 border-explicit center margin-top-10 bold' type='text' id='ecommerce-sale-package-kart"+Ecommerce.sale.package.kart.items[i].id+"' onchange='"+kart+".updateAmount("+Ecommerce.sale.package.kart.items[i].id+", this.value);lib.focus(this)' value='"+Ecommerce.sale.package.kart.items[i].amount+"'>";
				html += "<div class='mobile-box b4 center margin-top-10'><img class='icon size-15' src='/images/icon/increase.png' onclick='"+kart+".increase("+Ecommerce.sale.package.kart.items[i].id+")'></div>";
				html += "<div class='mobile-box b4 center margin-top-10'><img class='icon size-20' src='/images/icon/trash.png' onclick='"+kart+".remove("+Ecommerce.sale.package.kart.items[i].id+")'></div>";

				html += "<div id='ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-box' class='box b1 container border margin-top-10' style='display:none'>";
					html += "<form id='ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-form' class='box b1 container'>";
					html += "<input type='hidden' name='id' value=''>";
					html += "<div class='mobile-box b7-9 container dropdown ground margin-top-5'>";
					html += "<ul class='box b1 container'>";
					html += "<li>";
					html += "<input type='hidden' name='package_id' value='"+Ecommerce.sale.package.kart.items[i].id+"'>";
					html += "<input type='hidden' name='product_id'>";
					html += "<input type='text' id='ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-dropdown-input' name='product' data-id='' class='box b1 input-generic center' oninput='Ecommerce.sale.product.controller.dropdown.filter(this, `sale-product-package-kart"+Ecommerce.sale.package.kart.items[i].id+"-dropdown`)' placeholder='Descrição do produto' onclick='if(this.readOnly){this.value=``; this.readOnly = false;}' autocomplete='off'>";
					html += "<ul id='sale-product-package-kart"+Ecommerce.sale.package.kart.items[i].id+"-dropdown' class='box b1'></ul>";
					html += "</li></ul></div>";
					html += "<input type='number' name='amount' class='mobile-box b9 input-generic border-bottom center margin-top-5' placeholder='Qtd'>";
					html += "<button type='submit' name='submit' class='mobile-box b9 input-generic noborder margin-top-5 pointer'><img class='img-tbl-btn size-15' src='/images/icon/increase.png'></button>";
					html += "</form>";

					html += "<table id='ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-table' class='tbl-info box b1 ground padding-10 margin-top-10'></table>";
				html += "</div>";
			html += "</div>";
		};
		
		document.getElementById(Ecommerce.sale.package.kart.name+"-div").innerHTML = html;
		
		for(let i in Ecommerce.sale.package.kart.items){
			Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].list(Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].name, Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].props);
		};
	} else {
		document.getElementById(Ecommerce.sale.package.kart.name+"-div").innerHTML = "";
		// lib.localStorage.update("ecommerce-sale-package-product-kart-id", 1);
	};
};

Ecommerce.sale.package.kart.decrease = (obj_id) => {
	for(i in Ecommerce.sale.package.kart.items){
		if(Ecommerce.sale.package.kart.items[i].id == obj_id && Ecommerce.sale.package.kart.items[i].amount > 1){
			Ecommerce.sale.package.kart.items[i].amount -= 1;
		};
	};
	let stringified_kart = JSON.stringify(Ecommerce.sale.package.kart.items);
	// lib.localStorage.update(Ecommerce.sale.package.kart.name, stringified_kart);

	Ecommerce.sale.package.kart.list(Ecommerce.sale.package.kart.variable, Ecommerce.sale.package.kart.props);
	Ecommerce.sale.package.kart.activate();
};

Ecommerce.sale.package.kart.increase = (obj_id) => {
	for(let i in Ecommerce.sale.package.kart.items){
		if(Ecommerce.sale.package.kart.items[i].id == obj_id){
			Ecommerce.sale.package.kart.items[i].amount += 1;
		};
	};
	let stringified_kart = JSON.stringify(Ecommerce.sale.package.kart.items);
	// lib.localStorage.update(Ecommerce.sale.package.kart.name, stringified_kart);

	Ecommerce.sale.package.kart.list(Ecommerce.sale.package.kart.variable, Ecommerce.sale.package.kart.props);
	Ecommerce.sale.package.kart.activate();
};

Ecommerce.sale.package.kart.updateAmount = async (obj_id, amount) => {
	if(amount < 1 || isNaN(amount)){
		alert("Quantidade Inválida");
		return Ecommerce.sale.package.kart.list(Ecommerce.sale.package.kart.variable, Ecommerce.sale.package.kart.props);
	};

	for(i in Ecommerce.sale.package.kart.items){
		if(Ecommerce.sale.package.kart.items[i].id == obj_id){
			Ecommerce.sale.package.kart.items[i].amount = parseInt(amount);
			
			let stringified_kart = JSON.stringify(Ecommerce.sale.package.kart.items);
			// lib.localStorage.update(Ecommerce.sale.package.kart.name, stringified_kart);

			Ecommerce.sale.package.kart.list(Ecommerce.sale.package.kart.variable, Ecommerce.sale.package.kart.props);
			Ecommerce.sale.package.kart.activate();

			return true;
		};
	};
};

Ecommerce.sale.package.kart.remove = (obj_id) => {
	var kart_backup = [];
	for(let i in Ecommerce.sale.package.kart.items){
		if(Ecommerce.sale.package.kart.items[i].id != obj_id){
			kart_backup.push(Ecommerce.sale.package.kart.items[i]);
		};
	};

	Ecommerce.sale.package.kart.items = kart_backup;
	
	for(let i in Ecommerce.sale.package.product){
		if(Ecommerce.sale.package.product[i].id == obj_id){
			delete Ecommerce.sale.package.product[i];
		};
	};

	// let stringified_kart = JSON.stringify(Ecommerce.sale.package.kart.items);
	// lib.localStorage.update(Ecommerce.sale.package.kart.name, stringified_kart);
	// lib.localStorage.remove("ecommerce-sale-package-product-kart"+obj_id);

	Ecommerce.sale.package.kart.list(Ecommerce.sale.package.kart.variable, Ecommerce.sale.package.kart.props);
	Ecommerce.sale.package.kart.activate();
};

Ecommerce.sale.package.product = {};

Ecommerce.sale.package.kart.set = (id) => {
	Ecommerce.sale.package.product["kart"+id].add = document.getElementById(Ecommerce.sale.package.product["kart"+id].name+"-form");
	if(Ecommerce.sale.package.product["kart"+id].add){
		Ecommerce.sale.package.product["kart"+id].add.addEventListener("submit", async event => {
			event.preventDefault();

			if(!document.getElementById(Ecommerce.sale.package.product["kart"+id].name+"-form").elements.namedItem("product").readOnly){ 
				return alert("Produto inválido");
			};

			let product = document.getElementById(Ecommerce.sale.package.product["kart"+id].name+"-form").elements.namedItem("product");
			let splitedProduct = product.value.split(" | ");
			let amount = document.getElementById(Ecommerce.sale.package.product["kart"+id].name+"-form").elements.namedItem("amount").value;

			if(splitedProduct.length < 3 || !splitedProduct){
				alert("É necessário selecionar um produto.");
				return;
			};

			if(amount < 0.01 || !amount){
				alert("É necessário preencher a quantidade do produto.");
				return;
			};

			product = {
				id: 1,
				package_id: id,
				product_id: product.dataset.id,
				product_code: splitedProduct[0],
				product_info: product.value,
				amount: parseInt(amount)
			};

			for(let i in Ecommerce.sale.package.product['kart'+id].items){
				if(product.id <= parseInt(Ecommerce.sale.package.product['kart'+id].items[i].id)){
					product.id = parseInt(Ecommerce.sale.package.product['kart'+id].items[i].id) + 1;
				};
			};

			if(!Ecommerce.sale.package.product["kart"+id].insert("product_id", product)){ return false; };
			Ecommerce.sale.package.product["kart"+id].update("product_code");
			Ecommerce.sale.package.product["kart"+id].list(Ecommerce.sale.package.product["kart"+id].name, Ecommerce.sale.package.product["kart"+id].props);
			
			Ecommerce.sale.package.updateSetup(id);

			event.target.elements.namedItem("product").dataset.id = "";
			event.target.elements.namedItem("product").value = "";
			event.target.elements.namedItem("amount").value = "";
		});
	};

	Ecommerce.sale.package.product["kart"+id].decrease = (obj_id) => {
		for(i in Ecommerce.sale.package.product["kart"+id].items){
			if(Ecommerce.sale.package.product["kart"+id].items[i].id == obj_id && Ecommerce.sale.package.product["kart"+id].items[i].amount > 1){
				Ecommerce.sale.package.product["kart"+id].items[i].amount -= 1;
			};
		};
		let stringified_kart = JSON.stringify(Ecommerce.sale.package.product["kart"+id].items);
		// lib.localStorage.update(Ecommerce.sale.package.product["kart"+id].name, stringified_kart);
		Ecommerce.sale.package.product["kart"+id].list(Ecommerce.sale.package.product["kart"+id].variable, Ecommerce.sale.package.product["kart"+id].props);
	
		Ecommerce.sale.package.updateSetup(id);
	};

	Ecommerce.sale.package.product["kart"+id].increase = (obj_id) => {
		for(let i in Ecommerce.sale.package.product["kart"+id].items){
			if(Ecommerce.sale.package.product["kart"+id].items[i].id == obj_id){
				Ecommerce.sale.package.product["kart"+id].items[i].amount += 1;
			};
		};
		let stringified_kart = JSON.stringify(Ecommerce.sale.package.product["kart"+id].items);
		// lib.localStorage.update(Ecommerce.sale.package.product["kart"+id].name, stringified_kart);
		Ecommerce.sale.package.product["kart"+id].list(Ecommerce.sale.package.product["kart"+id].variable, Ecommerce.sale.package.product["kart"+id].props);
		
		Ecommerce.sale.package.updateSetup(id);
	};

	Ecommerce.sale.package.product["kart"+id].updateAmount = async (obj_id, amount) => {
		if(amount < 1 || isNaN(amount)){
			alert("Quantidade Inválida");
			return Ecommerce.sale.package.product["kart"+id].list(Ecommerce.sale.package.product["kart"+id].variable, Ecommerce.sale.package.product["kart"+id].props);
		};

		for(i in Ecommerce.sale.package.product["kart"+id].items){
			if(Ecommerce.sale.package.product["kart"+id].items[i].id == obj_id){
				Ecommerce.sale.package.product["kart"+id].items[i].amount = parseInt(amount);
				
				let stringified_kart = JSON.stringify(Ecommerce.sale.package.product["kart"+id].items);
				// lib.localStorage.update(Ecommerce.sale.package.product["kart"+id].name, stringified_kart);

				Ecommerce.sale.package.product["kart"+id].list(Ecommerce.sale.package.product["kart"+id].variable, Ecommerce.sale.package.product["kart"+id].props);
				
				return Ecommerce.sale.package.updateSetup(id);
			};
		};
	};

	Ecommerce.sale.package.product["kart"+id].remove = (obj_id) => {
		var kart_backup = [];
		for(let i in Ecommerce.sale.package.product["kart"+id].items){
			if(Ecommerce.sale.package.product["kart"+id].items[i].id != obj_id){
				kart_backup.push(Ecommerce.sale.package.product["kart"+id].items[i]);
			};
		};

		Ecommerce.sale.package.product["kart"+id].items = kart_backup;

		let stringified_kart = JSON.stringify(Ecommerce.sale.package.product["kart"+id].items);
		// lib.localStorage.update(Ecommerce.sale.package.product["kart"+id].name, stringified_kart);

		if(!Ecommerce.sale.package.product["kart"+id].items.length){ return Ecommerce.sale.package.kart.remove(id); };

		Ecommerce.sale.package.product["kart"+id].list(Ecommerce.sale.package.product["kart"+id].variable, Ecommerce.sale.package.product["kart"+id].props);

		Ecommerce.sale.package.updateSetup(id);
	};
};

Ecommerce.sale.package.updateSetup = (id) => {
	for(let i in Ecommerce.sale.package.kart.items){
		if(Ecommerce.sale.package.kart.items[i].id == id && Ecommerce.sale.package.kart.items[i].setup == "padrão"){
			Ecommerce.sale.package.kart.items[i].setup = "personalizado";
			document.getElementById("ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id+"-setup").innerHTML = "personalizado";
		};
	};
	let stringified_kart = JSON.stringify(Ecommerce.sale.package.kart.items);
	// lib.localStorage.update(Ecommerce.sale.package.kart.name, stringified_kart);
};

// if(lib.localStorage.verify("ecommerce-sale-package-kart")){
// 	let sale_package_kart = JSON.parse(localStorage.getItem("ecommerce-sale-package-kart"));
// 	Ecommerce.sale.package.kart.items = sale_package_kart;
// 	Ecommerce.sale.package.kart.update("code");

// 	let sale_package_product_kart = "";
// 	for(let i in Ecommerce.sale.package.kart.items){
// 		Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id] = new lib.kart("ecommerce-sale-package-product-kart"+Ecommerce.sale.package.kart.items[i].id, "Ecommerce.sale.package.product.kart"+Ecommerce.sale.package.kart.items[i].id, [{"product_info":"Descrição"}]);
// 		Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].id = Ecommerce.sale.package.kart.items[i].id;
		
// 		if(JSON.parse(localStorage.getItem(Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].name))){
// 			let sale_package_product_kart = JSON.parse(localStorage.getItem(Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].name));
// 			if(sale_package_product_kart.length > 0){
// 				Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].items = sale_package_product_kart;
// 			};
// 		} else {
// 			for(let j in Ecommerce.sale.package.kart.items[i].products){
// 				Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].insert("product_code", Ecommerce.sale.package.kart.items[i].products[j]);
// 			};
// 		};
// 		Ecommerce.sale.package.product["kart"+Ecommerce.sale.package.kart.items[i].id].update("product_code");
// 	};

// 	Ecommerce.sale.package.kart.list("Ecommerce.sale.package.kart", [{"code":"Código"},{"name":"Nome"},{"color":"Cor"},{"price":"Preço"}]);
// 	for(let i in Ecommerce.sale.package.product){ Ecommerce.sale.package.kart.set(Ecommerce.sale.package.product[i].id); };
// };