import React, { useState } from 'react'
import './TopBar.css'

function TopBar({ devices, selectedDevice, onDeviceChange, status }) {
  const [showDeviceMenu, setShowDeviceMenu] = useState(false)

  const formatTime = (seconds) => {
    return Math.floor(seconds).toString().padStart(2, '0')
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <button className="settings-btn" title="设置">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
          </svg>
        </button>
        <div className="device-selector-container">
          <button 
            className="device-name-btn"
            onClick={() => setShowDeviceMenu(!showDeviceMenu)}
          >
            {selectedDevice ? `Selected Device ${selectedDevice.name}` : 'Select Device'}
          </button>
          {showDeviceMenu && (
            <div className="device-menu">
              {devices.map(device => (
                <button
                  key={device.id}
                  className={`device-menu-item ${selectedDevice?.id === device.id ? 'active' : ''}`}
                  onClick={() => {
                    onDeviceChange(device)
                    setShowDeviceMenu(false)
                  }}
                >
                  {device.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="top-bar-center">
        <div className="heart-rate-display">
          <svg className="heart-icon" width="24" height="24" viewBox="0 0 24 24" fill="#ef4444">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="heart-rate-value">{status.heartRate}</span>
          <span className="heart-rate-unit"> BPM</span>
        </div>
        <div className="timer-display">
          <div className="timer-circle">
            <span className="timer-value">{formatTime(status.recordingTime)}</span>
          </div>
        </div>
      </div>

      <div className="top-bar-right">
        <div className="battery-display">
          <svg className="battery-icon" width="20" height="12" viewBox="0 0 24 12" fill="none" stroke="#22c55e" strokeWidth="2">
            <rect x="2" y="4" width="18" height="8" rx="1"/>
            <rect x="20" y="6" width="2" height="4" rx="0.5"/>
            <rect x="3" y="5" width={`${(status.battery / 100) * 16}`} height="6" fill="#22c55e"/>
          </svg>
          <span className="battery-label">Battery</span>
        </div>
        <button className="close-btn" title="关闭">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TopBar
