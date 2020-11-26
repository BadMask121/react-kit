const {
    override,
    addBabelPlugin,
    getBabelLoader,
    addWebpackPlugin,
    addWebpackModuleRule,
    addWebpackResolve,
} = require("customize-cra")
const path = require("path")
const WorkerPlugin = require("worker-plugin")

// const {addReactRefresh} = require("customize-cra-react-refresh")
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

const dev = process.env.REACT_APP_NODE_ENV === "development"
const monoplatform = process.env.REACT_APP_PLATFORM === "mono"

module.exports = (config, env) => {
    const babelLoader = getBabelLoader(config)
    babelLoader.include = babelLoader.include.replace("/web/src", "")
    config.module.rules[2].oneOf[1] = babelLoader
    const configFile = () => {
        if (!monoplatform) return "./tsconfig.json"
        if (monoplatform) return "./tsconfig.mono.json"
    }

    /**
     *
     *
     * remeber to load ts loader before worker
     */
    return override(
        // You can choose to just use worker-loader! instead if you want
        addWebpackModuleRule({
            test: /\.worker\.[jt]sx?$/,
            use: [
                // {
                //     loader: "worker-loader",
                // },
                {
                    loader: babelLoader.loader,
                    options: babelLoader.options,
                },
            ],
        }),

        addWebpackModuleRule({
            test: /\.(tsx|ts)$/,
            use: [
                {
                    loader: babelLoader.loader,
                    options: babelLoader.options,
                },
            ],
        }),

        addWebpackPlugin(new WorkerPlugin()),

        dev &&
            addWebpackPlugin(
                new ReactRefreshPlugin({
                    forceEnable: true,
                })
            ),
        dev && addBabelPlugin("react-refresh/babel"),
        // dev && addReactRefresh({forceEnable: true, useLegacyWDSSockets: true}),
        addWebpackResolve({
            symlinks: true,
            alias: {
                vendor: path.resolve(__dirname, "src/"),
            },
            plugins: [
                new TsconfigPathsPlugin({
                    logLevel: "INFO",
                    extensions: [".ts", ".tsx", ".js", ".jsx"],
                    configFile: configFile(),
                }),
            ],
        })
    )(config, env)
}
