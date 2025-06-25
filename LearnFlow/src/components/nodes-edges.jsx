export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'A' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 100) },
  },
  {
    id: '2',
    data: { label: 'B' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },
  }, 
  {
    id: '2a',
    data: { label: 'B1' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },
  },
  {
    id: '2b',
    data: { label: 'B2' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },
  },
  {
    id: '2c',
    data: { label: 'B3' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },
  },
  {
    id: '3',
    data: { label: 'C' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },
  },
  {
    id: '3a',
    data: { label: 'C1' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },
  },
  {
    id: '3b',
    data: { label: 'C2' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },      
  },
  {
    id: '3c',
    data: { label: 'C3' },
    position: { x: Math.floor(Math.random() * 1400) + 100, y: Math.floor(Math.random() * 1400) + 100 },
  }
];
 
export const initialEdges = [
  { id: 'e12', source: '1', target: '2', animated: true },
  { id: 'e13', source: '1', target: '3', animated: true },
  { id: 'e22a', source: '2', target: '2a', animated: true },
  { id: 'e22b', source: '2', target: '2b', animated: true },
  { id: 'e22c', source: '2', target: '2c', animated: true },
  { id: 'e33a', source: '3', target: '3a', animated: true },
  { id: 'e33b', source: '3', target: '3b', animated: true },
  { id: 'e33c', source: '3', target: '3c', animated: true },
];