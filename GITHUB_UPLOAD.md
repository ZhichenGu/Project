# 复制到 GitHub Desktop 仓库

1. 在 GitHub Desktop 中打开或创建自己的本地仓库，用「Show in Finder」打开仓库文件夹。
2. 把本包 Visuals-GitHub 文件夹**里面的全部内容**复制到该仓库根目录。根目录应直接出现 package.json、index.html、src 和 public，不要再多套一层文件夹。隐藏文件 .gitignore 和 .gitattributes 也要复制（Mac 可按 Command + Shift + . 显示）。保留本地仓库原有的 .git 文件夹，不要覆盖它。
3. 回到 GitHub Desktop，确认变更中没有 node_modules、dist、.env 或账户凭据；填写说明，例如「Add Visuals refrigerator installation」，然后 Commit。
4. 新仓库使用 Publish repository；已有远端使用 Push origin。仓库是否公开由你决定。现包含 Pages 构建部署工作流，需按下方说明首次选择 GitHub Actions。

## 在另一台电脑运行

安装 Node.js 20.19+ 或 22.12+，在仓库目录运行：

```sh
npm ci --registry=https://registry.npmjs.org
npm run dev
```

打开给出的本机地址。首次按 O 或空格开门；D 状态、H 帮助默认隐藏。F 全屏、S 声音、T 字幕、R 重置。屏幕已确认竖装 2400×3840（5:8）。

构建：`npm run build`；预览构建：`npm run preview`。模型和贴图均在 public/assets/ 中，需随源代码一起提交。源码需经过构建；Pages 工作流会负责构建，首次需选择 GitHub Actions。构建使用相对资源路径，已为仓库子路径保留兼容性。

## 包内内容

- src、index.html、vite.config.js：运行代码。
- public/assets：本地 GLB 和已生成的贴图，无外部图片 CDN 依赖。
- package.json、package-lock.json：依赖清单；依赖文件需本机安装，不随仓库打包。
- scripts：模型源与重新导出工具。
- tests：状态机、纸条、模型文件检查。
- README.md、PROJECT_RULES.md：使用说明与后续玩法/视觉 Prompt。
- ASSET_PROVENANCE.md、MEAT_TEXTURE_PROMPT.md、FOOD_TEXTURE_PROMPTS.md：AI 生成资产说明和完整 Prompt。

项目不包含真实学生、供应商、质检报告或采访数据，不连接硬件、不自动打印。未擅自为你的项目指定开源许可证；如计划开放给他人复用，可再选择 LICENSE。

## 修复网站仅显示“场景载入中”

本项目为 Vite 源码，不能直接把源码首页当作构建完成的网页，也不能双击 index.html。

仓库现已包含 .github/workflows/pages.yml：Push 到 main 后自动安装依赖、测试、构建并将 dist 部署到 Pages。首次在 GitHub 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。然后在 Actions 确认 Build and deploy Visuals 成功，访问部署给出的地址。注意 hidden .github 文件夹也要提交。

若使用普通静态托管，把 npm run build 生成的 dist 文件夹内全部内容上传；根目录应为构建后的 index.html 和 assets/，不能上传源码 index.html。

贴图运行版已转换成 WebP，1024 / 768 / 512 像素按物体配置；模型和贴图并行加载。不要恢复旧 PNG 引用。
