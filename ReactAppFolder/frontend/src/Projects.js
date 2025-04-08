import React, { useState } from 'react';
import ProjectCard from './ProjectInfoCard';
import { Container, Typography } from '@mui/material';

function Projects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Homework 1",
      description: "Learning basics of git and github for version control",
      members: 5,
      joined: false,
      hardware: [
        { name: "Hw1 set1 Part 1", available: 6, checkedOut: 2 },
        { name: "Hw1 set 2 Part 2", available: 8, checkedOut: 4 }
      ]
    },
    {
      id: 2,
      name: "Homework 2",
      description: "Learning basics of python and data structures",
      members: 6,
      joined: false,
      hardware: [
        { name: "Hw2 set1", available: 10, checkedOut: 3 },
        { name: "Hw2 set2", available: 15, checkedOut: 7 }
      ]
    },
    {
      id: 3,
      name: "Homework 3",
      description: "Creating APIs for a mobile application",
      members: 7,
      joined: false,
      hardware: [
        { name: "Hw3 set", available: 100, checkedOut: 20 }
      ]
    }
  ]);

  const handleToggleJoin = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const endpoint = project.joined
      ? `http://localhost:5000/leave/${projectId}`
      : `http://localhost:5000/join/${projectId}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      alert(data.message);
      
      setProjects(projects.map(p => {
        if (p.id === projectId) {
          return { 
            ...p, 
            joined: !p.joined,
            members: p.joined ? p.members - 1 : p.members + 1
          };
        }
        return p;
      }));
    } catch (error) {
      console.error("Error toggling join state:", error);
    }
  };

  // Handler to update hardware check in/out using API calls
  const handleHardwareUpdate = async (projectId, hardwareName, quantityChange) => {
    const absQty = Math.abs(quantityChange);
    const endpoint = quantityChange > 0 
      ? `http://localhost:5000/checkout/${projectId}/${absQty}`
      : `http://localhost:5000/checkin/${projectId}/${absQty}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      alert(data.message);
      
      setProjects(projects.map(project => {
        if (project.id === projectId) {
          const updatedHardware = project.hardware.map(hardware => {
            if (hardware.name === hardwareName) {
              const newCheckedOut = hardware.checkedOut + quantityChange;
              if (newCheckedOut < 0 || newCheckedOut > hardware.available) return hardware;
              return { ...hardware, checkedOut: newCheckedOut };
            }
            return hardware;
          });
          return { ...project, hardware: updatedHardware };
        }
        return project;
      }));
    } catch (error) {
      console.error("Error updating hardware:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">
        Projects
      </Typography>
      {projects.map(project => (
        <ProjectCard 
          key={project.id}
          project={project}
          onToggleJoin={handleToggleJoin}
          onHardwareUpdate={handleHardwareUpdate}
        />
      ))}
    </Container>
  );
}

export default Projects;
