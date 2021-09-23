<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <p class="card-title">发车须知</p>
        </div>
        <span class="card-subtitle">
          欢迎上车，请系好安装全带，请按照教程打开所有活动
          <a
            href="https://www.yuque.com/docs/share/5c3542b8-6fad-4503-a62d-d296f475c5ae"
            class="jc"
            >教程地址</a
          >
        </span>
      </div>
      <div class="card-body">
        <span
          >为了您的财产安全请关闭免密支付以及打开支付验密（京东-设置-支付设置-支付验密设置）。<br />建议京东账户绑定微信以保证提现能到账。</span
        >
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <p class="card-title">获取wskey教程</p>
        </div>
      </div>
      <div class="card-body"></div>
    </div>
    <div class="card hidden">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <p class="card-title">扫码登录</p>
          <span
            class="ml-2 px-2 py-1 bg-gray-200 rounded-full font-normal text-xs"
            >余量：{{ marginCount }}</span
          >
        </div>
        <span class="card-subtitle">
          请点击下方按钮登录，点击按钮后回到本网站查看是否登录成功，京东的升级提示不用管。
        </span>
      </div>
      <div class="card-body text-center">
        <div v-if="!qrCodeVisibility" class="flex flex-col w-48 m-auto mt-4">
          <!-- <el-button class="mt-4 ml-0" type="primary" round @click="jumpTwoCar"
            >切换二号车</el-button
          > -->
          <el-button class="mt-4 ml-0" type="primary" round @click="getQrcode"
            >扫描二维码登录</el-button
          >
          <el-button class="mt-4 ml-0" type="primary" round @click="jumpLogin"
            >跳转到京东 App 登录</el-button
          >
        </div>
        <img v-else :src="QRCode" :width="256" class="m-auto" />
      </div>
      <div class="card-footer"></div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <p class="card-title">wskey登录</p>
          <span
            class="ml-2 px-2 py-1 bg-gray-200 rounded-full font-normal text-xs"
            >余量：{{ marginCount }}</span
          >
        </div>
        <span class="card-subtitle"> 请在下方输入您的 wskey 登录。 </span>
      </div>
      <div class="card-body text-center">
        <el-input v-model="cookie" size="small" clearable class="my-4 w-full" />
        <el-button type="primary" size="small" round @click="CKLogin"
          >登录</el-button
        >
      </div>
    </div>
    <div class="pt-6 pb-4 text-center text-gray-600">
      Author：jiuyou | Edition：2.0.3 | LastUpdateTime：2021-09-15
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElLoading } from 'element-plus'
import {
  getInfoAPI,
  getQrcodeAPI,
  CKLoginAPI,
  checkLoginAPI,
  CKTOCKAPI,
} from '@/api/index'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    let data = reactive({
      marginCount: 0,
      allowAdd: true,
      cookie: '',
      QRCode: undefined,
      qrCodeVisibility: false,
      token: undefined,
      okl_token: undefined,
      cookies: undefined,
      timer: undefined,
      waitLogin: false,
    })

    const getInfo = async () => {
      const info = (await getInfoAPI()).data
      data.marginCount = info.marginCount
      data.allowAdd = info.allowAdd
    }

    const getQrcode = async () => {
      try {
        const body = await getQrcodeAPI()
        data.token = body.data.token
        data.okl_token = body.data.okl_token
        data.cookies = body.data.cookies
        data.QRCode = body.data.QRCode
        data.ua = body.data.ua
        if (data.QRCode) {
          data.qrCodeVisibility = true
          data.waitLogin = true
          clearInterval(data.timer) // 清除定时器
          data.timer = setInterval(ckeckLogin, 3000) // 设置定时器
        }
      } catch (e) {
        console.error(e)
        ElMessage.error('生成二维码失败！请重试或放弃')
      }
    }

    const showQrcode = async () => {
      data.qrCodeVisibility = true
    }

    const jumpLogin = async () => {
      const body = await getQrcodeAPI()
      data.token = body.data.token
      data.okl_token = body.data.okl_token
      data.cookies = body.data.cookies
      data.QRCode = body.data.QRCode
      data.ua = body.data.ua
      const href = `openapp.jdmobile://virtual/ad?params={"category":"jump","des":"ThirdPartyLogin","action":"to","onekeylogin":"return","url":"https://plogin.m.jd.com/cgi-bin/m/tmauth?appid=300&client_type=m&token=${data.token}","authlogin_returnurl":"weixin://","browserlogin_fromurl":"${window.location.host}"}`
      window.location.href = href
      setTimeout(() => {
        //需要延迟的代码
        if (data.QRCode) {
          data.qrCodeVisibility = false
          data.waitLogin = true
          clearInterval(data.timer) // 清除定时器
          data.timer = setInterval(ckeckLogin, 3000) // 设置定时器
        }
        //延迟时间：3秒
      }, 3000)
    }

    const ckeckLogin = async () => {
      console.log(data.ua)
      try {
        const body = await checkLoginAPI({
          token: data.token,
          okl_token: data.okl_token,
          ua: data.ua,
          cookies: data.cookies,
        })

        switch (body?.data.errcode) {
          case 0:
            localStorage.setItem('eid', body.data.eid)
            ElMessage.success(body.message)
            clearInterval(data.timer)
            router.push('/')
            break
          case 176:
            break
          default:
            ElMessage.error(body.message)
            data.waitLogin = false
            clearInterval(data.timer)
            break
        }
      } catch (error) {
        clearInterval(data.timer)
        data.waitLogin = false
      }
    }
    const CKLogin = async () => {
      if (data.cookie == '' || data.cookie == null) {
        ElMessage.error('wskey不能为空！')
        return
      }
      const pin =
        data.cookie.match(/pin=(.*?);/) && data.cookie.match(/pin=(.*?);/)[1]
      const wskey =
        data.cookie.match(/wskey=(.*?);/) &&
        data.cookie.match(/wskey=(.*?);/)[1]
      if (pin && wskey) {
        console.log(pin + '\t' + wskey)
        const loading = ElLoading.service({
          lock: true,
          text: '登录中。。。',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        const body = await CKTOCKAPI({
          wskey: 'pin=' + pin + ';wskey=' + wskey + ';',
        })
        if (body.data.cookie != null || body.data.cookie != '') {
          loading.close()
        }
        if (body.data.cookie == 'wskey错误') {
          ElMessage.error(body.data.cookie)
          return
        }
        const ptKey =
          body.data.cookie.match(/pt_key=(.*?);/) &&
          body.data.cookie.match(/pt_key=(.*?);/)[1]
        const ptPin =
          body.data.cookie.match(/pt_pin=(.*?);/) &&
          body.data.cookie.match(/pt_pin=(.*?);/)[1]
        if (ptKey && ptPin) {
          //wskey没问题，登陆
          //传入值，wskey，cookie
          const body = await CKLoginAPI({
            pt_key: ptKey,
            pt_pin: ptPin,
            wskey: 'pin=' + pin + ';wskey=' + wskey + ';',
          })
          if (body.data.code === 200 && body.data.eid) {
            localStorage.setItem('eid', body.data.eid)
            localStorage.setItem(
              'cookie',
              'pt_key=' + ptKey + ';pt_pin=' + ptPin + ';'
            )
            router.push('/')
            ElMessage.success(body.message)
          } else {
            ElMessage.error(body.message || 'cookie 解析失败，请检查后重试！')
          }
        } else {
          ElMessage.error('cookie 解析失败，请检查后重试！')
        }
      } else {
        ElMessage.error('wskey 解析失败，请检查后重试！')
        return
      }
    }

    onMounted(() => {
      getInfo()
    })

    return {
      ...toRefs(data),
      getInfo,
      getQrcode,
      showQrcode,
      ckeckLogin,
      jumpLogin,
      CKLogin,
    }
  },
}
</script>

<style scoped>
.jc {
  color: red;
}
</style>
