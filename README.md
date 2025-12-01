# Lunavoe Wedding RSVP

## 使用说明

1. 修改 worker/wrangler.toml:
   - account_id 替换为你的 Cloudflare 账号 ID
   - KV Namespace ID 替换为你的 RSVP_DATA KV Namespace ID

2. 提交代码到 GitHub:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/lunavoe-gloriawithjunman.git
   git push -u origin main

3. 在 Cloudflare Workers → Create Application → Continue with GitHub → 选择仓库
   - 自动部署 Worker
   - 绑定 KV

4. 前端提交表单 URL 替换为 Worker URL

5. 访问前端页面即可提交 RSVP
