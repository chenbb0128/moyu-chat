import fs from 'node:fs'
import request from 'request'
import { log } from 'wechaty'

const AK = 'QGdGScf7nFSeFDeyAOuc3CHS'
const SK = 'h1rQ6mrnvzyNqd8gd9rhSSNAUn5KqjaA'
let token = ''
export async function asr(filePath: string) {
  return new Promise((resolve, reject) => {
    // 读取音频文件
    const audio = fs.readFileSync(filePath)
    // 获取字节数
    const byteCount = audio.byteLength
    const options = {
      method: 'POST',
      url: 'https://vop.baidu.com/server_api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        format: 'pcm',
        rate: 16000,
        channel: 1,
        cuid: 'QiK6YhpTd8NL3ppPeDnnoivi9OuD1pwo',
        token,
        speech: getFileContentAsBase64(filePath),
        len: byteCount,
      }),
    }
    if (token !== '') {
      request(options, (error, response) => {
        try {
          if (error)
            throw new Error(error)
          resolve(JSON.parse(response.body)?.result.join(' '))
        }
        catch (err) {
          log.error(err)
          reject(err)
        }
      })
    }
  })
}

/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
export function getAccessToken() {
  const options = {
    method: 'POST',
    url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${AK}&client_secret=${SK}`,
  }
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error)
      }
      else {
        token = JSON.parse(response.body).access_token
        resolve(JSON.parse(response.body).access_token)
      }
    })
  })
}

/**
 * 获取文件base64编码
 * @param string  path 文件路径
 * @return string base64编码信息，不带文件头
 */
function getFileContentAsBase64(path) {
  try {
    return fs.readFileSync(path, { encoding: 'base64' })
  }
  catch (err) {
    throw new Error(err)
  }
}
