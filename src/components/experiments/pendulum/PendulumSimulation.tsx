
import React, { useRef, useEffect, useState } from 'react';

interface PendulumProps {
  length: number;   // Pendulum length (0.1 to 2.0 meters)
  gravity: number;  // Gravity (1.0 to 20.0 m/s²)
  angle: number;    // Initial angle (-30 to 30 degrees)
  damping: number;  // Damping factor (0.0 to 1.0)
  isRunning: boolean;
}

const PendulumSimulation: React.FC<PendulumProps> = ({ 
  length, 
  gravity, 
  angle, 
  damping, 
  isRunning 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  // Convert to radians and scale appropriately
  const angleRad = (angle * Math.PI) / 180;
  const scaledLength = length * 100; // Scale for visualization
  
  // Animation loop
  const animate = (currentTime: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = (currentTime - previousTimeRef.current) / 1000;
      
      // Only increment time if the simulation is running
      if (isRunning) {
        setTime(prevTime => prevTime + deltaTime);
      }
    }
    previousTimeRef.current = currentTime;
    requestRef.current = requestAnimationFrame(animate);
  };
  
  // Start and stop animation
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current as number);
  }, [isRunning]);
  
  // Reset simulation when needed
  useEffect(() => {
    if (!isRunning) {
      setTime(0);
    }
  }, [isRunning, length, gravity, angle, damping]);
  
  // Draw pendulum
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate pendulum position
    const centerX = canvas.width / 2;
    const pivotY = canvas.height * 0.2;
    
    // Calculate angular position using damped simple harmonic motion
    const omega = Math.sqrt(gravity / length);
    const currentAngle = angleRad * Math.cos(omega * time) * Math.exp(-damping * time);
    
    const bobX = centerX + Math.sin(currentAngle) * scaledLength;
    const bobY = pivotY + Math.cos(currentAngle) * scaledLength;
    
    // Draw pivot point
    ctx.beginPath();
    ctx.arc(centerX, pivotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    
    // Draw string
    ctx.beginPath();
    ctx.moveTo(centerX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw bob
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#0EA5E9';
    ctx.fill();
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw time
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText(`Time: ${time.toFixed(1)}s`, 10, 20);
    
  }, [time, length, gravity, angle, damping, scaledLength, angleRad]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={500} 
      height={400} 
      className="border border-border rounded-lg bg-white w-full"
    />
  );
};

export default PendulumSimulation;
