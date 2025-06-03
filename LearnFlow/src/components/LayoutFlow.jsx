import React, { useState } from "react";
import ReactFlow, { useReactFlow, useNodesState, useEdgesState } from "reactflow";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { initialNodes, initialEdges } from './nodes-edges';
import 'reactflow/dist/style.css';
import './LayoutFlow.css';

// Helper function for node layout
const getLayoutedElements = (nodes, edges) => {
  return { nodes, edges };
};

const nodeStyles = {
  parent: {
    background: '#cc0000', // Red color for parent nodes
    color: 'white',
    border: '1px solid #cc0000',
    borderRadius: '5px',
    padding: '10px',
  },
  child: {
    background: '#ffd700', // Yellow color for child nodes
    color: 'black',
    border: '1px solid #cc9900',
    borderRadius: '5px',
    padding: '10px',
  }
};

const LayoutFlow = () => {
  // State management
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [keyword, setKeyword] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [nodeDescription, setNodeDescription] = useState(null);
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);

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

        // Identify parent nodes (nodes with outgoing edges)
        const parentNodeIds = newEdges.map(edge => edge.source);

        // Add styles to nodes based on their type
        const styledNodes = newNodes.map(node => {
          const isParent = parentNodeIds.includes(node.id);
          return {
            ...node,
            style: isParent ? nodeStyles.parent : nodeStyles.child,
          };
        });

        // Highlight edges between parent nodes
        const highlightedEdges = newEdges.map(edge => {
          const isSourceParent = parentNodeIds.includes(edge.source);
          const isTargetParent = parentNodeIds.includes(edge.target);
          // Remove any animated property if present
          const { animated, ...rest } = edge;
          return {
            ...rest,
            style: (isSourceParent && isTargetParent)
              ? { stroke: '#cc0000', strokeWidth: 4 } // Highlighted style
              : { stroke: '#222', strokeWidth: 2 },   // Default style
          };
        });

        setNodes(styledNodes);
        setEdges(highlightedEdges);
        fitView();
      } else {
        console.error('Invalid response format:', result);
      }
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    }
  };

  // Function to fetch AI description for a node
  const fetchNodeDescription = async (nodeLabel) => {
    setIsLoadingDescription(true);
    try {
      const response = await fetch('http://localhost:5000/generate_node_description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          label: nodeLabel,
          keyword: keyword 
        }),
      });

      const result = await response.json();
      setNodeDescription(result);
    } catch (error) {
      console.error('Error fetching node description:', error);
      setNodeDescription({
        description: "Failed to load description.",
        key_concepts: [],
        resources: [],
        tips: []
      });
    } finally {
      setIsLoadingDescription(false);
    }
  };

  // Event Handlers
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setIsSidebarVisible(true);
    setNodeDescription(null); // Clear previous description
    fetchNodeDescription(node.data.label);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setNodeDescription(null);
    setTimeout(() => {
      setSelectedNode(null);
    }, 300);
  };

  return (
    <motion.div 
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="layout-container"
    >
      {/* Flow Diagram Section */}
      <motion.div 
        variants={fadeIn('up', 0.4)}
        className="flow-container"
      >
        {/* Search Bar */}
        <motion.div 
          variants={fadeIn('down', 0.5)}
          className="search-container relative"
        >
          <div className="absolute inset-0 w-full h-full rounded-xl pointer-events-none bg-[radial-gradient(circle_at_20%_50%,_#e3d4ff_0%,_transparent_70%)] opacity-40 -z-10"></div>
          <div className="absolute inset-0 w-full h-full rounded-xl pointer-events-none bg-[radial-gradient(circle_at_80%_50%,_#FF69B4_0%,_transparent_70%)] opacity-40 -z-10"></div>
          <motion.input
            variants={fadeIn('right', 0.6)}
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
          <motion.button
            variants={fadeIn('left', 0.6)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchRoadmap(keyword)}
            className="generate-button"
          >
            Generate
          </motion.button>
        </motion.div>

        {/* React Flow Diagram */}
        <motion.div 
          variants={fadeIn('up', 0.7)}
          className="flow-wrapper"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={0.1}
            maxZoom={4}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            panOnDrag={true}
            zoomOnScroll={true}
            attributionPosition="bottom-right"
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Sidebar Panel */}
      <motion.div 
        variants={fadeIn('left', 0.5)}
        animate={isSidebarVisible ? "show" : "hidden"}
        className={`sidebar ${isSidebarVisible ? 'visible' : ''} overflow-y-auto`}
        style={{ maxHeight: '90vh' }}
      >
        {selectedNode && (
          <>
            <motion.h2 
              variants={textVariant(0.2)}
              className="sidebar-title text-xl font-bold mb-4"
            >
              {selectedNode.data.label}
            </motion.h2>
            
            {/* Loading State */}
            {isLoadingDescription && (
              <motion.div 
                variants={fadeIn('up', 0.3)}
                className="sidebar-content"
              >
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </motion.div>
            )}

            {/* Node Description - Better Formatting */}
            {nodeDescription && !isLoadingDescription && (
              <>
                <motion.div 
                  variants={fadeIn('up', 0.3)}
                  className="sidebar-section mb-6"
                >
                  <h3 className="font-semibold text-lg mb-3 text-indigo-600 flex items-center">
                    <span className="mr-2">📖</span>
                    Description
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-gray-800 leading-relaxed text-sm">
                      {nodeDescription.description}
                    </p>
                  </div>
                </motion.div>

                {/* Key Concepts - Enhanced */}
                {nodeDescription.key_concepts && nodeDescription.key_concepts.length > 0 && (
                  <motion.div 
                    variants={fadeIn('up', 0.4)}
                    className="sidebar-section mb-6"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-indigo-600 flex items-center">
                      <span className="mr-2">🎯</span>
                      Key Concepts
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {nodeDescription.key_concepts.map((concept, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-2 rounded-lg text-sm font-medium shadow-sm"
                        >
                          {concept}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Learning Resources - Enhanced */}
                {nodeDescription.resources && nodeDescription.resources.length > 0 && (
                  <motion.div 
                    variants={fadeIn('up', 0.5)}
                    className="sidebar-section mb-6"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-indigo-600 flex items-center">
                      <span className="mr-2">📚</span>
                      Learning Resources
                    </h3>
                    <div className="space-y-3">
                      {nodeDescription.resources.map((resource, index) => (
                        <div 
                          key={index}
                          className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-800 text-sm">{resource.title}</h4>
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {resource.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{resource.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Learning Tips - Enhanced */}
                {nodeDescription.tips && nodeDescription.tips.length > 0 && (
                  <motion.div 
                    variants={fadeIn('up', 0.6)}
                    className="sidebar-section mb-6"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-indigo-600 flex items-center">
                      <span className="mr-2">💡</span>
                      Learning Tips
                    </h3>
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <ul className="space-y-2">
                        {nodeDescription.tips.map((tip, index) => (
                          <li 
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span className="text-yellow-600 mt-1 font-bold">•</span>
                            <span className="text-sm leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* Basic Node Info */}
            <motion.div 
              variants={fadeIn('up', 0.7)}
              className="sidebar-section border-t pt-4"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-600">Node Info</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>ID:</strong> {selectedNode.id}</div>
                <div><strong>Type:</strong> {selectedNode.type || 'default'}</div>
              </div>
            </motion.div>

            <motion.button
              variants={fadeIn('up', 0.8)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeSidebar}
              className="close-button mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LayoutFlow;