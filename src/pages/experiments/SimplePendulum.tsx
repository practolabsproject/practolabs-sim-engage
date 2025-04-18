
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Download, Play, Pause, Undo, Share } from 'lucide-react';
import PendulumSimulation from '@/components/experiments/pendulum/PendulumSimulation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimplePendulum = () => {
  // Simulation parameters
  const [length, setLength] = useState(1.0); // meters
  const [gravity, setGravity] = useState(9.8); // m/s²
  const [angle, setAngle] = useState(15); // degrees
  const [damping, setDamping] = useState(0.1); // damping factor
  const [isRunning, setIsRunning] = useState(false);
  const [showPeriod, setShowPeriod] = useState(true);
  
  // Calculate period using the formula T = 2π√(L/g)
  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  
  // Mock data for demonstration
  const generateGraphData = () => {
    const data = [];
    const omega = Math.sqrt(gravity / length);
    
    for (let t = 0; t <= 10; t += 0.1) {
      data.push({
        time: parseFloat(t.toFixed(1)),
        angle: angle * Math.cos(omega * t) * Math.exp(-damping * t),
        velocity: -angle * omega * Math.sin(omega * t) * Math.exp(-damping * t),
      });
    }
    
    return data;
  };
  
  const graphData = generateGraphData();
  
  const handleReset = () => {
    setIsRunning(false);
  };
  
  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Simple Pendulum</h1>
        <p className="text-muted-foreground mt-2">
          Explore the oscillatory motion of a pendulum and discover how its period relates to its length and the acceleration of gravity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Simulation</CardTitle>
            <CardDescription>
              Watch how a pendulum moves with different parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <PendulumSimulation
                length={length}
                gravity={gravity}
                angle={angle}
                damping={damping}
                isRunning={isRunning}
              />
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handlePlayPause}
                >
                  {isRunning ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleReset}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-period" 
                  checked={showPeriod}
                  onCheckedChange={setShowPeriod}
                />
                <Label htmlFor="show-period">Show Period</Label>
              </div>
              
              <div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download Data</span>
                </Button>
              </div>
            </div>
            
            {showPeriod && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Period (T):</strong> {period.toFixed(2)} seconds
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  The period of a pendulum is T = 2π√(L/g), where L is the length and g is the acceleration due to gravity.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>
              Adjust the pendulum settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="length">Length (m): {length.toFixed(2)}</Label>
              </div>
              <Slider
                id="length"
                min={0.1}
                max={2.0}
                step={0.01}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="gravity">Gravity (m/s²): {gravity.toFixed(1)}</Label>
              </div>
              <Slider
                id="gravity"
                min={1.0}
                max={20.0}
                step={0.1}
                value={[gravity]}
                onValueChange={(value) => setGravity(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="angle">Initial Angle (°): {angle.toFixed(0)}</Label>
              </div>
              <Slider
                id="angle"
                min={-30}
                max={30}
                step={1}
                value={[angle]}
                onValueChange={(value) => setAngle(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="damping">Damping: {damping.toFixed(2)}</Label>
              </div>
              <Slider
                id="damping"
                min={0.0}
                max={1.0}
                step={0.01}
                value={[damping]}
                onValueChange={(value) => setDamping(value[0])}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Experiment Notes</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Small angles follow simple harmonic motion</li>
                <li>• Period is independent of mass</li>
                <li>• Period increases with length</li>
                <li>• Period decreases with gravity</li>
              </ul>
            </div>
            
            <div className="pt-2">
              <Button className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Share Experiment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
          <CardDescription>
            Visualize pendulum data over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="position">
            <TabsList className="mb-4">
              <TabsTrigger value="position">Position</TabsTrigger>
              <TabsTrigger value="velocity">Velocity</TabsTrigger>
              <TabsTrigger value="phase">Phase Space</TabsTrigger>
            </TabsList>
            
            <TabsContent value="position">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      label={{ value: 'Angle (°)', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="angle" 
                      stroke="#0EA5E9" 
                      strokeWidth={2} 
                      dot={false} 
                      name="Angle" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="velocity">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      label={{ value: 'Angular Velocity (°/s)', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="velocity" 
                      stroke="#14B8A6" 
                      strokeWidth={2} 
                      dot={false} 
                      name="Velocity" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="phase">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="angle" 
                      label={{ value: 'Angle (°)', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      dataKey="velocity" 
                      label={{ value: 'Angular Velocity (°/s)', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="velocity" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                      dot={false} 
                      name="Phase Space" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Theory</CardTitle>
          <CardDescription>
            Learn about the physics behind pendulum motion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <h3>Simple Pendulum</h3>
            <p>
              A simple pendulum consists of a mass (bob) attached to a lightweight rod or string, 
              which is fixed at the upper end. When displaced from its equilibrium position, the pendulum 
              oscillates about a fixed point.
            </p>
            
            <h4>Equation of Motion</h4>
            <p>
              For small angles, the motion of a simple pendulum can be approximated as simple 
              harmonic motion. The equation governing this motion is:
            </p>
            <pre className="bg-muted p-2 rounded">d²θ/dt² + (g/L)·θ = 0</pre>
            
            <h4>Period of Oscillation</h4>
            <p>
              The period (T) of a simple pendulum is the time taken for one complete oscillation. 
              For small angles, it is given by:
            </p>
            <pre className="bg-muted p-2 rounded">T = 2π·√(L/g)</pre>
            <p>where:</p>
            <ul>
              <li>T is the period in seconds</li>
              <li>L is the length of the pendulum in meters</li>
              <li>g is the acceleration due to gravity (approximately 9.8 m/s² on Earth)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplePendulum;
