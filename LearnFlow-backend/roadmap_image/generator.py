import matplotlib.pyplot as plt
import json

def generate_roadmap_image(nodes, edges, filename='roadmap.jpg'):
    plt.figure(figsize=(10, 8))
    
    # Create a dictionary to hold node positions
    positions = {node['id']: (node['position']['x'], node['position']['y']) for node in nodes}
    
    # Draw nodes
    for node in nodes:
        plt.scatter(node['position']['x'], node['position']['y'], s=1000, label=node['data']['label'])
        plt.text(node['position']['x'], node['position']['y'], node['data']['label'], 
                 horizontalalignment='center', verticalalignment='center', fontsize=10, color='white')
    
    # Draw edges
    for edge in edges:
        source_pos = positions[edge['source']]
        target_pos = positions[edge['target']]
        plt.plot([source_pos[0], target_pos[0]], [source_pos[1], target_pos[1]], 'k-', alpha=0.5)
    
    plt.title('Learning Roadmap')
    plt.axis('off')
    plt.savefig(filename, format='jpg', bbox_inches='tight')
    plt.close()

def load_roadmap_data(filepath):
    with open(filepath, 'r') as file:
        data = json.load(file)
    return data['nodes'], data['edges']