<template>
  <div class="me">
    <div class="user">
      <div class="user-info">
        <p>{{ user.name }}</p>
        <p>{{ user.company }}</p>
      </div>
      <div class="user-head">
        <img :src="user.head" alt="" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="user-temperature">
      <van-tabs sticky animated @click="onTabClick">
        <van-tab title="近7天" name="7days">
          <template v-if="Object.keys(temperatureOf7days).length > 0">
            <van-collapse v-model="active7daysNames">
              <van-collapse-item
                v-for="cityCode in Object.keys(temperatureOf7days)"
                :key="cityCode"
                :title="cityCode | formatCityName"
                :name="cityCode"
              >
                <van-cell center v-for="temperature in temperatureOf7days[cityCode]" :key="temperature.id">
                  <template #title>
                    <span class="custom-cell-title">{{ temperature.time | formatTime }}</span>
                  </template>
                  <template>
                    <span :class="['custom-cell-value', { danger: temperature.num > 37.3 }]">
                      {{ temperature.num }}°C
                    </span>
                  </template>
                </van-cell>
              </van-collapse-item>
            </van-collapse>
          </template>
          <div v-else class="no-data">
            <p>暂无数据</p>
          </div>
        </van-tab>
        <van-tab title="近14天" name="14days">
          <template v-if="Object.keys(temperatureOf14days).length > 0">
            <van-collapse v-model="active14daysNames">
              <van-collapse-item
                v-for="cityCode in Object.keys(temperatureOf14days)"
                :key="cityCode"
                :title="cityCode | formatCityName"
                :name="cityCode"
              >
                <van-cell center v-for="temperature in temperatureOf14days[cityCode]" :key="temperature.id">
                  <template #title>
                    <span class="custom-cell-title">{{ temperature.time | formatTime }}</span>
                  </template>
                  <template>
                    <span :class="['custom-cell-value', { danger: temperature.num > 37.3 }]">
                      {{ temperature.num }}°C
                    </span>
                  </template>
                </van-cell>
              </van-collapse-item>
            </van-collapse>
          </template>
          <div v-else class="no-data">
            <p>暂无数据</p>
          </div>
        </van-tab>
        <van-tab title="近30天" name="30days">
          <template v-if="Object.keys(temperatureOf30days).length > 0">
            <van-collapse v-model="active30daysNames">
              <van-collapse-item
                v-for="cityCode in Object.keys(temperatureOf30days)"
                :key="cityCode"
                :title="cityCode | formatCityName"
                :name="cityCode"
              >
                <van-cell center v-for="temperature in temperatureOf30days[cityCode]" :key="temperature.id">
                  <template #title>
                    <span class="custom-cell-title">{{ temperature.time | formatTime }}</span>
                  </template>
                  <template>
                    <span :class="['custom-cell-value', { danger: temperature.num > 37.3 }]">
                      {{ temperature.num }}°C
                    </span>
                  </template>
                </van-cell>
              </van-collapse-item>
            </van-collapse>
          </template>
          <div v-else class="no-data">
            <p>暂无数据</p>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import PCCode from '../assets/pc-code'

export default {
  name: 'Me',
  data() {
    return {
      user: {
        name: '',
        company: '',
        head: ''
      },
      activeTabName: '7days',
      active7daysNames: [],
      temperatureOf7days: {},
      active14daysNames: [],
      temperatureOf14days: {},
      active30daysNames: [],
      temperatureOf30days: {}
    }
  },
  created() {
    this.getUserInfo()
    this.getUserTemperatures(7)
  },
  filters: {
    formatTime(time) {
      return dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')
    },
    formatCityName(code) {
      const provinceCode = code.substring(0, 2)
      const filteredProvince = PCCode.filter(province => province.code === provinceCode)

      if (filteredProvince.length > 0) {
        const province = filteredProvince[0]

        const filteredCity = province.children.filter(city => city.code === code)
        if (filteredCity.length > 0) {
          return `${province.name} · ${filteredCity[0].name}`
        }

        return province.name
      }

      return code
    }
  },
  methods: {
    calculateTimePeriod(days) {
      return {
        start: dayjs()
          .subtract(days, 'day')
          .unix(),
        end: dayjs().unix()
      }
    },
    async getUserInfo() {
      try {
        const res = await this.$api.getUserInfo()
        if (res.code === 0) {
          this.user.name = res.data.username
          this.user.company = res.data.company
          this.user.head = res.data.face_image
        }
      } catch (e) {
        this.$notify({ type: 'danger', message: e.data.msg })
      }
    },
    async getUserTemperatures(days) {
      const period = this.calculateTimePeriod(days)
      try {
        const res = await this.$api.getUserTemperatures({
          start_time: period.start,
          end_time: period.end
        })
        this[`temperatureOf${days}days`] = res.data
      } catch (e) {
        this.$notify({ type: 'danger', message: e.data.msg })
      }
    },
    onTabClick(name) {
      switch (name) {
        case '7days':
          this.getUserTemperatures(7)
          break
        case '14days':
          this.getUserTemperatures(14)
          break
        case '30days':
          this.getUserTemperatures(30)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less">
.me {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 100px;
    background-color: #ffffff;
  }

  .user-info {
    flex: 1;

    p {
      font-size: 17px;
      color: #333333;

      &:last-child {
        font-size: 13px;
        color: #999999;
      }
    }
  }

  .user-head {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .divider {
    height: 15px;
    background-color: #f7f7f7;
  }

  .van-tabs {
    .van-tabs__line {
      background-color: #477afb;
    }
  }

  .no-data {
    p {
      margin-top: 24px;
      color: #999999;
      text-align: center;
    }
  }

  .custom-cell-title {
    color: #aaaaaa;
  }

  .custom-cell-value {
    color: #3198f4;

    &.danger {
      color: #ff0000;
    }
  }
}
</style>
