
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

const CircuitAnalysis = () => {
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(100); // Ohms
  const [isRunning, setIsRunning] = useState(false);
  const [showOhmsLaw, setShowOhmsLaw] = useState(true);
  
  // Calculate current using Ohm's law
  const current = voltage / resistance;
  const power = voltage * current;
  
  const generateOhmsLawData = () => {
    const data = [];
    for (let v = 0; v <= 20; v += 0.5) {
      data.push({
        voltage: v,
        current: v / resistance,
        power: (v * v) / resistance
      });
    }
    return data;
  };
  
  const ohmsData = generateOhmsLawData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Circuit Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Verify Ohm's Law and Kirchhoff's Laws through interactive circuit experiments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Simple Circuit</CardTitle>
            <CardDescription>
              Basic resistive circuit for Ohm's Law verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center border">
                <div className="text-center">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="w-16 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                      +{voltage}V
                    </div>
                    <div className="w-16 h-8 bg-yellow-500 rounded flex items-center justify-center text-black text-xs">
                      {resistance}Ω
                    </div>
                    <div className="w-16 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                      {current.toFixed(3)}A
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Basic Resistive Circuit</p>
                  <p className="text-lg font-semibold">Power: {power.toFixed(2)}W</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => {setVoltage(12); setResistance(100);}}>
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-ohms" checked={showOhmsLaw} onCheckedChange={setShowOhmsLaw} />
                <Label htmlFor="show-ohms">Show Ohm's Law</Label>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </div>
            
            {showOhmsLaw && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Ohm's Law:</strong> V = I × R = {voltage.toFixed(1)}V
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Power: P = V × I = V²/R = I²R = {power.toFixed(2)}W
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust circuit values</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Voltage (V): {voltage}</Label>
              <Slider
                min={0}
                max={24}
                step={0.1}
                value={[voltage]}
                onValueChange={(value) => setVoltage(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Resistance (Ω): {resistance}</Label>
              <Slider
                min={10}
                max={1000}
                step={10}
                value={[resistance]}
                onValueChange={(value) => setResistance(value[0])}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Calculated Values</h3>
              <div className="text-xs space-y-1">
                <p>Current: {current.toFixed(3)} A</p>
                <p>Power: {power.toFixed(2)} W</p>
                <p>Resistance: {resistance} Ω</p>
                <p>Voltage: {voltage} V</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Laws</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Ohm's Law: V = I × R</li>
                <li>• Power: P = V × I</li>
                <li>• Kirchhoff's Current Law</li>
                <li>• Kirchhoff's Voltage Law</li>
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
          <CardTitle>Circuit Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vi">
            <TabsList>
              <TabsTrigger value="vi">V-I Characteristics</TabsTrigger>
              <TabsTrigger value="power">Power Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vi">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ohmsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="voltage" 
                      label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      stroke="#0EA5E9" 
                      strokeWidth={2} 
                      dot={false}
                      name="Current"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="power">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ohmsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="voltage" 
                      label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      label={{ value: 'Power (W)', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="power" 
                      stroke="#14B8A6" 
                      strokeWidth={2} 
                      dot={false}
                      name="Power"
                    />
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

export default CircuitAnalysis;
