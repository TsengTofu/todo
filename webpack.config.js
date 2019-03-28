//引用path模組
const path = require('path');
module.exports = {
        //這個webpack打包的對象，這裡面加上剛剛建立的index.js
        entry: {
            index: './src/index.js'
        },
        output: {
            //這裡是打包後的檔案名稱
            filename: 'bundle.js',
            //打包後的路徑，這裡使用path模組的resolve()取得絕對位置，也就是目前專案的根目錄
            path: path.resolve('./'),
        },
        module: { //它的設定也是一個object
            rules: [ //一個object都是一個設定
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }},
                    {
                        test: /\.css$/, //每讀取副檔名為css的
                        use: ['style-loader', 'css-loader'] //放loader的地方
                    }
                ]
            }
        };