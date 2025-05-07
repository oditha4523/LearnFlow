import React, { useState } from "react";
import ReactFlow, { useReactFlow, useNodesState, useEdgesState } from "reactflow";
import { initialNodes, initialEdges } from './nodes-edges';

const getLayoutedElements = (nodes, edges) => {
  return { nodes, edges };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [keyword, setKeyword] = useState('');

  const fetchRoadmap = async (keyword) => {
    try {
      const response = await fetch('http://localhost:5000/generate_roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      const result = await response.json();

      const nodesMatch = result.match(/nodes\s*=\s*(\[[\s\S]*?\]);/);
      const edgesMatch = result.match(/edges\s*=\s*(\[[\s\S]*?\]);/);

      if (nodesMatch && edgesMatch) {
        const newNodes = eval(nodesMatch[1]);
        const newEdges = eval(edgesMatch[1]);
        setNodes(newNodes);
        setEdges(newEdges);
        fitView();
      } else {
        console.error('Invalid response format:', result);
      }
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    }
  };

  return (
    <div style={{ width: '70%', height: '50vh', alignItems:'center',position:'relative' }}>
      <div style={{ padding: '10px', background: '#f0f0f0' }}>
        <input
          type="text"
          placeholder="Enter keyword..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchRoadmap(e.target.value);
            }
          }}
          style={{ margin: '10px', padding: '5px', width: '250px' }}
        />
        <button
          onClick={() => fetchRoadmap(inputRef.current.value)}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          Generate
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      />
    </div>
  );
};

export default LayoutFlow;