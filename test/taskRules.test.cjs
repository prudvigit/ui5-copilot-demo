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
