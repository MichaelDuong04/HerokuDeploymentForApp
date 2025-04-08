import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import HardwareSet from './HardwareSet';

function ProjectCard({ project, onToggleJoin, onHardwareUpdate }) {
  const handleHardwareUpdate = (hardwareName, quantityChange) => {
    onHardwareUpdate(project.id, hardwareName, quantityChange);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{project.name}</Typography>
        <Typography variant="body1">{project.description}</Typography>
        <Typography variant="body2">
          Status: {project.joined ? "Joined" : "Not Joined"}
        </Typography>
        <Typography variant="body2">
          Members: {project.members}
        </Typography>
        
        {project.hardware.map((item, index) => (
          <HardwareSet 
            key={index} 
            hardware={item} 
            projectJoined={project.joined} 
            onHardwareUpdate={handleHardwareUpdate} 
          />
        ))}
        
        <Button 
          variant="contained"
          onClick={() => onToggleJoin(project.id)}
        >
          {project.joined ? "Leave Project" : "Join Project"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
