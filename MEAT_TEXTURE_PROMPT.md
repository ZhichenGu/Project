# 肉类贴图生成记录

工具：内置 image_gen。文件：`public/assets/textures/meat-albedo.png`。这是 AI 生成的材质，不是真实调研照片。模型几何来自 scripts/model-source.mjs，本次由薄球体改为带倒角的实体挤出形状，重建顶面和侧面 UV。

最终 Prompt：

Use case: photorealistic-natural. Asset type: square PBR base-color texture for the top of a thick raw beef steak 3D model. An extreme macro orthographic top-down view of fresh uncooked beef muscle, covering the ENTIRE square edge to edge, no background, plate, packaging or cutout silhouette. Natural deep muted ruby red meat fibers, irregular fine ivory intramuscular fat marbling, some thicker softly branching connective tissue seams, realistic subtle moist surface and very fine visible grain. Broad irregular anatomical muscle sections, not evenly spaced repeated veins, no drawn white outlines, no cartoon. Flat diffuse neutral illumination for a texture: no baked hard shadows, no gloss highlights, no perspective, no text or logos. The image will be cropped by a 3D steak silhouette; depict only meat and marbling throughout the square, no surrounding white fat rim. Avoid pink rubber, cooked meat, brown crust, blood pools and perfect symmetry.
