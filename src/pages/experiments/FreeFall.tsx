
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

const FreeFall = () => {
  const [height, setHeight] = useState(100); // meters
  const [gravity, setGravity] = useState(9.8); // m/s²
  const [mass, setMass] = useState(1.0); // kg
  const [airResistance, setAirResistance] = useState(0.0); // coefficient
  const [isRunning, setIsRunning] = useState(false);
  const [showEquations, setShowEquations] = useState(true);
  
  // Calculate time to fall
  const timeToFall = Math.sqrt(2 * height / gravity);
  const finalVelocity = gravity * timeToFall;
  
  const generateMotionData = () => {
    const data = [];
    const dt = timeToFall / 50;
    
    for (let i = 0; i <= 50; i++) {
      const t = i * dt;
      const position = height - 0.5 * gravity * t * t;
      const velocity = gravity * t;
      
      data.push({
        time: parseFloat(t.toFixed(2)),
        position: Math.max(0, position),
        velocity: velocity
      });
    }
    return data;
  };
  
  const motionData = generateMotionData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Free Fall Motion</h1>
        <p className="text-muted-foreground mt-2">
          Study the motion of objects falling under the influence of gravity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Free Fall Simulation</CardTitle>
            <CardDescription>
              Visualize object falling under gravity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg relative border">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-sm text-muted-foreground">Ground Level</p>
                  <p className="text-lg font-semibold">Height: {height}m</p>
                  <p className="text-sm">Time to fall: {timeToFall.toFixed(2)}s</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => {setHeight(100); setGravity(9.8);}}>
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-equations" checked={showEquations} onCheckedChange={setShowEquations} />
                <Label htmlFor="show-equations">Show Equations</Label>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </div>
            
            {showEquations && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Final Velocity:</strong> v = √(2gh) = {finalVelocity.toFixed(2)} m/s
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Position: h = h₀ - ½gt², Velocity: v = gt
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust free fall settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Initial Height (m): {height}</Label>
              <Slider
                min={1}
                max={200}
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
            
            <div className="space-y-2">
              <Label>Mass (kg): {mass.toFixed(1)}</Label>
              <Slider
                min={0.1}
                max={10.0}
                step={0.1}
                value={[mass]}
                onValueChange={(value) => setMass(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Air Resistance: {airResistance.toFixed(2)}</Label>
              <Slider
                min={0.0}
                max={1.0}
                step={0.01}
                value={[airResistance]}
                onValueChange={(value) => setAirResistance(value[0])}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Points</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Acceleration is constant (g)</li>
                <li>• Mass doesn't affect fall time</li>
                <li>• Air resistance opposes motion</li>
                <li>• Energy is conserved</li>
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
          <CardTitle>Motion Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="position">
            <TabsList>
              <TabsTrigger value="position">Position vs Time</TabsTrigger>
              <TabsTrigger value="velocity">Velocity vs Time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="position">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={motionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Position (m)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="position" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="velocity">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={motionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Velocity (m/s)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="velocity" stroke="#14B8A6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeFall;
