import assert from 'node:assert/strict';
import { makeCards, complete, remaining } from '../js/bingo.js';

const cards = makeCards();
assert.equal(cards.length, 40);
assert.equal(new Set(cards.map(c => c.id)).size, 40);
for (const card of cards) {
  assert.equal(card.grid.length, 27);
  assert.equal(card.numbers.length, 15);
  assert.equal(new Set(card.numbers).size, 15);
  for (let row = 0; row < 3; row++) assert.equal(card.grid.slice(row * 9, row * 9 + 9).filter(Boolean).length, 5);
  for (let col = 0; col < 9; col++) assert.ok([0, 1, 2].map(row => card.grid[row * 9 + col]).filter(Boolean).length >= 1);
  card.numbers.forEach(n => assert.ok(n >= 1 && n <= 90));
  assert.equal(remaining(card, card.numbers), 0);
  assert.equal(complete(card, card.numbers), true);
}
console.log('40 cartelas tradicionais geradas e validadas.');
