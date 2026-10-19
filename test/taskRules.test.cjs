const {test} = require('node:test');
const assert = require('node:assert/strict');
const rules = require('../webapp/model/taskRules.js');
test('rejects missing and whitespace-only task titles', () => {
  for (const value of ['', '   ', null, undefined]) assert.ok(rules.validateTitle(value));
});
test('accepts valid titles and enforces the 120-character boundary', () => {
  assert.equal(rules.validateTitle('  Review PR  '), '');
  assert.equal(rules.validateTitle('a'.repeat(120)), '');
  assert.ok(rules.validateTitle('a'.repeat(121)));
});
test('counts only completed tasks, including empty lists', () => {
  assert.equal(rules.countCompleted([]), 0);
  assert.equal(rules.countCompleted([{done:true},{done:false},{done:true}]), 2);
});

test('clears only completed tasks without mutating the original list', () => {
  const pending = {title:'Keep me', done:false};
  const tasks = [pending, {title:'Remove me', done:true}];
  const remaining = rules.clearCompleted(tasks);
  assert.deepEqual(remaining, [pending]);
  assert.equal(remaining[0], pending);
  assert.equal(tasks.length, 2);
  assert.equal(rules.countCompleted(remaining), 0);
});
test('clearing handles empty, unfinished, and fully completed lists', () => {
  assert.deepEqual(rules.clearCompleted([]), []);
  assert.deepEqual(rules.clearCompleted([{done:true}]), []);
  assert.deepEqual(rules.clearCompleted([{done:false}]), [{done:false}]);
});
