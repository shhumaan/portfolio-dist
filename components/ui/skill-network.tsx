"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as d3 from "d3"
import type { Skill } from "@/types/skill"

interface SkillNetworkProps {
  skills: Skill[]
  onSelectSkill: (skill: Skill | null) => void
  selectedSkill: Skill | null
  visualizationType: "network" | "category"
}

// Define custom types for D3 nodes and links
interface NodeData extends d3.SimulationNodeDatum {
  id: string
  name: string
  r: number
  category: string
  skill: Skill
  proficiency: string | number
}

interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: any // Use 'any' to accommodate both string ID and node object references
  target: any
  strength: number
}

// Color mapping for different skill categories
const categoryColors: Record<string, string> = {
  cloud: "#4ECDC4",      // Soft Cyan
  development: "#34BE82", // Vibrant Green
  ai: "#8A2BE2",         // Rich Purple
  database: "#F4A261",   // Amber
  system: "#f43f5e",     // Bright Red
}

// Define proficiency mapping
const mapProficiency = (proficiency: string | number): string => {
  if (typeof proficiency === 'string') {
    if (proficiency === 'Advanced') return 'Working';
    if (proficiency === 'Intermediate') return 'Active Development';
    return 'Exploration';
  }
  
  // If numeric
  const num = Number(proficiency);
  if (num >= 8) return 'Working';
  if (num >= 5) return 'Active Development';
  return 'Exploration';
}

// Determine radius based on proficiency
const getNodeRadius = (proficiency: string | number): number => {
  const profString = mapProficiency(proficiency);
  
  switch(profString) {
    case 'Working': return 25;
    case 'Active Development': return 20;
    case 'Exploration': return 15;
    default: return 18;
  }
}

export function SkillNetwork({ skills, onSelectSkill, selectedSkill, visualizationType }: SkillNetworkProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isMounted, setMounted] = useState(false)
  const [simulationRunning, setSimulationRunning] = useState(true)
  const simulationRef = useRef<d3.Simulation<NodeData, LinkData> | null>(null);
  
  // Set isMounted to true when component mounts on client
  useEffect(() => {
    setMounted(true)
    
    // Add CSS styles for node and link highlighting
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .node-highlighted circle {
        stroke: white;
        stroke-width: 2px;
        filter: url(#skill-glow-filter);
      }
      
      .node-faded circle {
        opacity: 0.3;
      }
      
      .node-faded text {
        opacity: 0.3;
      }
      
      .link-highlighted {
        stroke-linecap: round;
        filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
      }
      
      .link-faded {
        opacity: 0.1;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Render the network visualization
  useEffect(() => {
    if (!isMounted || !svgRef.current || !containerRef.current || skills.length === 0 || visualizationType !== "network") {
      console.log("Not rendering network:", { 
        isMounted, 
        hasSvgRef: !!svgRef.current, 
        hasContainerRef: !!containerRef.current, 
        skillsLength: skills.length, 
        visualizationType 
      });
      return;
    }

    console.log("Rendering network with skills:", skills.map(s => s.id));

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    // Ensure container is properly sized before getting dimensions
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          console.log("Container resized:", entry.contentRect);
          // Only redraw if we have actual dimensions
          if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
            renderNetworkGraph();
          }
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Render the network graph with current dimensions
    renderNetworkGraph();

    // Function to render the network graph
    function renderNetworkGraph() {
      if (!containerRef.current || !svgRef.current) return;

      // Get container dimensions
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (width === 0 || height === 0) {
        console.log("Container has zero dimensions, delaying render");
        return;
      }

      console.log("Container dimensions:", { width, height });
      
      // Create SVG with zoom capabilities
      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // Function to show/hide labels based on zoom level
      function updateLabelsVisibility(transform: d3.ZoomTransform | null) {
        const scale = transform ? transform.k : 1;
        
        // Show detailed labels only when zoomed in enough
        svg.selectAll(".node-label")
          .style("opacity", scale > 1.2 ? 1 : 0);
      }
      
      // Add zoom behavior
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 3])
        .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
          g.attr("transform", event.transform.toString());
          updateLabelsVisibility(event.transform);
        });
      
      svg.call(zoom);
      
      // Create a group for all elements to enable zooming
      const g = svg.append("g")
        .attr("class", "everything");
        
      // Initialize label visibility
      updateLabelsVisibility(null);
        
      // Add subtle background pattern - deep teal with grid
      const defs = g.append("defs");
      const pattern = defs.append("pattern")
        .attr("id", "skill-grid-pattern")
        .attr("width", 40)
        .attr("height", 40)
        .attr("patternUnits", "userSpaceOnUse");
        
      pattern.append("path")
        .attr("d", "M 40 0 L 0 0 0 40")
        .attr("fill", "none")
        .attr("stroke", "#0A2E2A")
        .attr("stroke-width", 0.5);

      // Apply pattern to background
      g.append("rect")
        .attr("width", width * 4) // Make it larger than viewport for zooming
        .attr("height", height * 4)
        .attr("x", -width * 2)
        .attr("y", -height * 2)
        .attr("fill", "#0A2E2A")
        .attr("opacity", 1);
        
      g.append("rect")
        .attr("width", width * 4) 
        .attr("height", height * 4)
        .attr("x", -width * 2)
        .attr("y", -height * 2)
        .attr("fill", "url(#skill-grid-pattern)")
        .attr("opacity", 0.2);

      // Define simulation nodes with types
      const nodes: NodeData[] = skills.map(skill => ({
        id: skill.id,
        name: skill.name,
        r: getNodeRadius(skill.proficiency),
        category: skill.category,
        skill: skill,
        proficiency: skill.proficiency,
        // Add these properties to satisfy SimulationNodeDatum
        index: undefined,
        x: undefined,
        y: undefined,
        vx: undefined,
        vy: undefined,
        fx: undefined,
        fy: undefined
      }))

      // Create links between nodes
      const links: LinkData[] = []
      
      // Create a map of node ids for faster lookups
      const nodeMap = new Map<string, NodeData>()
      nodes.forEach(node => nodeMap.set(node.id, node))

      skills.forEach(skill => {
        if (skill.relatedSkills && skill.relatedSkills.length) {
          skill.relatedSkills.forEach(relatedId => {
            // Check if the related skill exists in our current filtered set
            if (typeof relatedId === 'string' && nodeMap.has(relatedId)) {
              // Determine strength based on proficiency (higher = stronger link)
              const sourceProf = typeof skill.proficiency === 'number' ? skill.proficiency : 5;
              const targetNode = nodeMap.get(relatedId);
              const targetProf = targetNode && typeof targetNode.skill.proficiency === 'number' 
                ? targetNode.skill.proficiency : 5;
              
              // Average proficiency determines connection strength
              const avgProf = (sourceProf + targetProf) / 20; // Scale to 0-1 range
              
              links.push({
                source: skill.id,
                target: relatedId,
                strength: avgProf
              })
            }
          })
        }
      })

      // Set initial positions if not already set
      nodes.forEach(node => {
        if (!node.x || !node.y) {
          // Distribute nodes in a circular layout initially
          const angle = Math.random() * 2 * Math.PI;
          const radius = Math.min(width, height) * 0.4 * Math.random();
          node.x = width / 2 + radius * Math.cos(angle);
          node.y = height / 2 + radius * Math.sin(angle);
        }
      });

      // Log nodes and links for debugging
      console.log("Nodes created:", nodes.length);
      console.log("Links created:", links.length);
      
      // Create a simulation with improved force parameters
      const simulation = d3.forceSimulation<NodeData, LinkData>(nodes)
        .force("link", d3.forceLink<NodeData, LinkData>(links)
          .id(d => d.id)
          .distance(d => 120) // Fixed distance for clearer visualization
          .strength(0.3)  // Reduced link strength for better distribution
        )
        .force("charge", d3.forceManyBody<NodeData>()
          .strength(d => -400)  // Stronger repulsion to spread nodes apart
          .distanceMax(350)     // Limit the distance of repulsive effect
        )
        .force("collide", d3.forceCollide<NodeData>()
          .radius(d => d.r * 2)  // Increased collision radius
          .strength(0.9)        // Increased collision strength
        )
        .force("center", d3.forceCenter(width / 2, height / 2)
          .strength(0.05)  // Weaker centering force to allow better spreading
        )
        .force("x", d3.forceX(width / 2).strength(0.03)) // Gentle force toward horizontal center
        .force("y", d3.forceY(height / 2).strength(0.03)); // Gentle force toward vertical center
      
      // Store the simulation reference to access it in cleanup
      simulationRef.current = simulation;
      
      // Run the simulation for a few ticks to stabilize initial positions
      simulation.alpha(1).alphaDecay(0.01); // Start with high energy, decay slowly
      for (let i = 0; i < 50; i++) {
        simulation.tick();
      }
      
      // Then set up the tick handler and restart
      simulation.on("tick", ticked);
      simulation.alpha(0.3).restart();

      // Define glow filter for highlighted nodes
      const filter = defs.append("filter")
        .attr("id", "skill-glow-filter")
        .attr("width", "300%")
        .attr("height", "300%")
        .attr("x", "-100%")
        .attr("y", "-100%");
        
      filter.append("feGaussianBlur")
        .attr("stdDeviation", "3.5")
        .attr("result", "blur");
        
      filter.append("feColorMatrix")
        .attr("in", "blur")
        .attr("mode", "matrix")
        .attr("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7")
        .attr("result", "color");
        
      filter.append("feComposite")
        .attr("in", "color")
        .attr("in2", "blur")
        .attr("operator", "in")
        .attr("result", "blur");
        
      filter.append("feMerge")
        .selectAll("feMergeNode")
        .data([null, null])
        .enter()
        .append("feMergeNode")
        .attr("in", (_, i) => i === 0 ? "blur" : "SourceGraphic");

      // Draw links first (so they appear behind nodes)
      const link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", d => {
          // Gradual color based on categories of linked nodes
          const sourceNode = nodeMap.get((d.source as string));
          const targetNode = nodeMap.get((d.target as string));
          if (sourceNode && targetNode) {
            if (sourceNode.category === targetNode.category) {
              // Same category - use category color with reduced opacity
              return categoryColors[sourceNode.category] || "#1E2D3A";
            } else {
              // Different categories - use neutral connection color
              return "#3A4D5C";
            }
          }
          return "#1E2D3A";
        })
        .attr("stroke-opacity", 0.6) // Increased opacity
        .attr("stroke-width", d => Math.max(1.5, d.strength * 4)) // Thicker lines
        .attr("class", "link");

      // Add arrow markers for directed graph look
      defs.append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 30) // Adjust to position arrows just outside the target node
        .attr("refY", 0)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#42513e");
        
      // Add subtle animation to links
      link.each(function() {
        const line = d3.select(this);
        const length = (line.node() as SVGLineElement)?.getTotalLength?.() || 100;
        
        line.attr("stroke-dasharray", `${length} ${length}`)
          .attr("stroke-dashoffset", length)
          .transition()
          .duration(1000)
          .delay((_, i) => i * 10) // Faster animation
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .on("end", function() {
            d3.select(this).attr("stroke-dasharray", null);
          });
      });

      // Draw nodes after links (so they appear on top)
      const node = g.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag<SVGGElement, NodeData, NodeData>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
        )
        .on("click", (event, d) => {
          event.stopPropagation();
          onSelectSkill(d.skill);
          
          // Highlight this node and its connections
          highlightConnections(d.id);
        })
        .on("mouseover", function(_event, d) {
          setHoveredSkill(d.id);
          // Make hover more visually distinct
          d3.select(this).select("circle")
            .transition()
            .duration(200)
            .attr("r", d.r * 1.1)
            .attr("filter", "url(#skill-glow-filter)");
        })
        .on("mouseout", function() {
          setHoveredSkill(null);
          // Reset node on mouseout
          d3.select(this).select("circle")
            .transition()
            .duration(200)
            .attr("r", function(d) { return (d as NodeData).r; })
            .attr("filter", function(d) { 
              return selectedSkill && (d as NodeData).id === selectedSkill.id ? "url(#skill-glow-filter)" : null;
            });
        });

      // Add node circles with improved design
      node.append("circle")
        .attr("r", d => d.r)
        .attr("fill", d => {
          // Create gradient fills for more visual depth
          const baseColor = categoryColors[d.category] || "#1a2e35";
          const id = `gradient-${d.id}`;
          
          // Create unique gradient for each node
          const gradient = defs.append("radialGradient")
            .attr("id", id)
            .attr("cx", "30%")
            .attr("cy", "30%")
            .attr("r", "70%");
            
          // Add gradient stops
          gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", d3.color(baseColor)?.brighter(0.8)?.toString() || baseColor);
            
          gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d3.color(baseColor)?.darker(0.5)?.toString() || baseColor);
            
          return `url(#${id})`;
        })
        .attr("stroke", d => selectedSkill && d.id === selectedSkill.id ? "#ffffff" : "#000000")
        .attr("stroke-width", d => selectedSkill && d.id === selectedSkill.id ? 3 : 1.5)
        .attr("filter", d => selectedSkill && d.id === selectedSkill.id ? "url(#skill-glow-filter)" : null)
        .attr("opacity", 0.95)
        .attr("class", "node-circle")
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          event.stopPropagation();
          onSelectSkill(d.skill);
          
          // Highlight this node and its connections
          highlightConnections(d.id);
        });
        
      // Add custom clip paths for skill icons
      node.append("clipPath")
        .attr("id", d => `clip-${d.id}`)
        .append("circle")
        .attr("r", d => d.r * 0.75);

      // Add node icons or more detailed letter 
      node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .attr("font-size", d => Math.min(d.r * 0.8, 22))
        .attr("font-weight", "bold")
        .attr("fill", d => {
          // Determine text color based on background for better contrast
          const baseColor = categoryColors[d.category] || "#1a2e35";
          return d3.lab(baseColor).l < 65 ? "#ffffff" : "#000000";
        })
        .attr("pointer-events", "none")
        .text(d => d.skill.icon || d.name.substring(0, 2).toUpperCase());  // Use skill icon or first two letters

      // Add a small indicator showing the number of connections
      node.append("circle")
        .filter(d => {
          // Count connections for this node
          const connectionCount = links.filter(l => 
            (l.source.id === d.id || l.target.id === d.id)
          ).length;
          return connectionCount > 2; // Only show for nodes with multiple connections
        })
        .attr("r", 8)
        .attr("cx", d => d.r - 5)
        .attr("cy", d => -d.r + 5)
        .attr("fill", "#f43f5e")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("class", "connection-indicator");

      // Add connection count text
      node.append("text")
        .filter(d => {
          const connectionCount = links.filter(l => 
            (l.source.id === d.id || l.target.id === d.id)
          ).length;
          return connectionCount > 2;
        })
        .attr("x", d => d.r - 5)
        .attr("y", d => -d.r + 5)
        .attr("font-size", "8px")
        .attr("fill", "#fff")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("pointer-events", "none")
        .text(d => {
          const connectionCount = links.filter(l => 
            (l.source.id === d.id || l.target.id === d.id)
          ).length;
          return connectionCount;
        });

      // Add detail label with skill name and proficiency
      node.append("g")
        .attr("class", "node-detail-label")
        .attr("transform", d => `translate(0, ${d.r + 15})`)
        .style("opacity", 0)
        .each(function(d) {
          const detailGroup = d3.select(this);
          
          // Add background
          detailGroup.append("rect")
            .attr("width", d.name.length * 6 + 40)
            .attr("height", 36)
            .attr("x", -(d.name.length * 6 + 40) / 2)
            .attr("y", 0)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("fill", "rgba(0, 0, 0, 0.7)");
            
          // Add skill name
          detailGroup.append("text")
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .attr("fill", "#ffffff")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .text(d.name);
            
          // Add proficiency level
          detailGroup.append("text")
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .attr("fill", "#cccccc")
            .attr("font-size", "10px")
            .text(d => {
              const proficiency = typeof d.skill.proficiency === 'number' 
                ? `${d.skill.proficiency}%` 
                : d.skill.proficiency;
              return `${mapProficiency(d.skill.proficiency)} (${proficiency})`;
            });
        });

      // Show detail label on hover
      node
        .on("mouseover", function(event, d) {
          setHoveredSkill(d.id);
          
          // Highlight node with pulse
          d3.select(this).select("circle")
            .transition()
            .duration(200)
            .attr("r", d.r * 1.1)
            .attr("filter", "url(#skill-glow-filter)");
            
          // Fade in the detail label
          d3.select(this).select(".node-detail-label")
            .transition()
            .duration(200)
            .style("opacity", 1);
            
          // Highlight immediate connections
          link.filter(l => l.source.id === d.id || l.target.id === d.id)
            .transition()
            .duration(200)
            .attr("stroke-opacity", 0.8)
            .attr("stroke-width", l => Math.max(2, (l as LinkData).strength * 5));
            
          // Highlight connected nodes
          node.filter(n => {
            const isConnected = links.some(l => 
              (l.source.id === d.id && l.target.id === n.id) || 
              (l.target.id === d.id && l.source.id === n.id)
            );
            return isConnected;
          })
          .select("circle")
          .transition()
          .duration(200)
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 2);
        })
        .on("mouseout", function() {
          setHoveredSkill(null);
          
          // Reset node appearance
          d3.select(this).select("circle")
            .transition()
            .duration(200)
            .attr("r", function(d) { return (d as NodeData).r; })
            .attr("filter", function(d) { 
              return selectedSkill && (d as NodeData).id === selectedSkill.id ? "url(#skill-glow-filter)" : null;
            });
            
          // Hide the detail label
          d3.select(this).select(".node-detail-label")
            .transition()
            .duration(200)
            .style("opacity", 0);
            
          // Reset links unless there's a selected node
          if (!selectedSkill) {
            link
              .transition()
              .duration(200)
              .attr("stroke-opacity", 0.6)
              .attr("stroke-width", d => Math.max(1.5, (d as LinkData).strength * 4));
              
            node.select("circle")
              .transition()
              .duration(200)
              .attr("stroke", "#000000")
              .attr("stroke-width", 1.5);
          }
        });

      // Add the proficiency bar indicators at bottom of each node (small arc)
      node.append("path")
        .attr("d", d => {
          const profValue = typeof (d as NodeData).proficiency === 'number' ? (d as NodeData).proficiency / 100 : 0.5;
          const radius = (d as NodeData).r - 2;
          const startAngle = Math.PI * 0.8;
          const endAngle = Math.PI * 2.2 * profValue + startAngle;
          
          const arc = d3.arc<any>()
            .innerRadius(radius - 4)
            .outerRadius(radius)
            .startAngle(startAngle)
            .endAngle(endAngle);
            
          return arc({}) || "";
        })
        .attr("fill", d => {
          const profValue = typeof (d as NodeData).proficiency === 'number' ? (d as NodeData).proficiency / 100 : 0.5;
          
          // Color based on proficiency
          if (profValue >= 0.8) return "#34BE82"; // Working - Vibrant Green
          if (profValue >= 0.5) return "#4ECDC4"; // Active Development - Soft Cyan
          return "#8A2BE2"; // Exploration - Rich Purple
        });

      // Add the category indicators (small dot on top)
      node.append("circle")
        .attr("r", 5)
        .attr("cy", d => -d.r + 5)
        .attr("fill", d => categoryColors[d.category])
        .attr("stroke", "#000")
        .attr("stroke-width", 1);
        
      // Add text labels below nodes for full names
      node.append("text")
        .attr("class", "node-label")
        .text(d => d.name)
        .attr("text-anchor", "middle")
        .attr("dy", d => d.r + 15)
        .attr("fill", "#ffffff")
        .attr("font-size", "12px")
        .attr("font-weight", "normal")
        .style("text-shadow", "0 1px 3px rgba(0,0,0,0.9)")
        .style("pointer-events", "none");
        
      // Animate node entrance
      node.attr("opacity", 0)
        .transition()
        .duration(1000)
        .delay((_, i) => i * 30)
        .attr("opacity", 1);
        
      // Add subtle pulse animation to nodes
      function pulseNodes() {
        if (!simulationRunning) return;
        
        node.selectAll(".node-circle")
          .transition()
          .duration(2000)
          .attr("r", function(d: any) { return d.r * (1 + Math.random() * 0.05); })
          .transition()
          .duration(2000)
          .attr("r", function(d: any) { return d.r; })
          .on("end", pulseNodes);
      }
      
      pulseNodes();

      // Add legend for categories
      const legendData = Object.entries(categoryColors).map(([key, value]) => ({ category: key, color: value }));
      
      const legendContainer = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 150}, 20)`);
        
      const legendItems = legendContainer.selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (_, i) => `translate(0, ${i * 25})`);
        
      legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("rx", 7.5)
        .attr("fill", d => d.color);
        
      legendItems.append("text")
        .attr("x", 25)
        .attr("y", 12)
        .text(d => d.category.charAt(0).toUpperCase() + d.category.slice(1))
        .attr("fill", "#ffffff")
        .attr("font-size", 12);
        
      // Add legend for proficiency levels
      const profLegendContainer = svg.append("g")
        .attr("class", "prof-legend")
        .attr("transform", `translate(20, 20)`);
        
      const profData = [
        { label: 'Working', r: getNodeRadius('Advanced') },
        { label: 'Active Development', r: getNodeRadius('Intermediate') },
        { label: 'Exploration', r: getNodeRadius('Basic') }
      ];
      
      const profItems = profLegendContainer.selectAll(".prof-item")
        .data(profData)
        .enter()
        .append("g")
        .attr("class", "prof-item")
        .attr("transform", (_, i) => `translate(0, ${i * 30})`);
        
      profItems.append("circle")
        .attr("r", d => d.r * 0.4)
        .attr("cx", d => d.r * 0.4)
        .attr("cy", 10)
        .attr("fill", "#4ECDC4");
        
      profItems.append("text")
        .attr("x", d => d.r * 0.4 * 2 + 10)
        .attr("y", 14)
        .text(d => d.label)
        .attr("fill", "#ffffff")
        .attr("font-size", 12);

      // Function to position elements during simulation
      function ticked() {
        // Log to verify ticking is happening
        console.log("Simulation tick");
        
        // Update link positions
        link
          .attr("x1", d => {
            const source = typeof d.source === 'string' ? nodeMap.get(d.source) : d.source;
            return source ? source.x || 0 : 0;
          })
          .attr("y1", d => {
            const source = typeof d.source === 'string' ? nodeMap.get(d.source) : d.source;
            return source ? source.y || 0 : 0;
          })
          .attr("x2", d => {
            const target = typeof d.target === 'string' ? nodeMap.get(d.target) : d.target;
            return target ? target.x || 0 : 0;
          })
          .attr("y2", d => {
            const target = typeof d.target === 'string' ? nodeMap.get(d.target) : d.target;
            return target ? target.y || 0 : 0;
          });

        // Keep nodes within view bounds to prevent losing them when zoomed out
        node.attr("transform", d => {
          // Constrain to view boundaries with some buffer
          const buffer = 100;
          const x = Math.max(buffer, Math.min(width - buffer, d.x || 0));
          const y = Math.max(buffer, Math.min(height - buffer, d.y || 0));
          
          return `translate(${x}, ${y})`;
        });
      }

      function dragstarted(event: d3.D3DragEvent<SVGGElement, NodeData, NodeData>, d: NodeData) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(event: d3.D3DragEvent<SVGGElement, NodeData, NodeData>, d: NodeData) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragended(event: d3.D3DragEvent<SVGGElement, NodeData, NodeData>, d: NodeData) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      // Add a function to highlight connections
      function highlightConnections(nodeId: string) {
        // Don't highlight if no node is selected
        if (!nodeId) {
          // Reset all nodes and links to default appearance
          node.classed("node-highlighted", false)
            .classed("node-faded", false);
          
          link.classed("link-highlighted", false)
            .classed("link-faded", false)
            .attr("stroke-width", d => Math.max(1.5, (d as LinkData).strength * 4))
            .attr("stroke-opacity", 0.6);
            
          return;
        }
          
        // Find all connected links and nodes
        const connectedNodeIds = new Set<string>();
        connectedNodeIds.add(nodeId);
          
        // Identify all directly connected nodes
        link.each(function(d: any) {
          const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
          const targetId = typeof d.target === 'string' ? d.target : d.target.id;
            
          if (sourceId === nodeId) {
            connectedNodeIds.add(targetId);
          } else if (targetId === nodeId) {
            connectedNodeIds.add(sourceId);
          }
        });
          
        // Style all nodes based on connection
        node.each(function(d: any) {
          const isSelected = d.id === nodeId;
          const isConnected = connectedNodeIds.has(d.id) && !isSelected;
          const isUnrelated = !connectedNodeIds.has(d.id);
          
          // Apply different styling based on relationship to selected node
          d3.select(this)
            .classed("node-highlighted", isSelected || isConnected)
            .classed("node-faded", isUnrelated)
            .select("circle")
            .transition()
            .duration(300)
            .attr("r", isSelected ? d.r * 1.2 : isConnected ? d.r * 1.1 : d.r)
            .attr("stroke-width", isSelected ? 3 : isConnected ? 2 : 1)
            .attr("opacity", isUnrelated ? 0.3 : 1);
        });
          
        // Style links based on connection to the selected node
        link.each(function(d: any) {
          const sourceId = typeof d.source === 'string' ? d.source : d.source.id;
          const targetId = typeof d.target === 'string' ? d.target : d.target.id;
          const isDirectConnection = sourceId === nodeId || targetId === nodeId;
          
          // Apply styling based on connection
          d3.select(this)
            .classed("link-highlighted", isDirectConnection)
            .classed("link-faded", !isDirectConnection)
            .transition()
            .duration(300)
            .attr("stroke-width", isDirectConnection ? Math.max(2, (d as LinkData).strength * 6) : 1)
            .attr("stroke-opacity", isDirectConnection ? 0.9 : 0.2);
        });
      }

      // Clear highlight when clicking elsewhere
      svg.on("click", () => {
        onSelectSkill(null);
        highlightConnections("");
      });
    }
    
    // Clean up function
    return () => {
      if (resizeObserver) {
        if (containerRef.current) {
          resizeObserver.unobserve(containerRef.current);
        }
        resizeObserver.disconnect();
      }
      
      // Stop any running simulations using the ref
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      
      setSimulationRunning(false);
    };
  }, [isMounted, visualizationType, skills, onSelectSkill, selectedSkill, simulationRunning]);

  // Get the selected skill from props and ensure it exists in our current skill set
  useEffect(() => {
    if (selectedSkill && !skills.find(s => s.id === selectedSkill.id)) {
      // If the selected skill is not in the filtered set, deselect it
      onSelectSkill(null);
    }
  }, [selectedSkill, skills, onSelectSkill]);

  // Render the category view
  const renderCategoryView = () => {
    if (visualizationType !== "category") return null;
    
    // Group skills by category
    const groupedSkills: Record<string, Skill[]> = {};
    
    skills.forEach(skill => {
      if (!groupedSkills[skill.category]) {
        groupedSkills[skill.category] = [];
      }
      groupedSkills[skill.category].push(skill);
    });

    // Define colors for the proficiency circles
    const getProficiencyColor = (proficiency: number | string): string => {
      const num = typeof proficiency === 'number' ? proficiency : 0;
      if (num >= 80) return '#34BE82'; // Working - Vibrant Green
      if (num >= 50) return '#4ECDC4'; // Active Development - Soft Cyan
      return '#8A2BE2'; // Exploration - Rich Purple
    };
    
    return (
      <div className="w-full h-full overflow-auto p-8" style={{ backgroundColor: '#0A2E2A' }}>
        <div className="space-y-10">
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#34BE82]"></div>
              <span className="text-xs text-white">Working (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4ECDC4]"></div>
              <span className="text-xs text-white">Active Development (50-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8A2BE2]"></div>
              <span className="text-xs text-white">Exploration (Below 50%)</span>
            </div>
          </div>
          
          {/* Categories */}
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-5 rounded-lg bg-black/20 backdrop-blur-sm"
            >
              <h3 className="text-lg font-medium text-white capitalize mb-4">{category}</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categorySkills.map((skill) => {
                  const proficiency = typeof skill.proficiency === 'number' ? skill.proficiency : 50;
                  const proficiencyColor = getProficiencyColor(proficiency);
                  
                  return (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => onSelectSkill(skill)}
                      className={`relative flex flex-col items-center p-3 rounded-lg bg-black/30 cursor-pointer
                        ${selectedSkill?.id === skill.id ? 'ring-2 ring-premium-green' : ''}`}
                    >
                      {/* Circular progress indicator */}
                      <div className="relative w-16 h-16 mb-2">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          {/* Background circle */}
                          <circle 
                            cx="18" cy="18" r="15.9" 
                            fill="none" 
                            stroke="#333" 
                            strokeWidth="1"
                          />
                          
                          {/* Foreground circle - animated progress */}
                          <motion.circle 
                            cx="18" cy="18" r="15.9" 
                            fill="none" 
                            stroke={proficiencyColor}
                            strokeWidth="2.5"
                            strokeDasharray={`${proficiency} 100`}
                            strokeDashoffset="25"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 100" }}
                            animate={{ strokeDasharray: `${proficiency} 100` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                          
                          {/* Skill icon or text */}
                          <text 
                            x="18" y="20" 
                            textAnchor="middle" 
                            fontSize="10"
                            fill="white"
                          >
                            {skill.icon || skill.name.charAt(0)}
                          </text>
                        </svg>
                        {/* Proficiency percentage */}
                        <div className="absolute -bottom-1 -right-1 bg-black text-white text-xs px-1 rounded-sm">
                          {proficiency}%
                        </div>
                      </div>
                      
                      {/* Skill name */}
                      <h4 className="text-sm font-medium text-white text-center">{skill.name}</h4>
                      
                      {/* Proficiency label */}
                      <span className="text-xs text-gray-300 mt-1">
                        {mapProficiency(skill.proficiency)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Tooltip content for hovered skill
  const tooltipContent = hoveredSkill ? skills.find(s => s.id === hoveredSkill) : null

  // Render detailed skill card for mobile
  const renderMobileDetail = () => {
    if (!selectedSkill) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-md text-slate-100 p-4 rounded-t-xl shadow-xl z-50"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">{selectedSkill.name}</h3>
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full" 
            style={{backgroundColor: categoryColors[selectedSkill.category]}}
          >
            {selectedSkill.category}
          </span>
        </div>
        
        <div className="mt-2 text-sm text-slate-300">{selectedSkill.description}</div>
        
        <div className="mt-2 flex items-center text-xs text-slate-400">
          <span className="mr-2 font-semibold">{mapProficiency(selectedSkill.proficiency)}</span>
          <span>•</span>
          <span className="ml-2">{selectedSkill.experience}</span>
        </div>
        
        {selectedSkill.relatedSkills && selectedSkill.relatedSkills.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-400">Related Skills:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedSkill.relatedSkills.map(relId => {
                const relatedSkill = skills.find(s => s.id === relId)
                return relatedSkill ? (
                  <span 
                    key={relatedSkill.id}
                    className="px-2 py-0.5 bg-slate-700 rounded text-xs cursor-pointer hover:bg-slate-600"
                    onClick={() => onSelectSkill(relatedSkill)}
                  >
                    {relatedSkill.name}
                  </span>
                ) : null
              })}
            </div>
          </div>
        )}
        
        <button 
          onClick={() => onSelectSkill(null as unknown as Skill)} 
          className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        position: 'relative', 
        minHeight: '500px',
        overflow: 'hidden'
      }}
    >
      {visualizationType === "network" ? (
        <svg 
          ref={svgRef} 
          className="w-full h-full" 
          style={{ display: 'block' }}
        />
      ) : (
        renderCategoryView()
      )}
      
      {/* Tooltip (desktop) */}
      <AnimatePresence>
        {tooltipContent && !selectedSkill && visualizationType === "network" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute hidden md:block bg-slate-800/90 backdrop-blur-sm text-slate-100 px-4 py-2 rounded-lg shadow-xl z-50 max-w-xs"
            style={{
              left: "50%",
              bottom: "1rem",
              transform: "translateX(-50%)"
            }}
          >
            <h3 className="text-lg font-medium mb-1">{tooltipContent.name}</h3>
            <p className="text-sm text-slate-300">{tooltipContent.description}</p>
            <div className="text-xs text-slate-400 mt-1">
              <span className="font-semibold">{mapProficiency(tooltipContent.proficiency)}</span>
              {" • "}
              {tooltipContent.experience}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile detail card */}
      <AnimatePresence>
        {selectedSkill && window.innerWidth < 768 && renderMobileDetail()}
      </AnimatePresence>
    </div>
  )
} 