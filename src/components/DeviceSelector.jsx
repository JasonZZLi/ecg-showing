import React from 'react'
import './DeviceSelector.css'

function DeviceSelector({ devices, selectedDevice, onDeviceChange }) {
  return (
    <div className="device-selector">
      <label htmlFor="device-select">选择设备：</label>
      <select
        id="device-select"
        value={selectedDevice?.id || ''}
        onChange={(e) => {
          const device = devices.find(d => d.id === e.target.value)
          if (device) onDeviceChange(device)
        }}
        className="device-select"
      >
        <option value="">-- 请选择设备 --</option>
        {devices.map(device => (
          <option key={device.id} value={device.id}>
            {device.name} {device.connected ? '✓' : ''}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DeviceSelector
