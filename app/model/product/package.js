const db = require('../../../config/connection');
const Product = require('./main');
const lib = require("../../../config/lib");

Product.package = {
	save: async (package) => {
		let query = "INSERT INTO cms_wt_erp.product_package (code, name, color, weight, image, announcement) VALUES ('"
			+package.code+"', '"
			+package.name+"', '"
			+package.color+"', '"
			+package.weight+"', '"
			+package.image+"', '"
			+package.announcement+"');";
		return db(query);
	},
	update: async (package) => {
		let query = "UPDATE cms_wt_erp.product_package SET code='"+package.code
			+"', name='"+package.name
			+"', color='"+package.color
			+"', weight='"+package.weight
			+"', image='"+package.image
			+"', announcement='"+package.announcement+"' WHERE id='"+package.id+"';";
		return db(query);
	},
	list: async () => {
		let query = "SELECT * FROM cms_wt_erp.product_package ORDER BY code ASC;";
		return db(query);
	},
	filter: async (name, params, values) => {
		let query = lib.filterQueryName(name, params, values, "cms_wt_erp", "product_package", "code", "ASC");
		return db(query);
	},
	findByCode: async (code) => {
		let query = "SELECT * FROM cms_wt_erp.product_package WHERE code='"+code+"';";
		return db(query);
	},
	findById: async (id) => {
		let query = "SELECT * FROM cms_wt_erp.product_package WHERE id='"+id+"';";
		return db(query);	
	},
	delete: async (id) => {
		let query = "DELETE FROM cms_wt_erp.product_package WHERE id='"+id+"';";
		return db(query);
	},
	image: {
		add: async (image) => {
			let query = "INSERT INTO cms_wt_erp.product_package_image (package_id, url) VALUES ('"
				+image.package_id+"', '"
				+image.url+"');";
			return db(query);
		},
		list: async (id) => {
			let query = "SELECT * FROM cms_wt_erp.product_package_image WHERE package_id='"+id+"';";
			return db(query);
		},
		remove: async (image_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_image WHERE id='"+image_id+"';";
			return db(query);
		},
		removeByPackagetId: async (id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_image WHERE package_id='"+id+"';";
			return db(query);
		}
	},
	product: {
		add: async (package_id, product) => {
			let query = "INSERT INTO cms_wt_erp.product_package_product (package_id, product_id, product_code, product_info, amount) VALUES ('"
				+package_id+"','"
				+product.id+"','"
				+product.code+"','"
				+product.info+"','"
				+product.amount+"');";
			return db(query);
		},
		list: async (package_id) => {
			let query = "SELECT * FROM cms_wt_erp.product_package_product WHERE package_id='"+package_id+"' ORDER BY id ASC;";
			return db(query);
		},
		update: async (package_product_id, product) => {
			let query = "UPDATE cms_wt_erp.product_package_product SET amount='"+product.amount+"' WHERE id='"+package_product_id+"';";
			return db(query);
		},
		remove: async (package_product_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_product WHERE id='"+package_product_id+"';";
			return db(query);
		},
		removeAll: async (package_id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_product WHERE package_id='"+package_id+"';";
			return db(query);
		}
	},
	price: {
		save: async (price) => {
			let query = "INSERT INTO cms_wt_erp.product_package_price (category_id, package_id, price) VALUES ('"
				+price.category_id+"', '"
				+price.package_id+"', '"
				+price.price+"');";
			return db(query);
		},
		update: async (price) => {
			let query = "UPDATE cms_wt_erp.product_package_price SET price='"+price.price+"' WHERE id='"+price.id+"';";
			return db(query);
		},
		list: async (category_id) => {
			let query = "SELECT * FROM cms_wt_erp.product_package_price where category_id='"+category_id+"' ORDER BY id ASC;";
			return db(query);
		},
		find: async (price) => {
			let query = "SELECT * FROM cms_wt_erp.product_package_price where category_id='"+price.category_id+"' AND package_id='"+price.package_id+"' ORDER BY id ASC;";
			return db(query);
		},
		filter: (params, values, inners, status) => {
			let query = lib.filterByLikeAndInnerJoinAndByStatus(params, values, "product_package_price", inners, "status", status, "cms_wt_erp", "product_package", "code", "ASC");
			return db(query);
		},
		delete: async (id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_price WHERE product_id='"+id+"';";
			return db(query);
		},
		deleteAll: async (id) => {
			let query = "DELETE FROM cms_wt_erp.product_package_price WHERE category_id='"+id+"';";
			return db(query);
		}
	}
};

module.exports = Product.package;