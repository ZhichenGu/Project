# 复制到 GitHub Desktop 仓库

1. 在 GitHub Desktop 中打开或创建自己的本地仓库，用「Show in Finder」打开仓库文件夹。
2. 把本包 Visuals-GitHub 文件夹**里面的全部内容**复制到该仓库根目录。根目录应直接出现 package.json、index.html、src 和 public，不要再多套一层文件夹。隐藏文件 .gitignore 和 .gitattributes 也要复制（Mac 可按 Command + Shift + . 显示）。保留本地仓库原有的 .git 文件夹，不要覆盖它。
3. 回到 GitHub Desktop，确认变更中没有 node_modules、dist、.env 或账户凭据；填写说明，例如「Add Visuals refrigerator installation」，然后 Commit。
4. 新仓库使用 Publish repository；已有远端使用 Push origin。仓库是否公开由你决定。本包没有自动发布网站的流程。

## 在另一台电脑运行

安装 Node.js 20.19+ 或 22.12+，在仓库目录运行：

```sh
npm ci --registry=https://registry.npmjs.org
npm run dev
```

打开给出的本机地址。首次按 O 或空格开门；D 状态、H 帮助默认隐藏。F 全屏、S 声音、T 字幕、R 重置。屏幕已确认竖装 2400×3840（5:8）。

构建：`npm run build`；预览构建：`npm run preview`。模型和贴图均在 public/assets/ 中，需随源代码一起提交。只上传源代码不会自动生成一个可访问的网站，未来如需 GitHub Pages 再配置部署。构建使用相对资源路径，已为仓库子路径保留兼容性。

## 包内内容

- src、index.html、vite.config.js：运行代码。
- public/assets：本地 GLB 和已生成的贴图，无外部图片 CDN 依赖。
- package.json、package-lock.json：依赖清单；依赖文件需本机安装，不随仓库打包。
- scripts：模型源与重新导出工具。
- tests：状态机、纸条、模型文件检查。
- README.md、PROJECT_RULES.md：使用说明与后续玩法/视觉 Prompt。
- ASSET_PROVENANCE.md、MEAT_TEXTURE_PROMPT.md、FOOD_TEXTURE_PROMPTS.md：AI 生成资产说明和完整 Prompt。

项目不包含真实学生、供应商、质检报告或采访数据，不连接硬件、不自动打印。未擅自为你的项目指定开源许可证；如计划开放给他人复用，可再选择 LICENSE。
