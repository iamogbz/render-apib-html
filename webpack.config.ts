import * as path from "path";
import { Configuration } from "webpack";
import * as nodeExternals from "webpack-node-externals";

const configuration: Configuration = {
    devtool: "source-map",
    entry: "./src",
    externals: [nodeExternals()],
    mode: "production",
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.tsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-typescript"],
                    },
                },
            },
        ],
    },
    output: {
        filename: "main.js",
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, "lib"),
    },
    resolve: {
        extensions: [".js", ".ts"],
        modules: [path.resolve("./src"), path.resolve("./node_modules")],
    },
    target: "node",
};

export default configuration;
