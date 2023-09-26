export function string2utf8(str: string | undefined) {
  if (str === undefined)
    return undefined
  const decoder = new TextDecoder('utf-8')
  const decodedString = decoder.decode(
    new Uint8Array([...str].map(c => c.charCodeAt(0))),
  )
  return decodedString
}
