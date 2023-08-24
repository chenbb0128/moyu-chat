import { log } from 'wechaty'
import type { Contact } from 'wechaty'

export function onLogout(user: Contact) {
  log.info(`${user.name()} 我退出了`)
}
