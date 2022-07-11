const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')
const mix = require('laravel-mix')


const isDev = process.env.NODE_ENV !== "production"

/**
 * By default, AdonisJS public path for static assets is on the `./public` directory.
 *
 * If you want to change Laravel Mix public path, change the AdonisJS public path config first!
 * See: https://docs.adonisjs.com/guides/static-assets#the-default-directory
 */
mix.setPublicPath('public')
  .js('resources/client/index.js', 'public/js/')
  .react()
  .options({
    processCssUrls: false
  })


if (isDev){
  mix.sourceMaps()
}

mix.webpackConfig({
  mode: isDev ? 'development' : 'production',
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve:{
    fallback: {
      // Here paste
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "sys": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "net": 'empty',

    }
  },
  module: {
    rules: [
      {

        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-react'],
              plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    isDev && new webpack.HotModuleReplacementPlugin(),
    isDev && new ReactRefreshWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ].filter(Boolean),
})


// Add your assets here
