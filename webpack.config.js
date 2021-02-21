const path = require("path");
const glob = require("glob");
const CopyPlugin = require("copy-webpack-plugin");
const distDir = path.resolve(__dirname, "components");
const srcDir = path.resolve(__dirname, "src");
const entries = glob
  .sync(srcDir + "/*.svg")
  .reduce(
    (acc, item) => Object.assign(acc, { [path.parse(item).name]: item }),
    {}
  );

module.exports = {
  target: "web",
  entry: entries,
  output: {
    filename: "[name].js",
    libraryTarget: "umd",
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    path: distDir,
  },
  externals: {
    react: "react",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src", to: "../images" }],
    }),
  ],
};
