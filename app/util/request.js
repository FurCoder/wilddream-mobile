import qs from 'qs'
import { getCookie } from '@util/token'

const location = ''

const safeParse = str => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

const tpQuerystringify = data => Object
  .keys(data)
  .map(_ => [_, data[_]])
  .map(_ => '/' + _.join())
  .join('/')

const request = async ({
  url,
  data = {},
  method = 'GET',
  raw,
}) => {
  const dataKeyNum = Object.keys(data).length
  const stringifyData = qs.stringify(data)
  const requestURL = location + url + ((dataKeyNum!==0 && method === 'GET') ? `?${stringifyData}` : '')
  console.log(
    requestURL
  )
  const request = await fetch(requestURL , {
    method,
    ...( method === 'GET' ?
      {
        headers: {
          'Cookie': (await getCookie()),
        },
      } :
      {
        body: stringifyData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': (await getCookie()),
        },
      }
    )
  })
  if (raw) {
    return request
  }
  const result = await request.text()
  return safeParse(result)
}

export default request