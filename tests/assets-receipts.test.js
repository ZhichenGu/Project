import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {makeReceipt} from '../src/receipts.js';
test('paper data is marked simulated and follows the act',()=>{assert.match(makeReceipt(3,'meat',1).fields.status,/待复核/);assert.equal(makeReceipt(4,'meat',2),null);const r=makeReceipt(4,'container',3);assert.equal(r.simulation,true);assert.match(r.text,/非真实报告/);assert.match(r.text,/流程关闭/)});
test('all seven local GLB assets parse and have valid geometry and UVs',async()=>{const files=await readdir('public/assets/models');assert.equal(files.length,7);for(const file of files){const b=await readFile(`public/assets/models/${file}`);assert.equal(b.toString('utf8',0,4),'glTF');const g=await new GLTFLoader().parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'');let meshes=0;g.scene.traverse(o=>{if(o.isMesh){meshes++;assert.ok(o.geometry.attributes.uv);assert.ok(Array.from(o.geometry.attributes.position.array).every(Number.isFinite))}});assert.ok(meshes>0,file)}});
