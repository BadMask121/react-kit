const {
	override,
	addBabelPlugin,
	getBabelLoader,
	addWebpackPlugin,
	addWebpackModuleRule
} = require("customize-cra");
const { addReactRefresh } = require("customize-cra-react-refresh");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const dev = process.env.REACT_APP_NODE_ENV === "development";
module.exports = (config, env) => {
	const babelLoader = getBabelLoader(config);
	babelLoader.include = babelLoader.include.replace("/web/src", "");
	config.module.rules[2].oneOf[1] = babelLoader;

	return override(
		// You can choose to just use worker-loader! instead if you want
		addWebpackModuleRule({
			test: /\.worker\.[jt]sx?$/,
			use: [
				{ loader: "worker-loader" },
				{ loader: babelLoader.loader, options: babelLoader.options }
			]
		}),
		addWebpackModuleRule({
			test: /\.(tsx|ts)$/,
			use: [
				{
					loader: babelLoader.loader,
					options: babelLoader.options
				}
				// {loader: "awesome-typescript-loader"},
			]
		}),

		dev && addBabelPlugin("react-refresh/babel"),
		dev &&
			addWebpackPlugin(
				new ReactRefreshPlugin({ forceEnable: true }),
				new TsconfigPathsPlugin()
			)
	)(config, env);
};
