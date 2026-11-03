# 卷心菜断面贴图

文件：`public/assets/textures/cabbage-cut-albedo.png`

使用内置 image_gen 工具生成，未经照片采集；不是调研证据或真实食材照片。用于 GLB 断面网格的色彩和轻微凹凸，不替代三维场景。其余 GLB 为本地参数化制作。

最终生成 Prompt：

Use case: photorealistic-natural. Asset type: square albedo texture for the cut face of a 3D green cabbage model in an interactive refrigerator art installation. Primary request: a perfectly straight-on orthographic macro view of ONE freshly cut green cabbage cross section, sliced vertically through its central stalk. The whole circular cross-section is centered at the exact center of the square; its green outer rim touches all four image edges (diameter exactly image width and height), leafy material continues into the square corners. Anatomy: dense irregular crumpled and folded thin pale green leaves, branching ivory white ribs, a short broad triangular ivory stalk rising from bottom center only one third up the face. Natural uneven labyrinth of leafy folds; no concentric rings, no onion, no woodgrain, no perfect geometric circles. Surface is fully exposed, in focus, realistic fine moist cellular texture, fresh subtle yellow-green interior darker green outer leaves. Flat even diffuse neutral studio illumination, no directional shadows, no wedge shaped shadow, no specular hotspots, no perspective, no visible side thickness, no plate, no hands, no surroundings, no text or labels. This is an AI-created material texture, not a photo claim.

肉类材质：`public/assets/textures/meat-albedo.png`，同样使用内置 image_gen 生成；生成 Prompt 与用途见 MEAT_TEXTURE_PROMPT.md。不是扫描资产或真实食材记录。

新增五种表面：cabbage-leaf、tomato-skin、eggshell、chicken-raw、spinach-leaf；均为内置 image_gen 生成，不是扫描或真实调研记录。文件位于 public/assets/textures/，完整 Prompt 见 FOOD_TEXTURE_PROMPTS.md。
