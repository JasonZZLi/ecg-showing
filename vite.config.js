import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 如果部署到GitHub Pages，需要设置base路径
// 如果仓库名是 "ecg-showing"，则base应该是 "/ecg-showing/"
// 如果是 "username.github.io"，则base应该是 "/"
const repositoryName = process.env.REPO_NAME || 'ecg-showing'
const base = process.env.NODE_ENV === 'production' ? `/${repositoryName}/` : '/'

export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})
