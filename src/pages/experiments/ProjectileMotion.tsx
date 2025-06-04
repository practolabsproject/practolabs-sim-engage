
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Download, Play, Pause, Undo, Share } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectileMotion = () => {
  const [velocity, setVelocity] = useState(20); // m/s
  const [angle, setAngle] = useState(45); // degrees
  const [height, setHeight] = useState(0); // initial height in meters
  const [gravity, setGravity] = useState(9.8); // m/s²
  const [isRunning, setIsRunning] = useState(false);
  const [showTrajectory, setShowTrajectory] = useState(true);
  
  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180;
  
  // Calculate motion parameters
  const vx = velocity * Math.cos(angleRad);
  const vy = velocity * Math.sin(angleRad);
  const timeOfFlight = (vy + Math.sqrt(vy * vy + 2 * gravity * height)) / gravity;
  const range = vx * timeOfFlight;
  const maxHeight = height + (vy * vy) / (2 * gravity);
  
  const generateTrajectoryData = () => {
    const data = [];
    const dt = timeOfFlight / 100;
    
    for (let i = 0; i <= 100; i++) {
      const t = i * dt;
      const x = vx * t;
      const y = height + vy * t - 0.5 * gravity * t * t;
      
      if (y >= 0) {
        data.push({
          x: parseFloat(x.toFixed(2)),
          y: parseFloat(y.toFixed(2)),
          time: parseFloat(t.toFixed(2))
        });
      }
    }
    return data;
  };
  
  const trajectoryData = generateTrajectoryData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projectile Motion</h1>
        <p className="text-muted-foreground mt-2">
          Examine the path of a projectile and explore factors that affect its trajectory.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Projectile Simulation</CardTitle>
            <CardDescription>
              Visualize projectile motion trajectory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg relative border">
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-4 left-4 text-xs">Launch</div>
                <div className="absolute bottom-4 right-4 text-center">
                  <p className="text-sm text-muted-foreground">Range: {range.toFixed(1)}m</p>
                  <p className="text-sm text-muted-foreground">Max Height: {maxHeight.toFixed(1)}m</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => {setVelocity(20); setAngle(45); setHeight(0);}}>
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-trajectory" checked={showTrajectory} onCheckedChange={setShowTrajectory} />
                <Label htmlFor="show-trajectory">Show Trajectory</Label>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </div>
            
            {showTrajectory && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Time of Flight:</strong> {timeOfFlight.toFixed(2)}s
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Horizontal: x = v₀cos(θ)t, Vertical: y = h + v₀sin(θ)t - ½gt²
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust projectile settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Initial Velocity (m/s): {velocity}</Label>
              <Slider
                min={5}
                max={50}
                step={1}
                value={[velocity]}
                onValueChange={(value) => setVelocity(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Launch Angle (°): {angle}</Label>
              <Slider
                min={0}
                max={90}
                step={1}
                value={[angle]}
                onValueChange={(value) => setAngle(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Initial Height (m): {height}</Label>
              <Slider
                min={0}
                max={50}
                step={1}
                value={[height]}
                onValueChange={(value) => setHeight(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Gravity (m/s²): {gravity.toFixed(1)}</Label>
              <Slider
                min={1.0}
                max={20.0}
                step={0.1}
                value={[gravity]}
                onValueChange={(value) => setGravity(value[0])}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Insights</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 45° gives maximum range</li>
                <li>• Horizontal velocity is constant</li>
                <li>• Vertical motion is accelerated</li>
                <li>• Parabolic trajectory</li>
              </ul>
            </div>
            
            <Button className="w-full">
              <Share className="h-4 w-4 mr-2" />
              Share Experiment
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Trajectory Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: 'Horizontal Distance (m)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  label={{ value: 'Height (m)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                  formatter={(value, name) => [
                    typeof value === 'number' ? value.toFixed(2) : value, 
                    name === 'y' ? 'Height (m)' : name
                  ]}
                  labelFormatter={(label) => `Distance: ${label}m`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#0EA5E9" 
                  strokeWidth={3} 
                  dot={false} 
                  name="Trajectory"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectileMotion;
