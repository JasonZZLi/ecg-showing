# 推送代码到 GitHub 的步骤

## 问题：403 错误 - Write access to repository not granted

这通常是因为 Personal Access Token 权限不足。

## 解决方案

### 方法 1: 重新生成 Token（推荐）

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写信息：
   - **Note**: `ecg-showing-full-access`
   - **Expiration**: 选择有效期（如 90 days）
   - **勾选权限**：
     - ✅ `repo` - 全部仓库权限（展开后确保所有子权限都勾选）
       - ✅ repo:status
       - ✅ repo_deployment
       - ✅ public_repo
       - ✅ repo:invite
       - ✅ security_events
4. 点击 "Generate token"
5. **复制新生成的 token**（只显示一次！）

### 方法 2: 在终端使用新 Token 推送

在终端执行：

```bash
cd "/Users/jason/EMG Showing"

# 使用新token推送（替换 YOUR_NEW_TOKEN）
git push https://YOUR_NEW_TOKEN@github.com/JasonZZLi/ecg-showing.git main
```

或者：

```bash
# 设置远程URL（替换 YOUR_NEW_TOKEN）
git remote set-url origin https://YOUR_NEW_TOKEN@github.com/JasonZZLi/ecg-showing.git

# 推送
git push -u origin main
```

### 方法 3: 使用 GitHub Desktop（最简单）

1. 下载安装 GitHub Desktop：https://desktop.github.com/
2. 打开 GitHub Desktop
3. File → Add Local Repository
4. 选择：`/Users/jason/EMG Showing`
5. 点击 "Publish repository"
6. 选择仓库：`JasonZZLi/ecg-showing`
7. 点击 "Publish repository"

### 方法 4: 使用 SSH（如果已配置 SSH 密钥）

```bash
cd "/Users/jason/EMG Showing"
git remote set-url origin git@github.com:JasonZZLi/ecg-showing.git
git push -u origin main
```

## 推送成功后

告诉我，我会帮你：
1. 部署到 GitHub Pages
2. 配置访问链接
