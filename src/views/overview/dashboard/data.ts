import { getUnit } from "@/components/IDataDisplay/src/helpers";
import echarts from '@/utils/echarts';

export const option = {
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      data: [],
      type: 'bar',
      barWidth: '25%',
      itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8bd46e'
            }, {
                offset: 1,
                color: '#09bcb7'
            }]),
            barBorderRadius: 5,
        }
        
      },
    },
  ],
};
const unitFormatter = (params) => {
  const { data } = params  
  return !['disk', 'bandwidth'].includes(data.unit)
    ? `${data.name} ` + data.value + ` ${data.unit}`
    : `${data.name} ` +
        getUnit(data.unit, data.value).val +
        ` ${getUnit(data.unit, data.value).unit}`
}
export const qutaPieOption = (name, data, index) => ({
  grid: {
    top: 0,
    bottom: 0,
  },
  title: {
    text: name,
    textStyle: {
      fontSize: 15,
    },
  },
  tooltip: {
    trigger: 'item',
  },
  color: ['#3B80E2', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'].splice(index, 2),
  legend: {
    orient: 'vertical',
    show: true,
    selectedMode: false,
    top: 50,
    left: 'left',
    itemWidth: 12,
    itemHeight: 8,
    textStyle: {
      color: '#777',
      fontSize: 10,
    },
  },
  series: [
    {
      name,
      type: 'pie',
      radius: '50%',
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
      },
      label: {
        show: true,
        color: '#777',
        formatter: unitFormatter,
        textStyle: {
          fontSize: 12,
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
        label: {
          show: true,
          fontSize: '16',
          fontWeight: 'bold',
          formatter: unitFormatter,
          color: '#000',
        },
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 10,
        smooth: true,
      },
      data,
    },
  ],
});
