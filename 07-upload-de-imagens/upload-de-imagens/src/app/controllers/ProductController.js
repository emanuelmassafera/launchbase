const { formatPrice, date } = require("../../lib/utils");

const Category = require("../models/Category");
const Product = require("../models/Product");
const File = require("../models/File");

module.exports = {
    create(req, res) {
        // PEGAR CATEGORIAS
        Category.all()
            .then(function (results) {

                const categories = results.rows;

                return res.render("products/create.njk", { categories });
            }).catch(function (err) {
                throw new Error(err);
            });
    },

    async post(req, res) {
        // LÓGICA DE SALVAR
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!");
            }
        }

        if (req.files.length == 0) {
            return res.send("Preencha com pelo menos uma imagem!");
        }

        let results = await Product.create(req.body);
        const productId = results.rows[0].id;

        const filesPromises = req.files.map(file => File.create({...file, product_id: productId}));
        await Promise.all(filesPromises);

        return res.redirect(`products/${productId}`);
    },

    async show(req, res) {

        let results = await Product.find(req.params.id);
        const product = results.rows[0];

        if (!product) {
            return res.send("Produto não encontrado!");
        }

        const { day, month, hour, minutes } = date(product.updated_at);

        product.published = {
            day: `${day}/${month}`,
            hour: `${hour}h${minutes}`
        }

        product.old_price = formatPrice(product.old_price);
        product.price = formatPrice(product.price);

        results = await Product.files(product.id);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        return res.render("products/show", { product, files });
    },

    async edit(req, res) {
        let results = await Product.find(req.params.id);
        const product = results.rows[0];

        if (!product) {
            return res.send("Produto não encontrado!");
        }

        product.old_price = formatPrice(product.old_price);
        product.price = formatPrice(product.price);

        // get categories
        results = await Category.all();
        const categories = results.rows;

        // get images
        results = await Product.files(product.id);
        let files = results.rows;
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }));

        return res.render("products/edit.njk", { product, categories, files });
    },

    async put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send("Preencha todos os campos!");
            }
        }

        if (req.files.length != 0) {
            const newFilesPromises = req.files.map(file => File.create({...file, product_id: req.body.id}));

            await Promise.all(newFilesPromises);
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",");
            const lastIndex = removedFiles.length - 1;
            removedFiles.splice(lastIndex, 1);

            const removedFilesPromises = removedFiles.map(id => File.delete(id));

            await Promise.all(removedFilesPromises);
        }

        req.body.price = req.body.price.replace(/\D/g, "");

        if (req.body.old_price != req.body.price) {
            const oldProduct = await Product.find(req.body.id);

            req.body.old_price = oldProduct.rows[0].price;
        }

        await Product.update(req.body);

        return res.redirect(`/products/${req.body.id}`)
    },

    async delete(req, res) {
        await Product.delete(req.body.id);

        return res.redirect('/products/create');
    }
}