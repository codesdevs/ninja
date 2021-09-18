<template>
  <div class="content">
    <div class="card">
      <div class="card-header">
        <p class="card-title">个人中心</p>
      </div>
      <div class="card-body">
        <p>昵称：{{ nickName }}</p>
        <p>更新时间：{{ timestamp }}</p>
      </div>
      <div class="card-footer">
        <el-button size="small" auto @click="logout">退出登录</el-button>
        <el-button type="danger" size="small" auto @click="delAccount"
          >删除账号</el-button
        >
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <p class="card-title">资产明细</p>
      </div>
      <div class="card-body text-center">
        <!-- <p>今日收入：{{ assets.todayIncome }}</p>
        <p>昨日收入：{{ assets.yesterdayIncome }}</p>
        <p>昨日支出：{{ assets.yesterdayExpenditure }}</p>
        <p>当前京🐶：{{ assets.currentJingdou }}</p>
        <p>当前🧧：{{ assets.currentRedenvelope }}</p>
        <p>京喜🧧：{{ assets.jingxiRedenvelope }}</p>
        <p>极速🧧：{{ assets.speedRedenvelope }}</p>
        <p>京东🧧：{{ assets.jdRedenvelope }}</p> -->
        <p>今日收入：{{ todayIncome }}</p>
        <p>昨日收入：{{ yesterdayIncome }}</p>
        <p>昨日支出：{{ yesterdayExpenditure }}</p>
        <p>当前京🐶：{{ currentJingdou }}</p>
        <p>当前🧧：{{ currentRedenvelope }}</p>
        <p>京喜🧧：{{ jingxiRedenvelope }}</p>
        <p>极速🧧：{{ speedRedenvelope }}</p>
        <p>京东🧧：{{ jdRedenvelope }}</p>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <p class="card-title">备注</p>
        <span class="card-subtitle">备注用于识别用户，强烈建议配置</span>
      </div>
      <div class="card-body">
        <el-input v-model="remark" placeholder="请输入内容"></el-input>
      </div>
      <div class="card-footer">
        <el-button size="small" type="success" @click="updateRemark" auto
          >保存</el-button
        >
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <p class="card-title">通知群</p>
        <span class="card-subtitle">进群关注资产变动</span>
      </div>
      <div class="card-body">
        <img
          class="flex flex-col w-48 m-auto mt-4"
          src="@/assets/qun.png"
          width="200"
          height="200"
          alt="qun"
        />
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <p class="card-title">常见活动位置</p>
        <span class="card-subtitle">下面是一些常见活动的位置</span>
      </div>
      <div class="card-body">
        <ul>
          <li
            v-for="(item, index) in activity"
            :key="index"
            class="leading-normal"
          >
            <span>{{ item.name }}：</span>
            <span class="pr-2">{{ item.address }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserInfoAPI,
  delAccountAPI,
  updateRemarkAPI,
  getUserAssetsAPI,
} from '@/api/index'
import { onMounted, reactive, toRefs, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  setup() {
    const imgUrl = ref('http://jd.qbquery.com/qun.png')
    const router = useRouter()
    const route = useRoute()
    const remark = ref([])
    let data = reactive({
      nickName: undefined,
      timestamp: undefined,
      todayIncome: 0,
      yesterdayIncome: 0,
      yesterdayExpenditure: 0,
      currentJingdou: 0,
      currentRedenvelope: 0.0,
      jingxiRedenvelope: 0.0,
      speedRedenvelope: 0.0,
      jdRedenvelope: 0.0,
    })

    // let assets = reactive({

    // })

    const srcList = ref(['https://jd.qbquery.com/qun.png'])
    const getInfo = async () => {
      const eid = localStorage.getItem('eid')
      if (!eid) {
        logout()
        return
      }
      const userInfo = await getUserInfoAPI(eid)
      console.log("userInfo=");
      console.log(userInfo)
      if (!userInfo) {
        ElMessage.error('获取用户信息失败，请重重新登录')
        logout()
        return
      }
      data.nickName = userInfo.data.nickName
      data.timestamp = new Date(userInfo.data.timestamp).toLocaleString()
      remark.value = userInfo.data.remark
    }

    const getUserAssets = async () => {
      const eid = localStorage.getItem('eid')
      if (!eid) {
        return
      }
      const userAssets = await getUserAssetsAPI(eid)
      if (!userAssets) {
        ElMessage.error('获取用户资产失败，请刷新页面')
        return
      }
      console.log(userAssets)
      // data.todayIncome = userAssets
    }

    // onMounted(getInfo)
    onMounted(() => {
      getInfo()
      // getQrcode()
      getUserAssets()
    })

    const logout = () => {
      localStorage.removeItem('eid')
      router.push('/login')
    }

    const delAccount = async () => {
      const eid = localStorage.getItem('eid')
      const body = await delAccountAPI({ eid })
      if (body.message !== '账户已移除') {
        ElMessage.error(body.message)
      } else {
        ElMessage.success(body.message)
        setTimeout(() => {
          logout()
        }, 1000)
      }
    }
    const updateRemark = async () => {
      const eid = localStorage.getItem('eid')
      const body = await updateRemarkAPI({ eid: eid, remark: remark.value })
      if (body.message !== '更新/上传备注成功') {
        ElMessage.error(body.message)
      } else {
        ElMessage.success(body.message)
      }
    }

    const openUrlWithJD = (url) => {
      const params = encodeURIComponent(
        `{"category":"jump","des":"m","action":"to","url":"${url}"}`
      )
      window.location.href = `openapp.jdmobile://virtual?params=${params}`
      console.log(window.location.href)
    }

    const activity = [
      {
        name: '玩一玩（可找到大多数活动）',
        address: '京东 APP 首页-频道-边玩边赚',
      },
      {
        name: '宠汪汪',
        address: '京东APP-首页/玩一玩/我的-宠汪汪',
      },
      {
        name: '东东萌宠',
        address: '京东APP-首页/玩一玩/我的-东东萌宠',
      },
      {
        name: '东东农场',
        address: '京东APP-首页/玩一玩/我的-东东农场',
      },
      {
        name: '东东工厂',
        address: '京东APP-首页/玩一玩/我的-东东工厂',
      },
      {
        name: '东东超市',
        address: '京东APP-首页/玩一玩/我的-东东超市',
      },
      {
        name: '领现金',
        address: '京东APP-首页/玩一玩/我的-领现金',
      },
      {
        name: '东东健康社区',
        address: '京东APP-首页/玩一玩/我的-东东健康社区',
      },
      {
        name: '京喜农场',
        address: '京喜APP-我的-京喜农场',
      },
      {
        name: '京喜牧场',
        address: '京喜APP-我的-京喜牧场',
      },
      {
        name: '京喜工厂',
        address: '京喜APP-我的-京喜工厂',
      },
      {
        name: '京喜财富岛',
        address: '京喜APP-我的-京喜财富岛',
      },
      {
        name: '京东极速版红包',
        address: '京东极速版APP-我的-红包',
      },
    ]

    return {
      ...toRefs(data),
      activity,
      imgUrl,
      srcList,
      getInfo,
      logout,
      delAccount,
      openUrlWithJD,
      updateRemark,
      remark,
      // assets:{
      //   todayIncome,
      //   yesterdayIncome,
      //   yesterdayExpenditure,
      //   currentJingdou,
      //   currentRedenvelope,
      //   jingxiRedenvelope,
      //   speedRedenvelope,
      //   jdRedenvelope
      // }
    }
  },
}
</script>
