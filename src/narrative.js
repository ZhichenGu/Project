export const acts = [
  {name:'承诺',en:'Promise',question:'谁决定这些食物进入学校？',summary:'一切看起来正常。',lines:[['管理方 · 虚构台词','我们将持续改善供餐服务。'],['供货方 · 虚构台词','每一批食材，都有登记记录。'],['旁白 · 艺术模拟','一份承诺，被放进冷藏室。']]},
  {name:'消耗',en:'Consumption',question:'学生真正知道自己吃下去的是什么吗？',summary:'食材被取走，日常继续。',lines:[['环境 · 合成声音示意','下课铃响了，午餐时间到了。'],['学生 · 虚构台词','今天窗口里，还剩下什么？'],['旁白 · 艺术模拟','食物进入餐盘，来源退到视线之外。']]},
  {name:'质疑',en:'Complaint',question:'当问题出现时，谁来判断问题是否成立？',summary:'外观发生变化，记录仍显示正常。',lines:[['学生 · 虚构台词','这份食物看起来不太一样。'],['食堂方 · 虚构台词','记录显示正常，我们正在核查。'],['旁白 · 艺术模拟','观察与记录之间，留下了一道缝隙。']]},
  {name:'回应',en:'Response',question:'记录已关闭，问题是否真的得到解决？',summary:'食物消失了，问题留下了。',lines:[['处理记录 · 艺术模拟','相关食材已移出，冷藏室已清理。'],['反馈记录 · 艺术模拟','处理状态：已关闭。'],['留给观众','谁能确认，一份回应真正改变了下一餐？']]}
];
export function createNarrative(){return {door:'closed',act:1,phase:'waiting',elapsed:0,advance:false,selected:null,sound:false,source:'simulator'}}
export const duration=12000;
export function doorTransition(s,open,source='simulator'){
 if(typeof open!=='boolean')throw new TypeError('open must be boolean');
 const door=open?'open':'closed';if(s.door===door)return false;
 s.door=door;s.source=source;s.selected=null;
 if(open){if(s.advance&&s.act<4){s.act++;s.elapsed=0;s.advance=false}s.phase=s.elapsed>=duration?(s.act===4?'completed':'ready'):'playing'}
 else {s.advance=s.elapsed>=duration&&s.act<4;s.phase=s.act===4&&s.elapsed>=duration?'completed':'waiting'}return true;
}
export function tick(s,ms){if(s.door!=='open'||s.phase!=='playing')return false;s.elapsed=Math.min(duration,s.elapsed+Math.max(0,ms));if(s.elapsed===duration)s.phase=s.act===4?'completed':'ready';return true}
