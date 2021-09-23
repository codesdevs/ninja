import ky from 'ky'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const api = ky.create({ prefixUrl: VITE_API_BASE_URL, retry: { limit: 0 } })

export function getInfoAPI() {
  return api.get('info').json()
}

export function CKLoginAPI(body) {
  return api.post('cklogin', { json: body }).json()
}

export function getQrcodeAPI() {
  return api.get('qrcode').json()
}

export function checkLoginAPI(body) {
  console.log(body)
  return api.post('check', { json: body }).json()
}

export function getUserInfoAPI(eid) {
  const searchParams = new URLSearchParams()
  searchParams.set('eid', eid)
  return api.get('userinfo', { searchParams: searchParams }).json()
}

export function delAccountAPI(body) {
  return api.post('delaccount', { json: body }).json()
}

export function updateRemarkAPI(body) {
  return api.post('update/remark', { json: body }).json()
}

export function getUserAssetsAPI(cookie) {
  const searchParams = new URLSearchParams()
  searchParams.set('cookie', cookie)
  return api.get('getUserAssets', { searchParams: searchParams }).json()
}

export function CKTOCKAPI(body) {
  console.log(body)
  return api.post('cktock', { json: body }).json().catch(error => {
    if (error != null) {
      return error
    }
  })
}


