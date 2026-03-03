import React from 'react'
import './StatusDisplay.css'

function StatusDisplay({ status }) {
  const getBatteryColor = (battery) => {
    if (battery > 60) return '#4ade80'
    if (battery > 30) return '#fbbf24'
    return '#ef4444'
  }

  const getHeartRateColor = (rate) => {
    if (rate >= 60 && rate <= 100) return '#4ade80'
    if (rate >= 50 && rate < 60) return '#fbbf24'
    if (rate > 100) return '#f87171'
    return '#ef4444'
  }

  return (
    <div className="status-display">
      <div className="status-card ecg-leads-card">
        <div className="status-label">3极ECG导联</div>
        <div className="ecg-leads">
          <div className="ecg-lead-item">
            <span className="ecg-lead-label">VR</span>
            <span className="ecg-lead-value">{status.vr.toFixed(2)}</span>
          </div>
          <div className="ecg-lead-item">
            <span className="ecg-lead-label">VL</span>
            <span className="ecg-lead-value">{status.vl.toFixed(2)}</span>
          </div>
          <div className="ecg-lead-item">
            <span className="ecg-lead-label">VF</span>
            <span className="ecg-lead-value">{status.vf.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="status-card battery-card">
        <div className="status-label">电量</div>
        <div className="status-value">
          <div className="battery-container">
            <div 
              className="battery-level"
              style={{ 
                width: `${status.battery}%`,
                backgroundColor: getBatteryColor(status.battery)
              }}
            />
            <span className="battery-text">{status.battery.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="status-card heart-rate-card">
        <div className="status-label">心率</div>
        <div className="status-value">
          <span 
            className="heart-rate-value"
            style={{ color: getHeartRateColor(status.heartRate) }}
          >
            {status.heartRate}
          </span>
          <span className="heart-rate-unit"> bpm</span>
        </div>
      </div>
    </div>
  )
}

export default StatusDisplay
