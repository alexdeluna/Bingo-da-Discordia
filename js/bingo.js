export const CARD_COUNT = 40;
const ranges = [[1,9],[10,19],[20,29],[30,39],[40,49],[50,59],[60,69],[70,79],[80,90]];
const shuffle = values => { const a = [...values]; for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

// Gera 3 linhas, 9 colunas e exatamente 15 números (5 por linha), respeitando faixas 1–90.
export function makeCard(id) {
  const grid = Array.from({length:3}, () => Array(9).fill(null));
  // Cada coluna tem 1–3 números e cada linha recebe 5 números: padrão 90-bolas.
  for (const col of shuffle([...Array(9).keys()])) { const rows = shuffle([0,1,2]); const row = rows.find(r => grid[r].filter(Boolean).length < 5); grid[row][col] = ranges[col][0] + Math.floor(Math.random() * (ranges[col][1]-ranges[col][0]+1)); }
  // Completa cada linha até cinco células, sem quebrar o limite de três por coluna.
  for (let row=0; row<3; row++) while (grid[row].filter(Boolean).length < 5) { const choices = shuffle([...Array(9).keys()].filter(col => !grid[row][col] && grid.filter(r=>r[col]).length < 3)); const col=choices[0]; const used=grid.map(r=>r[col]).filter(Boolean); const pool=Array.from({length:ranges[col][1]-ranges[col][0]+1},(_,i)=>ranges[col][0]+i).filter(n=>!used.includes(n)); grid[row][col]=pool[Math.floor(Math.random()*pool.length)]; }
  // Firestore não aceita arrays aninhados; a grade fica linear (3 × 9 = 27 células).
  return { id: String(id).padStart(2,'0'), grid: grid.flat(), numbers: grid.flat().filter(Boolean), ownerId: null, ownerName: null };
}
export const makeCards = () => Array.from({length:CARD_COUNT}, (_,i)=>makeCard(i+1));
export const complete = (card, called=[]) => card.numbers.every(n => called.includes(n));
export const remaining = (card, called=[]) => card.numbers.filter(n => !called.includes(n)).length;
export const code = () => `BINGO${Math.random().toString(36).slice(2,7).toUpperCase()}`;
export const draw = called => { const pool=Array.from({length:90},(_,i)=>i+1).filter(n=>!called.includes(n)); return pool[Math.floor(Math.random()*pool.length)]; };
