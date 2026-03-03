import React, { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import './ECGCharts.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function ECGCharts({ ecgLeads }) {
  const chartRefs = [
    useRef(null), useRef(null), useRef(null),
    useRef(null), useRef(null), useRef(null)
  ]

  const getChartData = (leadData, leadName) => {
    if (!leadData || leadData.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: leadName,
          data: [],
          borderColor: '#000000',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0,
          pointRadius: 0,
          borderWidth: 1.5
        }]
      }
    }

    return {
      labels: leadData.map((_, index) => index),
      datasets: [{
        label: leadName,
        data: leadData.map(d => d.value),
        borderColor: '#000000',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0,
        pointRadius: 0,
        borderWidth: 1.5
      }]
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        },
        min: -150,
        max: 150
      }
    }
  }

  const leads = [
    { name: 'I', data: ecgLeads.leadI },
    { name: 'II', data: ecgLeads.leadII },
    { name: 'III', data: ecgLeads.leadIII },
    { name: 'aVR', data: ecgLeads.leadAVR },
    { name: 'aVL', data: ecgLeads.leadAVL },
    { name: 'aVF', data: ecgLeads.leadAVF }
  ]

  return (
    <div className="ecg-charts-container">
      <div className="ecg-leads-container">
        {leads.map((lead, index) => (
          <div key={index} className="ecg-lead-row">
            <div className="ecg-lead-label">{lead.name}</div>
            <div className="ecg-lead-chart">
              <Line
                ref={chartRefs[index]}
                data={getChartData(lead.data, lead.name)}
                options={chartOptions}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="ecg-footer">
        <div className="ecg-settings">25 mm/s 10 mm/mV</div>
        <button className="ecg-record-btn">Six-Lead EKG</button>
      </div>
    </div>
  )
}

export default ECGCharts
