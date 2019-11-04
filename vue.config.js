const webpack = require("webpack");
const chalk = require("chalk");
const path = require("path");
const dayjs = require("dayjs");
const projectConfig = require("./config/projectConfig.js");

const {
    NODE_ENV: nodeEnv,
    RUN_PROJECT_NAME: runProjectName,
    API_ENV: apiEnv,
} = process.env;

const isProductionEnv = nodeEnv === 'production';
const isDevelopmentEnv = nodeEnv === 'development';

const runPort = process.env['SEVER_PORT_' + runProjectName.toUpperCase()]; // 网页运行端口
const apiProxyPath = process.env['DEV_PROXY_' + runProjectName.toUpperCase() + '_' + apiEnv]; // API代理到端口

if (isDevelopmentEnv) {
    console.log(chalk.green(`正在【开发模式】下启动 【 ${runProjectName} 】项目,当前API接口环境：【${["正式环境", "测试环境", "本地环境"][process.env.API_ENV] } 】`));
    console.log(`API代理到：${ apiProxyPath }`);
} else if (isProductionEnv) {
    console.log(chalk.green(`正在【生产模式】下编译 【 ${ runProjectName } 】项目`));
}

const sepProjConf = projectConfig[runProjectName];

module.exports = {
    ...sepProjConf, // 配置
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
        /* 设置别名*/
        config.resolve.alias
            .set('@project', path.join(__dirname, `src/projects/${process.env.RUN_PROJECT_NAME}`));
    },
    css: {
        extract: isProductionEnv,
        sourceMap: isProductionEnv,
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

            pluginsList.push(new webpack.DefinePlugin({
                'FLAG_BUILD_VERSION': JSON.stringify(`1.0.0_${dayjs(new Date()).format("MMDDHHmm")}_${isProductionEnv ? "re" : "dev"}`),
                'RUN_PROJECT_NAME': JSON.stringify(runProjectName),
            }));
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
                ws: false, // proxy websockets
                target: apiProxyPath,
                changeOrigin: true,
            },
        }
    })
};
