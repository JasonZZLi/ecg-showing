# GitHub Pages 部署指南

## 步骤 1: 在GitHub上创建仓库

1. 访问 https://github.com/new
2. 创建新仓库，例如命名为 `ecg-showing`（或你喜欢的名字）
3. **不要**初始化README、.gitignore或license（我们已经有了）
4. 点击"Create repository"

## 步骤 2: 连接到GitHub仓库并推送代码

在终端运行以下命令（将 `YOUR_USERNAME` 替换为你的GitHub用户名，`REPO_NAME` 替换为你的仓库名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 推送代码
git branch -M main
git push -u origin main
```

## 步骤 3: 安装部署依赖

```bash
npm install
```

## 步骤 4: 配置仓库名称（如果仓库名不是 ecg-showing）

编辑 `vite.config.js`，将 `repositoryName` 改为你的实际仓库名：

```javascript
const repositoryName = '你的仓库名'
```

## 步骤 5: 部署到GitHub Pages

```bash
npm run deploy
```

## 步骤 6: 启用GitHub Pages

1. 访问你的GitHub仓库页面
2. 点击 Settings（设置）
3. 在左侧菜单找到 Pages
4. 在 Source 下选择 "gh-pages" 分支
5. 点击 Save

## 访问你的应用

部署完成后，你的应用将在以下地址可访问：
`https://YOUR_USERNAME.github.io/REPO_NAME/`

注意：首次部署可能需要几分钟时间才能生效。
