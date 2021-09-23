const db = require('../../config/connection');

const Customer = function(){
	this.id;
	this.name;
	this.trademark;
	this.cnpj;
	this.email;
	this.phone;
	this.password;
	this.access = 'ctm'
};

Customer.save = (customer) => {
	let query = "INSERT INTO cms_wt_erp.customer (person_type, name, cpf, trademark, brand, cnpj, ie, social_media, email, phone, cellphone, password) values ('"
        +customer.person_type+"', '"
        +customer.name+"', '"
        +customer.cpf+"', '"
        +customer.trademark+"', '"
        +customer.brand+"', '"
        +customer.cnpj+"', '"
        +customer.ie+"', '"
        +customer.social_media+"', '"
        +customer.email+"', '"
        +customer.phone+"', '"
        +customer.cellphone+"', '"
        +customer.password+"')";
    return db(query);
};

Customer.update = async (customer) => {
	let query = "UPDATE cms_wt_erp.customer SET name='"+customer.name
		+"', cpf='"+customer.cpf
		+"', trademark='"+customer.trademark
		+"', brand='"+customer.brand
		+"', cnpj='"+customer.cnpj
		+"', ie='"+customer.ie
		+"', social_media='"+customer.social_media
		+"', email='"+customer.email
		+"', phone='"+customer.phone
		+"', cellphone='"+customer.cellphone
		+"', password='"+customer.password+"' WHERE id='"+customer.id+"';";
	return db(query);
};

Customer.findBy = {
	id: id => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE id='"+ id +"';";
		return db(query);
	},
	trademark: trademark => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE trademark='"+ trademark +"';";
		return db(query);
	},
	cpf: cpf => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cpf like '%"+ cpf +"%';";
		return db(query);
	},
	cnpj: cnpj => {
		let query = "SELECT * FROM cms_wt_erp.customer WHERE cnpj like '%"+ cnpj +"%';";
		return db(query);
	}
};

Customer.filter = customer => {
	let query = "SELECT * FROM cms_wt_erp.customer WHERE name like '%"+customer.name
		+"%' OR trademark like '%"+customer.trademark
		+"%' OR brand like '%"+customer.brand+"%';";
	return db(query);
};

Customer.delete = async (id) => {
	let query = "DELETE FROM cms_wt_erp.customer WHERE id='"+id+"';";
	return db(query);
};

Customer.address = {
	save: async (address) => {
		let query = "INSERT INTO cms_wt_erp.customer_address (customer_id, postal_code, street, number, complement, neighborhood, city, state) VALUES ('"
			+address.customer_id+"', '"
			+address.postal_code+"', '"
			+address.street+"', '"
			+address.number+"', '"
			+address.complement+"', '"
			+address.neighborhood+"', '"
			+address.city+"', '"
			+address.state+"');";
		return db(query);
	},
	update: async (address) => {
		let query = "UPDATE cms_wt_erp.customer_address SET postal_code='"+address.postal_code
			+"', street='"+address.street
			+"', number='"+address.number
			+"', complement='"+address.complement
			+"', neighborhood='"+address.neighborhood
			+"', city='"+address.city
			+"', state='"+address.state+"' WHERE id='"+address.id+"';";
		return db(query);
	},
	delete: async (id) => {
		let query = "DELETE FROM cms_wt_erp.customer_address WHERE id='"+id+"';";
		return db(query);
	},
	findBy: {
		id: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.customer_address WHERE id='"+id+"';";
			return db(query);
		},
		customer_id: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.customer_address WHERE customer_id='"+id+"';";
			return db(query);
		}
	}
};

module.exports = Customer;