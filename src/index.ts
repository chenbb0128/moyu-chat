import express from 'express'
import { WechatyBuilder, log } from 'wechaty'
import { onScan } from './listeners/onScan.ts'
import { onLogin } from './listeners/onLogin.ts'
import { onLogout } from './listeners/onLogout.ts'
import { onMessage } from './listeners/onMessage.ts'
import { onReady } from './listeners/onReady.ts'
import { sendContactMsg, sendRoomMsg } from './services/sendMessage.ts'

const app = express()

const bot = WechatyBuilder.build({
  name: 'test-bot',
  puppet: 'wechaty-puppet-wechat',
  puppetOptions: {
    uos: true,
  },
})

bot
  .on('scan', onScan)
  .on('login', onLogin)
  .on('ready', onReady)
  .on('logout', onLogout)
  .on('message', onMessage)

bot
  .start()
  .then(() => log.info('开始运行...'))
  .catch(e => log.error('StarterBot', e))

app.get('/sendContactMsg', async (req, res) => {
  const content = req.query.content?.toString()
  const username = req.query.username?.toString()
  const alias = req.query.alias?.toString()

  sendContactMsg(bot, content, alias, username)

  res.send('联系人消息成功')
})

app.get('/sendRoomMsg', async (req, res) => {
  const content = req.query.content?.toString()
  const name = req.query.name?.toString()

  sendRoomMsg(bot, content, name)

  res.send('群消息发送成功')
})

app.listen(3000)
