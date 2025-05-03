export const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Java Basics (Setup, Syntax, Data Types)' },
        position: { x: 0, y: 0 },
      },
      {
        id: '2',
        data: { label: 'Core Java Concepts' },
        position: { x: 0, y: 100 },
      },
      {
        id: '2a',
        data: { label: 'Object-Oriented Programming (OOP)' },
        position: { x: 0, y: 200 },
      },
      {
        id: '2b',
        data: { label: 'Collections Framework' },
        position: { x: 0, y: 300 },
      },
      {
        id: '2c',
        data: { label: 'Exception Handling' },
        position: { x: 0, y: 400 },
      },
      {
        id: '2d',
        data: { label: 'Generics and Lambda Expressions' },
        position: { x: 0, y: 500 },
      },
      {
        id: '3',
        data: { label: 'Advanced Java' },
        position: { x: 200, y: 100 },
      },
      {
        id: '3a',
        data: { label: 'Multithreading' },
        position: { x: 300, y: 200 },
      },
      {
        id: '3b',
        data: { label: 'I/O and Networking' },
        position: { x: 300, y: 300 },
      },
      {
        id: '3c',
        data: { label: 'Databases (JDBC)' },
        position: { x: 300, y: 400 },
      },
      {
        id: '4',
        data: { label: 'Frameworks/Libraries (Choose one or more)' },
        position: { x: 400, y: 250 },
      },
      {
        id: '4a',
        data: { label: 'Spring' },
        position: { x: 500, y: 150 },
      },
      {
        id: '5',
        data: { label: 'Projects and Practice' },
        position: { x: 600, y: 250 },
      }
  ];
   
  export const initialEdges = [
    { id: 'e12', source: '1', target: '2', animated: true },
    { id: 'e13', source: '1', target: '3', animated: true },
    { id: 'e22a', source: '2', target: '2a', animated: true },
    { id: 'e22b', source: '2', target: '2b', animated: true },
    { id: 'e22c', source: '2', target: '2c', animated: true },
    { id: 'e2c2d', source: '2c', target: '2d', animated: true },
    { id: 'e33a', source: '3', target: '3a', animated: true },
    { id: 'e33b', source: '3', target: '3b', animated: true },
    { id: 'e33c', source: '3', target: '3c', animated: true },
    { id: 'e34', source: '3', target: '4', animated: true },
    { id: 'e45', source: '4', target: '5', animated: true },
  ];