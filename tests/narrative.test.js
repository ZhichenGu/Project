import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createNarrative,doorTransition,tick,duration} from '../src/narrative.js';
test('early close pauses; reopening resumes the same act',()=>{const s=createNarrative();doorTransition(s,true);tick(s,3500);doorTransition(s,false);tick(s,10000);assert.equal(s.elapsed,3500);doorTransition(s,true);assert.equal(s.act,1);assert.equal(s.elapsed,3500);});
test('only completed close-open edges advance, duplicate inputs do not',()=>{const s=createNarrative();for(let a=1;a<=4;a++){doorTransition(s,true);assert.equal(s.act,a);tick(s,duration);assert.equal(doorTransition(s,true),false);assert.equal(s.act,a);doorTransition(s,false)}doorTransition(s,true);assert.equal(s.act,4);assert.equal(s.phase,'completed');});
test('invalid hardware input is rejected without changing state',()=>{const s=createNarrative();assert.throws(()=>doorTransition(s,'false'));assert.equal(s.door,'closed')});
test('new session clears progress and selection',()=>{const s=createNarrative();doorTransition(s,true);tick(s,duration);s.selected='meat';Object.assign(s,createNarrative());assert.equal(s.act,1);assert.equal(s.elapsed,0);assert.equal(s.selected,null);assert.equal(s.door,'closed')});
