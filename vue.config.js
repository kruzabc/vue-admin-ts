const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');

const isProductionEnv = process.env.NODE_ENV === 'production';
const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const runPort = process.env.SEVER_PORT; // API代理到端口
const apiProxyPath = process.env['DEV_PROXY_' + process.env.API_ENV]; // API代理到端口

if (isDevelopmentEnv) {
    console.log(chalk.green(`正在【开发模式】下启动 ,当前API接口环境：【${["正式环境", "测试环境", "本地环境"][process.env.API_ENV]}】`));
    console.log(`API代理到：${apiProxyPath}`);
} else if (isProductionEnv) {
    console.log(chalk.green(`正在【生产模式】下编译`));
}

module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: config => {
        if (isProductionEnv) {
            config.optimization.minimize(true); // 最小化代码
            config.optimization.splitChunks({ // 切割代码
                chunks: "all",
            });
        }
        /* 使用CDN引入 */
        config.externals({
            axios: 'axios',
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            'element-ui': '"element-ui"'
        });
    },
    css: {
        extract: isProductionEnv,
        sourceMap: !isProductionEnv,
        loaderOptions: {
            sass: {
                // 这里假设你有 `variables.scss` 这个文件
                prependData: '@import "@/assets/styles/variables.scss";',
            }
        },
    },
    configureWebpack: {
        devtool: false,
        plugins: (() => {
            let pluginsList = [new webpack.SourceMapDevToolPlugin({})];
            return pluginsList;
        })(),
        optimization: {
            minimizer: []
        }
    },
    devServer: ({ // 代理到不同的端口
        port: runPort,
        proxy: {
            '/api/': {
                pathRewrite: {'^/api': ''},
                ws: false,
                target: apiProxyPath,
                changeOrigin: true,
            }
        }
    })
};
