import { ScanStatus, log } from 'wechaty'
import QrTerminal from 'qrcode-terminal'

export function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting && qrcode) {
    QrTerminal.generate(qrcode, { small: true })
    const qrCodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('')
    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrCodeImageUrl)
  }
  else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}
