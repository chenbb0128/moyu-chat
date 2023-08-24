import { log } from 'wechaty'
import type { Contact } from 'wechaty'

export function onLogin(user: Contact) {
  log.info(`【${user.name()}】 我登录了，但是还没准备好，请稍等~`)
  log.info(`启动时间：${new Date()}`)
}
