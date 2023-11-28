const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api", // Adjust the path based on your API endpoint
		createProxyMiddleware({
			target: "https://api.spoonacular.com",
			changeOrigin: true,
			pathRewrite: {
				"^/api": "", // Remove the '/api' prefix when forwarding the request
			},
		})
	);
};
