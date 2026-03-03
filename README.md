# ECG传感器数据展示系统

一个实时显示3个ECG传感器数据的Web应用程序，支持设备切换、电量监控、心率显示和3极ECG导联（VR、VL、VF）计算显示。

## 功能特性

- ✅ 同时连接和显示3个ECG传感器的实时数据
- ✅ 实时数据可视化（3个独立的图表）
- ✅ 3极ECG导联计算（VR、VL、VF）
- ✅ 电量监控（带颜色指示）
- ✅ 心率显示（带健康状态指示）
- ✅ 设备切换功能

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 使用说明

1. 在页面顶部选择要连接的设备
2. 选择设备后，系统会自动开始接收和显示ECG数据
3. 左侧面板显示：
   - 3极ECG导联值（VR、VL、VF）- 从3个传感器数据实时计算
   - 设备电量（带颜色指示：绿色>60%，黄色30-60%，红色<30%）
   - 心率（带健康状态指示）
4. 右侧显示3个ECG传感器的实时数据图表

## 技术栈

- React 18
- Vite
- Chart.js / react-chartjs-2
- CSS3 (带渐变和毛玻璃效果)

## 项目结构

```
EMG Showing/
├── src/
│   ├── components/
│   │   ├── DeviceSelector.jsx    # 设备选择器
│   │   ├── ECGCharts.jsx         # ECG数据图表组件
│   │   └── StatusDisplay.jsx     # 状态显示组件（VR/VL/VF、电量、心率）
│   ├── App.jsx                   # 主应用组件
│   ├── App.css
│   ├── main.jsx                  # 入口文件
│   └── index.css                 # 全局样式
├── index.html
├── package.json
└── vite.config.js
```

## 后续开发

要连接真实的ECG传感器，需要：
1. 实现实际的蓝牙/USB连接逻辑
2. 替换模拟数据生成器为真实数据接收器
3. 根据实际传感器协议解析数据
4. 确保3个传感器分别对应Right Arm (RA)、Left Arm (LA)、Left Foot (LF)# ecg-showing
