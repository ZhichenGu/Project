import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {writeFile,mkdir,rename} from 'node:fs/promises';
import {cabbage,tomato,meat,egg,container} from './model-source.mjs';
globalThis.FileReader=class {async readAsArrayBuffer(b){this.result=await b.arrayBuffer();this.onloadend?.()} async readAsDataURL(b){this.result=`data:${b.type};base64,${Buffer.from(await b.arrayBuffer()).toString('base64')}`;this.onloadend?.()}};
await mkdir('public/assets/models',{recursive:true});
for(const [name,model] of [['cabbage',cabbage()],['cabbage-cut',cabbage(2)],['cabbage-wilt',cabbage(3)],['tomato',tomato()],['meat',meat()],['egg',egg()],['container',container()]]){const data=await new GLTFExporter().parseAsync(model,{binary:true});await writeFile(`public/assets/models/${name}.glb.tmp`,Buffer.from(data));await rename(`public/assets/models/${name}.glb.tmp`,`public/assets/models/${name}.glb`);console.log(name,data.byteLength)}
