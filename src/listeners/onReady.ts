import { log } from 'wechaty'
import { getAccessToken } from '../utils/asr.ts'

export async function onReady() {
  getAccessToken()
  log.info('我准备好了,开始接收消息')
}
