import React, { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import ECGCharts from './components/ECGCharts'
import './App.css'

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [devices, setDevices] = useState([])
  const [ecgData, setEcgData] = useState({
    sensor1: [], // RA (Right Arm)
    sensor2: [], // LA (Left Arm)
    sensor3: []  // LF (Left Foot)
  })
  const [ecgLeads, setEcgLeads] = useState({
    leadI: [],
    leadII: [],
    leadIII: [],
    leadAVR: [],
    leadAVL: [],
    leadAVF: []
  })
  const [status, setStatus] = useState({
    battery: 100,
    heartRate: 72,
    recordingTime: 0
  })

  // 模拟设备列表
  useEffect(() => {
    const mockDevices = [
      { id: 'device1', name: 'KardiaMobile 6L', connected: false },
      { id: 'device2', name: 'ECG设备 2', connected: false },
      { id: 'device3', name: 'ECG设备 3', connected: false }
    ]
    setDevices(mockDevices)
  }, [])

  // 连接设备并开始接收数据
  useEffect(() => {
    if (!selectedDevice) return

    // 更新设备连接状态
    setDevices(prev => prev.map(device => 
      device.id === selectedDevice.id 
        ? { ...device, connected: true }
        : { ...device, connected: false }
    ))

    // 模拟ECG数据流 - 生成类似真实ECG的波形
    let timeOffset = 0
    const interval = setInterval(() => {
      const now = Date.now()
      timeOffset += 0.05
      
      // 生成类似ECG的波形（PQRST复合波）
      const generateECGWave = (offset, phase, amplitude) => {
        const t = timeOffset + phase
        const heartRate = 75 // BPM
        const cycleTime = 60 / heartRate // 每个心跳周期的时间
        const cyclePos = (t % cycleTime) / cycleTime
        
        // P波
        const pWave = cyclePos < 0.15 ? Math.exp(-Math.pow((cyclePos - 0.08) / 0.03, 2)) * 15 : 0
        // QRS复合波
        const qrsWave = cyclePos >= 0.15 && cyclePos < 0.25 
          ? -Math.exp(-Math.pow((cyclePos - 0.2) / 0.02, 2)) * 80 
          : 0
        // T波
        const tWave = cyclePos >= 0.25 && cyclePos < 0.5
          ? Math.exp(-Math.pow((cyclePos - 0.35) / 0.08, 2)) * 30
          : 0
        
        const baseValue = amplitude + Math.sin(t * 0.1) * 5
        const noise = (Math.random() - 0.5) * 3
        
        return baseValue + pWave + qrsWave + tWave + noise
      }
      
      const newData1 = {
        time: now,
        value: generateECGWave(timeOffset, 0, 10)
      }
      const newData2 = {
        time: now,
        value: generateECGWave(timeOffset, 0.1, 15)
      }
      const newData3 = {
        time: now,
        value: generateECGWave(timeOffset, 0.2, 20)
      }

      setEcgData(prev => {
        const updated = {
          sensor1: [...prev.sensor1.slice(-199), newData1],
          sensor2: [...prev.sensor2.slice(-199), newData2],
          sensor3: [...prev.sensor3.slice(-199), newData3]
        }

        // 计算6个ECG导联
        // sensor1 = RA (Right Arm), sensor2 = LA (Left Arm), sensor3 = LF (Left Foot)
        const ra = newData1.value
        const la = newData2.value
        const lf = newData3.value
        
        // 标准导联
        const leadI = la - ra      // I = LA - RA
        const leadII = lf - ra     // II = LF - RA
        const leadIII = lf - la    // III = LF - LA
        
        // 增强导联 (augmented leads)
        const leadAVR = -(leadI + leadII) / 2  // aVR = -(I + II) / 2
        const leadAVL = leadI - leadII / 2     // aVL = I - II / 2
        const leadAVF = leadII - leadI / 2     // aVF = II - I / 2

        // 更新导联数据
        setEcgLeads(prev => ({
          leadI: [...prev.leadI.slice(-199), { time: now, value: leadI }],
          leadII: [...prev.leadII.slice(-199), { time: now, value: leadII }],
          leadIII: [...prev.leadIII.slice(-199), { time: now, value: leadIII }],
          leadAVR: [...prev.leadAVR.slice(-199), { time: now, value: leadAVR }],
          leadAVL: [...prev.leadAVL.slice(-199), { time: now, value: leadAVL }],
          leadAVF: [...prev.leadAVF.slice(-199), { time: now, value: leadAVF }]
        }))

        // 更新状态数据
        setStatus(prev => ({
          ...prev,
          battery: Math.max(0, prev.battery - 0.0001),
          heartRate: 70 + Math.floor(Math.random() * 10),
          recordingTime: prev.recordingTime + 0.05
        }))

        return updated
      })
    }, 50) // 每50ms更新一次数据

    return () => clearInterval(interval)
  }, [selectedDevice])

  const handleDeviceChange = (device) => {
    setSelectedDevice(device)
    // 重置数据
    setEcgData({
      sensor1: [],
      sensor2: [],
      sensor3: []
    })
    setEcgLeads({
      leadI: [],
      leadII: [],
      leadIII: [],
      leadAVR: [],
      leadAVL: [],
      leadAVF: []
    })
    setStatus(prev => ({ ...prev, recordingTime: 0 }))
  }

  return (
    <div className="app">
      <TopBar
        devices={devices}
        selectedDevice={selectedDevice}
        onDeviceChange={handleDeviceChange}
        status={status}
      />
      <ECGCharts ecgLeads={ecgLeads} />
    </div>
  )
}

export default App
