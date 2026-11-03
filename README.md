# Visuals — 一餐背后 / Behind the Meal

四幕互动冰箱装置。当前版为纯场景、键盘测试、GLB 模型与冷白照明；介绍栏、底部按钮及档案侧栏已经移除。供货、质检、台词、批次均为模拟。

## 启动

Node.js 20.19+ 或 22.12+：

```sh
npm install --registry=https://registry.npmjs.org
npm run dev
```

打开本地地址，**点击页面使其获得键盘焦点，按 O 或空格开门**。初始关门画面为黑色，属于待机状态。H 临时显示按键说明。生产版：`npm run build`，`npm run preview`。不要双击 index.html。

## 显示屏

SHARP LQ170R1JX42 V.A 原生 3840×2400，16:10。已确认竖装方案：在系统显示设置中旋转屏幕后，输出 2400×3840（5:8），浏览器全屏显示。网页视窗固定 5:8，其他窗口等比居中黑边，无网页边框。横装预留 `?orientation=landscape`（16:10）；横装需重新决定真实冰箱的空间构图，不能仅把竖版拉宽。

物理面板分辨率不等于浏览器 CSS 尺寸。系统缩放可能使页面显示为 1200×1920 等，比例不受影响。渲染设备像素比上限为 1.75，避免高 DPI 和 4K 叠加；尚未对真实面板的帧率、亮度和驱动板做实测。

## 键盘

|按键|作用|
|---|---|
|空格|开门 / 关门|
|O / C|明确开门 / 关门|
|S|合成示例声音开关，初始关闭|
|T|叙事字幕开关|
|R|重置至第一幕关门待机，保留声音偏好|
|H / D|帮助 / 状态信息，默认隐藏|
|F|浏览器全屏，依浏览器支持|
|1—5|白菜 / 肉 / 番茄 / 蛋 / 容器档案数据|

长按键不重复执行。四幕各 12 秒，提前关门暂停；完成后关门再开门推进。终章保持第四幕，需 R 重启。鼠标仍可点击食材，但显示可关闭的场景内档案浮窗。没有评分或选章菜单。

## 文件和模型替换

- `PROJECT_RULES.md`：玩法、视觉、热敏纸规则，以及可复制的后续 Prompt。
- `src/narrative.js`：字幕和纯状态机。
- `src/main.js`：键盘、输入边界、声音、字幕、纸条事件。
- `src/scene.js`：GLTFLoader、四幕摆放、光照、阴影、拾取与相机。
- `src/textures.js`：1024² 叶脉、肉类纹理与凹凸噪声；断面在 scene.js 中换成 AI 生成贴图（见 ASSET_PROVENANCE.md）。色彩图为 sRGB，数据图保持线性。
- `src/receipts.js`：各幕模拟档案和纸条结构。
- `public/assets/models/`：7 个本地自制 GLB，包括白菜完整/切开/萎缩、肉、番茄、蛋和容器。
- `scripts/model-source.mjs`：参数化模型源；`node scripts/build-models.mjs` 可重新导出 GLB。

资产为本项目参数化制作，不包含第三方模型或扫描资产，不是照片级成品。模型单位 Y 向上，底部近似 y=0；替换时保持对应尺度与摆放、名称和 food id。白菜 leaf / cabbage-cut、meat、tomato、egg 网格名用于分配当前纹理。若外部 GLB 已内嵌 PBR 纹理，修改 asset() 避免覆盖它们；保留许可证、作者和文件来源。模型加载失败会给出错误提示，不静默冒充成功。GLTFLoader 路径跟随 Vite BASE_URL。

光照为顶部聚光源、弱补光、RoomEnvironment 预过滤反射、实时柔化阴影及 ACES 色调映射；未加入外部 HDRI 或重型后期特效。

## ESP32 接口

```js
mealInstallation.setDoor(true, 'serial');
mealInstallation.receive({type:'door',open:false}, 'websocket');
mealInstallation.receive('{"type":"door","open":true}', 'serial');
mealInstallation.reset();
mealInstallation.getState();
window.addEventListener('meal:statechange', e => console.log(e.detail));
```

receive 严格接受 type=door 和布尔 open；重复相同门状态不推进。串口层未来应在用户手势下请求权限、按换行累积消息、释放读取锁、处理断线并加入门磁去抖。WebSocket 层在收到合法消息后调用同一 receive 接口。当前不请求权限、不连接后台、不接真实设备。

## 热敏纸接口（未连接打印机）

```js
window.addEventListener('meal:receipt', e => {
  const receipt=e.detail;
  // 此处交给未来打印桥接程序；当前不发送、不打印。
  console.log(receipt.reason, receipt.simulation, receipt.text);
});
mealInstallation.getReceipts(); // 最近至多100条内存记录副本
```

点击或数字键选择食材时生成 selection 数据，终章完成生成 ending 数据；连续相同食材选择去重，终章结束不会重复打印数据。reason、session、sequence、act、ingredient、simulation、fields、text 可供后续使用。模拟标记不能去掉。内存刷新即失效；事件不是可靠硬件打印队列，也无纸张打印确认。建议未来只在 ending 汇总打印一张，不把每个 selection 事件直接转成物理打印。

## 检查

```sh
node --test tests/*.test.js
npm run build
```

检查状态机边沿、暂停恢复与终章、纸条模拟标记、七个 GLB 的解析/几何/UV。浏览器检查结果记录于本轮交付；尚未实测真实 ESP32、显示屏、音响和热敏打印机。

面板资料：[面板参数](https://www.panelook.com/LQ170R1JX42%20V.A_Sharp_17.0_LCM_overview_62356.html)、[Dell XPS 17 显示规格](https://dl.dell.com/topicspdf/xps-17-9700-laptop_users-guide_en-us.pdf)。资产接入依据：[GLTFLoader](https://threejs.org/docs/pages/GLTFLoader)、[色彩管理](https://threejs.org/manual/pages/color-management.html)。

消耗与质疑两幕鸡蛋已减至 2 个，避免前后叠成一团；断面使用 AI 生成纹理，并取消切面接收产生楔形伪影的阴影。

浮动档案：点击模型或数字键显示小型信息窗，× / Esc 关闭，关门和重置自动收起。固定介绍栏与侧栏不恢复。

浏览器标题：Visuals。左上角状态框使用 D 键切换，初始 hidden；H 为单独的按键帮助。默认均不出现，食材信息窗也仅在选中食材后出现。

本轮验证：6 项自动检查通过（状态机、模拟纸条、七个 GLB 解析及 UV/几何），生产构建通过。浏览器验证了 600×960 与 2400×3840 的 5:8 画幅无溢出、键盘开关门及章节推进、食材直接点击信息浮窗、关闭/关门收起、调试框 D 切换和默认隐藏、Visuals 标题。实看第二幕新断面、两枚鸡蛋和底层食材减少，第三幕底层变色/萎缩。肉盘使用整组旋转后包围盒放置，三幕构建均检查其最低点高于搁板。最新材质版的真实屏幕帧率、硬件和音响听感未实测；当前资产仍偏概念化。构建有主包体积建议，不影响成功构建。

最新局部修正：卷心菜缩小并侧转后，使用实际顶点的精确包围盒贴合搁板，增加模型正下方的柔和接触阴影。肉块改为有倒角侧边的实体挤出模型，厚度约为原模型的 1.3 倍；顶面/侧面重新设置 UV，使用 AI 生成的肉类肌理，降低薄膜遮白感。包装仍按完整组最低点置于搁板上方。

食材精细贴图：卷心菜外叶、番茄表皮、蛋壳、鸡肉、菠菜叶均使用内置 image_gen 生成并分别接入材质，完整 Prompt 见 FOOD_TEXTURE_PROMPTS.md；绿叶备料为薄弯曲叶片。内壁使用原有细噪声作为粗糙度与极轻微凹凸，不增加显眼花纹。第一幕两块肉之间留出间隙，第二幕以后单块居中。模型导出改为临时文件完成后原子替换，避免预览读取半写入 GLB。
