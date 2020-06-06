<template>
    <div id="mapChart" class="chart" :style="{height:height,width:width}"></div>
</template>

<script>
// import cityMap from '@/utils/china-main-city-map.js'
import echarts from 'echarts'
import axios from 'axios'
var color = ['#a6c84c', '#ffa022', '#46bee9']
var geoCoordMap = {
  // // 备用
  // 新竹市: [120.968798, 24.806738],
  // 佛山: [112.8955, 23.1097],
  // 咸阳: [108.4131, 34.8706],
  // 延安: [109.1052, 36.4252],
  // 张家口: [115.1477, 40.8527],
  // 德州: [116.6858, 37.2107],
  // 惠州: [114.6204, 23.1647],
  // 汕头: [117.1692, 23.3405],
  // 江门: [112.6318, 22.1484],
  // 泰州: [120.0586, 32.5525],
  // // 湖南
  // 长沙: [113.0823, 28.2568],
  // 张家界: [109.4, 28.52],
  // 常德: [111.68, 29.05],
  // 衡阳: [112.57, 26.9],
  // 岳阳: [113.12, 29.37],
  // 湘潭: [112.5439, 27.7075],
  // // 云南
  // 昆明: [102.9199, 25.4663],
  // 保山: [99.17, 25.12],
  // 西双版纳: [100.8, 22.02],
  // 临沧: [100.8, 23.88],
  // 迪庆: [99.7, 27.83],
  // 德宏: [98.58, 24.43],
  // 普洱: [101.03, 23.7],
  // 昭通: [103.72, 27.33],
  // 丽江: [100.23, 26.88],
  // 大理: [100.23, 25.6],
  // 怒江: [98.85, 25.85],
  // 文山: [104.25, 23.37],
  // 玉溪: [101.9312, 23.8898],
  // // 单独
  // 北京: [116.4551, 40.2539],
  // 上海: [121.4648, 31.2891],
  // 天津: [117.4219, 39.4189],
  // // 四川
  // 成都: [103.9526, 30.7617],
  // 凉山: [102.27, 27.9],
  // 绵阳: [104.73, 31.47],
  // 德阳: [104.38, 31.13],
  // 宜宾: [104.62, 28.77],
  // // 宁夏
  // 银川: [106.3586, 38.1775],
  // // 新疆
  // 乌鲁木齐: [87.9236, 43.5883],
  // // 内蒙古
  // 呼和浩特: [111.4124, 40.4901],
  // 鄂尔多斯: [108.9734, 39.2487],
  // 赤峰: [118.92, 42.27],
  // 呼伦贝尔: [119.77, 43.95],
  // 锡林郭勒: [116.07, 43.95],
  // // 吉林
  // 长春: [125.8154, 44.2584],
  // // 安徽
  // 合肥: [117.29, 32.0581],
  // 芜湖: [118.38, 31.33],
  // 六安: [116.5, 31.77],
  // 淮南: [117.0, 32.63],
  // // 重庆
  // 重庆: [107.7539, 30.1904],
  // // 甘肃
  // 兰州: [103.5901, 36.3043],
  // // 山东
  // 威海: [122.12, 37.52],
  // 青岛: [120.38, 36.07],
  // 济南: [116.98, 36.67],
  // // 山西
  // 大同: [113.7854, 39.8035],
  // 太原: [112.3352, 37.9413],
  // 运城: [110.98, 35.02],
  // 吕梁: [111.13, 37.52],
  // 长治: [113.12, 36.2],
  // // 广东
  // 广州: [113.5107, 23.2196],
  // 深圳: [114.5435, 22.5439],
  // 梅州: [116.12, 24.28],
  // 东莞: [113.8953, 22.901],
  // 清远: [112.9175, 24.3292],
  // 珠海: [113.7305, 22.1155],
  // 揭阳: [116.37, 23.55],
  // // 广西
  // 南宁: [108.479, 23.1152],
  // 钦州: [108.62, 21.95],
  // 桂林: [110.28, 25.28],
  // 柳州: [109.3799, 24.9774],
  // 北海: [109.314, 21.6211],
  // // 江苏
  // 南京: [118.8062, 31.9208],
  // 苏州: [120.6519, 31.3989],
  // 南通: [121.1023, 32.1625],
  // 常州: [119.4543, 31.5582],
  // 无锡: [120.3442, 31.5527],
  // // 江西
  // 南昌: [116.0046, 28.6633],
  // 吉安: [114.98, 27.12],
  // 赣州: [114.93, 25.83],
  // 抚州: [116.35, 28.0],
  // 萍乡: [113.85, 27.63],
  // // 河北
  // 廊坊: [116.521, 39.0509],
  // 石家庄: [114.4995, 38.1006],
  // 秦皇岛: [119.2126, 40.0232],
  // 保定: [115.0488, 39.0948],
  // // 河南
  // 郑州: [113.4668, 34.6234],
  // 南阳: [112.52, 33.0],
  // 信阳: [114.07, 32.13],
  // 焦作: [113.52, 35.22],
  // // 浙江
  // 温州: [120.498, 27.8119],
  // 杭州: [119.5313, 29.8773],
  // 宁波: [121.5967, 29.6466],
  // // 海南
  // 海口: [110.3893, 19.8516],
  // 三亚: [109.5, 18.25],
  // 东方: [108.63, 19.1],
  // // 湖北
  // 武汉: [114.3896, 30.6628],
  // 宜昌: [111.28, 30.7],
  // // 福建
  // 厦门: [118.1689, 24.6478],
  // 福州: [119.4543, 25.9222],
  // // 西藏
  // 拉萨: [91.1865, 30.1465],
  // 阿里: [80.1, 32.5],
  // 日喀则: [88.88, 29.27],
  // 昌都: [97.18, 31.13],
  // // 贵阳
  // 贵阳: [106.6992, 26.7682],
  // 毕节: [105.28, 27.3],
  // 黔东南: [107.97, 26.58],
  // 兴义: [104.9, 25.08],
  // // 辽宁
  // 大连: [122.2229, 39.4409],
  // 沈阳: [123.1238, 42.1216],
  // 阜新: [121.67, 42.02],
  // // 陕西
  // 西安: [109.1162, 34.2004],
  // 榆林: [109.73, 38.28],
  // // 青海
  // 西宁: [101.4038, 36.8207],
  // 海西: [97.37, 37.37],
  // // 黑龙江
  // 哈尔滨: [127.9688, 45.368],
  // 鹤岗: [130.27, 47.33]
  // // '河北':[114.502461, 38.045474]
}

var KMData = [

]
// 中国地图（第一级地图）的ID、Name、Json数据
var chinaId = 100000
var chinaName = 'china'
var chinaJson = null

// Echarts地图全局变量，主要是在返回上级地图的方法中会用到
var myChart = null
var options = {}
export default {
  name: 'chinaMap',
  components: {
  },
  mounted: function () {
    this.mapChart('mapChart')
  },
  data () {
    return {
      provence: false
    }
  },
  props: {
    code: {
      type: Number,
      default: 100000
    },
    geoCoordMap: {
      type: Array,
      default: function () {
        return []
      }
    },
    KMData: {
      type: Array,
      default: function () {
        return []
      }
    },
    options: {
      type: Object,
      default: function () {
        return {
          map: 'china',

          // 地图距离上下左右的边距
          // left:0,
          // right:0,
          // bottom:0,
          // top:0,

          // 是否运行缩放移动
          // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          roam: true,
          // 当前视角的中心点
          center: null,
          // 视角
          // aspectScale:0.75,
          // 当前视角的缩放比例。
          zoom: 1,
          // 滚轮缩放的极限控制
          // scaleLimit: {
          //   max:4,
          //   min:1
          // },
          // 选中地图 single单选  multiple多选
          selectedMode: 'multiple',
          // 地图上文字样式与显示
          label: {
            show: true,
            color: '#fff',
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            // 地图线条颜色
            normal: {
              areaColor: 'rgba(12,82,124,.9)',
              borderColor: '#0A93C6',
              // 描边线条样式
              borderType: 'solid',
              // 描边宽度
              borderWidth: 1
              // 设置边框阴影
              //  shadowColor: 'rgba(0, 0, 0, 0.5)',
              //  shadowBlur: 10
            },
            // 鼠标经过时候的区域颜色
            emphasis: {
              areaColor: '#355AC3'
            }
          },
          // 地图中对特定的区域配置样式。
          regions: [
            // {
            //   name: "河南",
            //   itemStyle: {
            //     areaColor: "red",
            //     color: "red"
            //   }
            // },
            // {
            //   name: "焦作市",
            //   itemStyle: {
            //     areaColor: "red",
            //     color: "red"
            //   }
            // }
          ]
        }
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  methods: {
    /**
     * Echarts地图
     */
    mapChart (divid) {
      geoCoordMap = this.geoCoordMap
      KMData = this.KMData
      options = this.options
      axios
        .get('./static/json/map/' + this.code + '.json', {})
        .then(response => {
          const mapJson = response.data
          chinaJson = mapJson
          myChart = echarts.init(document.getElementById(divid))
          registerAndsetOption(myChart, chinaName, mapJson)
        })
    }
  }
}
/**
 *
 * @param {*} myChart
 * @param {*} id        省市县Id
 * @param {*} name      省市县名称
 * @param {*} mapJson   地图Json数据
 * @param {*} flag      是否往mapStack里添加parentId，parentName
 */
function registerAndsetOption (myChart, name, mapJson) {
  echarts.registerMap(name, mapJson)
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: function (params, ticket, callback) {
        if (params.seriesType === 'effectScatter') {
          return params.data.name + '' + params.data.value[2]
        } else if (params.seriesType === 'lines') {
          return (
            params.data.fromName +
            '->' +
            params.data.toName +
            '<br />' +
            params.data.value
          )
        } else {
          return params.name
        }
      }
    },
    geo: options,
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            color: 'skyblue',
            formatter: '{b}'
          }
        },

        itemStyle: {
          normal: {
            color: 'yellow'
          }
        },
        data: geoCoordMap
        // data: [{
        //   name: '河南',
        //   value: [113.52, 35.22, 1525]
        // },
        // {
        //   name: '河南2',
        //   value: [106.3586, 38.1775, 1525]
        // }]
        // data: KMData.map(dataItem => {
        //   console.log(geoCoordMap[dataItem.name].concat([dataItem.value]), ' geoCoordMap[dataItem.name].concat([dataItem.value])')
        //   return {
        //     name: dataItem.name,
        //     value: geoCoordMap[dataItem.name].concat([dataItem.value])
        //   }
        // })
      }
    ]
  })
}
</script>

<style scoped>
/*  */
</style>
