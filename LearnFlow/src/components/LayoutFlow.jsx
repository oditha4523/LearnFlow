import React, { useState } from "react";
import ReactFlow, { useReactFlow, useNodesState, useEdgesState } from "reactflow";
import { initialNodes, initialEdges } from './nodes-edges';
import 'reactflow/dist/style.css';
import './LayoutFlow.css';

// Helper function for node layout
const getLayoutedElements = (nodes, edges) => {
  return { nodes, edges };
};

const LayoutFlow = () => {
  // State management
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [keyword, setKeyword] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // API call to generate roadmap
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

      // Parse the response to extract nodes and edges
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

  // Event Handlers
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setIsSidebarVisible(true);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    // Wait for animation to complete before clearing the node
    setTimeout(() => {
      setSelectedNode(null);
    }, 300);
  };

  return (
    // Main Layout Container
    <div className="layout-container">
      {/* Flow Diagram Section */}
      <div className="flow-container">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                fetchRoadmap(e.target.value);
              }
            }}
            className="search-input"
          />
          <button
            onClick={() => fetchRoadmap(keyword)}
            className="generate-button"
          >
            Generate
          </button>
        </div>

        {/* React Flow Diagram */}
        <div className="flow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
          />
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        {selectedNode && (
          <>
            <h2 className="sidebar-title">Node Details</h2>
            <div className="sidebar-content">
              <strong>Label:</strong> {selectedNode.data.label}
            </div>
            <div className="sidebar-content">
              <strong>ID:</strong> {selectedNode.id}
            </div>
            <div className="sidebar-content">
              <strong>Type:</strong> {selectedNode.type || 'default'}
            </div>
            <button
              onClick={closeSidebar}
              className="close-button"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LayoutFlow;