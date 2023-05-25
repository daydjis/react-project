import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildOptions} from "./types/config";

export function buildLoaders({isDev}: buildOptions) :webpack.RuleSetRule[] {

    const cssLoader =  {
            test: /\.s[ac]ss$/i,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            auto: (resPath: string) => resPath.includes('.module'),
                            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:8]' : '[hash:base64:3]'
                        },
                    }
                },
                "sass-loader",
            ],
        }

    const typescriptsLoader = {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
    }

    return [
        typescriptsLoader, cssLoader
    ]
}