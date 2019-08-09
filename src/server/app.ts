import * as Koa from 'koa'
import App from '../web/pages/App'
const app = new Koa()

app.listen(3002, () => {
    console.log('服务器启动成功')
})