const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const isDevelopment = process.env.NODE_ENV === "development"

module.exports = {
  entry: [
    path.resolve(__dirname, "../src/script.ts"),
    // path.resolve(__dirname, "../src/index.ejs"),
  ],
  output: {
    hashFunction: "xxhash64",
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: `!!ejs-compiled-loader!${path.resolve(
        __dirname,
        "../src/index.ejs"
      )}`,
      templateParameters: {
        name: "daan balm",
        projects: [
          {
            date: "9 / 2022",
            name: "Simpeldeb landing page",
            description:
              "A landing page for simpeldeb",
            tech: "JAVASCRIPT | BULMA | SCSS | NUXT",
            link: "https://simpeldeb.nl/",
            image: "images/simpeldeb-landing-page.png",
          },
          {
            date: "2 / 2021",
            name: "Bewitt",
            description:
              "Bewitt is a mobile app, used in IRL/online events. I worked on this while working at Konnect Kit.",
            tech: "JAVASCRIPT | BULMA | SCSS | VUEJS2 | IOSYSTEMS",
            link: "https://bewitt.com/",
            image: "images/bewitt.png",
          },
          {
            date: "9 / 2020",
            name: "'t Broodhuys",
            description:
              "bakkerijbroodhuys.nl is an e-commerce website that is used for selling artisanal baked goods, this was one of the first e-commerce websites I made and brought some teachable moments.",
            tech: "JAVASCRIPT | BULMA | SCSS | VUEJS2 | IOSYSTEMS",
            link: "https://bakkerijbroodhuys.nl/",
            image: "images/broodhuys.png",
          },
          {
            date: "1 / 2020",
            name: "Crest",
            description:
              "Crest is a credit management tool where I worked on the front-end. This was while I was working at TogatherFinance in Amsterdam. I got a lot of freedom with the design choices and chose neo-morphism as my main inspiration.",
            tech: "JAVASCRIPT | SCSS | VUEJS2 | PHP | MYSQL | LARAVEL",
            link: "https://youtube.com/watch?v=C87rltn67EM",
            image: "images/crest.png",
          },
          {
            date: "10 / 2019",
            name: "Incaze",
            description:
              "This is the landing page for Incaze, designed by Mediatribe, build by me.",
            tech: "HTML | CSS | JAVASCRIPT",
            link: "https://incaze.nl/",
            image: "images/incaze.png",
          },
        ],
        socials: [
          {
            icon: "icons/at.svg",
            href: "mailto:daanmlab@gmail.com",
          },
          {
            icon: "icons/linkedin-alt.svg",
            href: "https://www.linkedin.com/in/daanbalm/",
          },
          {
            icon: "icons/github-alt.svg",
            href: "https://github.com/daanmlab",
          },
        ],
      },
      minify: true,
    }),
    new MiniCSSExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".ejs", ".js", ".json"],
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
            options: { sources: false },
          },
        ],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // TS
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },

      //  STYLES
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
}
