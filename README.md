# practiveWebpackProject
building a empty framwork to understand deeply webpack and vue-cli tool

tool: vue-cli https://cli.vuejs.org/zh/guide/mode-and-env.html

环境变量：development(开发环境) test(测试环境) production(生产环境)
NODE_ENV、BASE_URL、VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中，可以通过process.env.VUE_APP_*去访问

注意：.env 环境文件是通过运行 vue-cli-service 命令载入的，因此环境文件发生变化，你需要重启服务
