import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
let options={
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
  },
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
  markers: {
    size: 0
  },
  xaxis: {
    // type: 'datetime'
  },
  yaxis: {
    title: {
      text: 'Points',
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
  
      }
    }
  }
}

let optionPara= {
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories:['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
    },
    yaxis: {
      title: {
        text: 'Rs'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return   "Rs "+val + "/-"
        }
      }
    }
  }
}

const FinanceChart = () => {
  const [data,setData] = useState([])
  const [option,setOption] = useState({})
  const [monthWise,setMonthWise] = useState({})
  const [series,setSeries] = useState([])
  useEffect(()=>{
    axios.get("https://codersid-backend.vercel.app/api/paymentrecords").then((res)=>{
          let sale=dataprocess("sale",res.data.Payments)
          console.log(sale)
          let expenses=dataprocess("Expenses",res.data.Expenses)
          let profitData = []
          for(let i =0; i<sale.data.length;i++)
          {
            profitData.push(sale.data[i]-expenses.data[i])
          }
          let seriesData = [sale,expenses,{name:"profit/loss",data:[...profitData],type: 'line',}]

          setSeries(seriesData)


    }).catch(err=>{
      console.log(err)
    })
  },[])

  const dataprocess = (type,data)=>{
    let allData = data
    console.log(allData)
    for(let i= 0; i<allData.length;i++)
    {
      allData[i].month = dateFormat(allData[i].createdAt)
      // optionPara.options.xaxis.categories.push(dateFormat(String(allData[i].createdAt)))
      // if(!optionPara.options.xaxis.categories.includes(allData[i].month))
      // {
      //   optionPara.options.xaxis.categories.push(allData[i].month)
      // }
    }
    let monthly = groupBy("month",allData)
    console.log(monthly)
    let monthlyTotal=[]
    let obj = Object.keys(monthly)
    for(let i=0;i<obj.length;i++)
    {
      let total =0
      monthly[obj[i]].forEach(v=>{
        total+= v.Amount
      })
      monthlyTotal.push(total)
    }
    let seriesData= 
     {name:type,data:[...monthlyTotal],type:"column"}
    
    
    console.log(seriesData)
    return seriesData
    // optionPara.options.xaxis.categories= Object.keys(monthly)
    setMonthWise(monthly)
    setData(allData)
  }

  const groupBy = (name,arr)=>{
    let obj = {"Jan":[],'Feb':[], 'Mar':[], 'Apr':[], 'May':[], 'Jun':[], 'Jul':[], 'Aug':[], 'Sep':[], 'Oct':[],'Nov':[],'Dec':[]}
    for (let i=0;i<arr.length;i++)
    {
      if(obj[arr[i][name]])
      {
        obj[arr[i][name]].push(arr[i])
      }
      else{
        obj[arr[i][name]]= [arr[i]]
      }
    }

    return obj
  }

  const dateFormat=(val)=>{
    let m = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec']
    let date= new Date(val).getMonth()
    return m[date]
  }
  return (
    <div className='text-center'>
      <Chart options={options} series={series} type="line" width={"100%"} height={320} />
    </div>
  );
}

export default FinanceChart;
