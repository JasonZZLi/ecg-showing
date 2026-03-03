# 创建 GitHub 仓库步骤

## 方法 1: 通过网页创建（推荐）

1. 访问：https://github.com/new
2. 填写信息：
   - **Repository name**: `ecg-showing`
   - **Description**: `ECG Sensor Data Display Application`
   - 选择 **Public** 或 **Private**
   - **不要勾选**以下选项：
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
3. 点击 **"Create repository"**

## 方法 2: 使用 GitHub CLI（如果已安装）

在终端运行：
```bash
gh repo create ecg-showing --public --source=. --remote=origin --push
```

## 创建完成后

告诉我，我会帮你推送代码并部署！
