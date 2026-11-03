import * as T from 'three';
let seed=184;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
function canvas(){const c=document.createElement('canvas');c.width=c.height=1024;return [c,c.getContext('2d')]}
function tex(c,color=true){const t=new T.CanvasTexture(c);t.colorSpace=color?T.SRGBColorSpace:T.NoColorSpace;t.anisotropy=8;return t}
export function foodTextures(){
const [leaf,c]=canvas();c.fillStyle='#cbd4a2';c.fillRect(0,0,1024,1024);const grad=c.createLinearGradient(0,1024,0,0);grad.addColorStop(0,'#e6e6c2');grad.addColorStop(.45,'#9fb46a');grad.addColorStop(1,'#608345');c.fillStyle=grad;c.fillRect(0,0,1024,1024);
for(let k=0;k<40;k++){const y=k*24;for(const side of [-1,1]){c.beginPath();c.moveTo(512,y+120);c.bezierCurveTo(512+side*90,y+80,512+side*240,y-70,512+side*510,y-170);c.strokeStyle='#dce0ad90';c.lineWidth=3;c.stroke();for(let j=0;j<6;j++){c.beginPath();c.moveTo(512+side*(90+j*57),y+35-j*20);c.lineTo(512+side*(140+j*57),y-60-j*20);c.strokeStyle='#d7dba755';c.lineWidth=1;c.stroke()}}}c.beginPath();c.moveTo(512,1024);c.bezierCurveTo(485,650,535,280,512,0);c.strokeStyle='#e4e7c6';c.lineWidth=20;c.stroke();
const [cut,cc]=canvas();const cg=cc.createRadialGradient(510,540,20,510,500,530);cg.addColorStop(0,'#e1e2ba');cg.addColorStop(.65,'#bfc99b');cg.addColorStop(1,'#718e4a');cc.fillStyle=cg;cc.fillRect(0,0,1024,1024);
// Folded leaf sections: uneven white ribs separated by green membranes, not onion rings.
for(let k=19;k>=1;k--){const base=22+k*24,phase=k*.51;cc.beginPath();for(let i=0;i<=360;i++){const a=i/360*Math.PI*2;const fold=Math.sin(a*5+phase)*.04+Math.sin(a*11-phase)*.027+Math.cos(a*19+k*.2)*.014;const r=base*(1+fold),x=512+Math.cos(a)*r+Math.sin(k*.8)*12,y=510+Math.sin(a)*r*.98+Math.cos(k)*9;if(i===0)cc.moveTo(x,y);else cc.lineTo(x,y)}cc.closePath();cc.strokeStyle=k>15?'#728d4d':k%3?'#81965b':'#9eae78';cc.lineWidth=4+(k%4);cc.stroke();cc.strokeStyle=k%2?'#e4e6c2':'#cdd5a6';cc.lineWidth=10+(k%3)*2;cc.stroke();}
// The pale basal stalk branches into leaf ribs.
cc.beginPath();cc.moveTo(430,1030);cc.bezierCurveTo(465,820,478,670,507,545);cc.bezierCurveTo(535,680,558,860,595,1030);cc.closePath();cc.fillStyle='#e7e6c8';cc.fill();
for(let j=0;j<9;j++){const y=620+j*35;for(const side of [-1,1]){cc.beginPath();cc.moveTo(512,y+40);cc.bezierCurveTo(512+side*50,y+20,512+side*(100+j*20),y-35,512+side*(130+j*25),y-120);cc.strokeStyle='#e5e5c3';cc.lineWidth=5+j*.8;cc.stroke()}}
const [meat,mc]=canvas();mc.fillStyle='#a94c49';mc.fillRect(0,0,1024,1024);for(let i=0;i<500;i++){const x=rand()*1024,y=rand()*1024;mc.beginPath();mc.moveTo(x,y);mc.bezierCurveTo(x+rand()*100,y+50,x-50,y+90,x+rand()*160-80,y+180);mc.strokeStyle=i%7?'#d17c6b60':'#ead6bd';mc.lineWidth=i%7?1+rand()*3:2+rand()*9;mc.stroke()}for(let i=0;i<1600;i++){mc.fillStyle=`rgba(76,16,17,${rand()*.15})`;mc.fillRect(rand()*1024,rand()*1024,1,8+rand()*30)}
const [noise,nc]=canvas();nc.fillStyle='#999';nc.fillRect(0,0,1024,1024);for(let i=0;i<120000;i++){const v=90+Math.floor(rand()*90);nc.fillStyle=`rgb(${v},${v},${v})`;nc.fillRect(rand()*1024,rand()*1024,1+rand()*2,1+rand()*2)}
return {leaf:tex(leaf),cut:tex(cut),meat:tex(meat),noise:tex(noise,false)};
}
