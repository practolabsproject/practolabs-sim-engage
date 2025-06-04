
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

const EnergyGap = () => {
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [voltage, setVoltage] = useState(0.7); // Volts
  const [current, setCurrent] = useState(0.001); // Amperes
  const [isRunning, setIsRunning] = useState(false);
  const [showEnergyGap, setShowEnergyGap] = useState(true);
  
  // Calculate energy gap (simplified)
  const energyGap = 1.12; // eV for Silicon at room temperature
  
  const generateIVData = () => {
    const data = [];
    for (let v = 0; v <= 1.5; v += 0.05) {
      const i = v > 0.6 ? Math.exp((v - 0.7) * 38.7) * 1e-12 : 1e-12;
      data.push({
        voltage: parseFloat(v.toFixed(2)),
        current: i,
        logCurrent: Math.log10(i)
      });
    }
    return data;
  };
  
  const ivData = generateIVData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Energy Gap of P-N Junction Diode</h1>
        <p className="text-muted-foreground mt-2">
          Measure the energy gap of a P-N junction diode and understand semiconductor principles.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Diode Simulation</CardTitle>
            <CardDescription>
              Interactive P-N junction diode characteristics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gradient-to-r from-blue-100 to-red-100 rounded-lg flex items-center justify-center border">
                <div className="text-center">
                  <div className="w-32 h-16 bg-blue-500 rounded-l-lg inline-block"></div>
                  <div className="w-32 h-16 bg-red-500 rounded-r-lg inline-block"></div>
                  <p className="mt-4 text-sm text-muted-foreground">P-N Junction Diode</p>
                  <p className="text-lg font-semibold">V = {voltage.toFixed(2)}V</p>
                  <p className="text-sm">I = {current.toFixed(6)}A</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => {setVoltage(0.7); setCurrent(0.001);}}>
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-gap" checked={showEnergyGap} onCheckedChange={setShowEnergyGap} />
                <Label htmlFor="show-gap">Show Energy Gap</Label>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </div>
            
            {showEnergyGap && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Energy Gap (Eg):</strong> {energyGap} eV
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  The energy gap determines the minimum voltage required for current conduction in a diode.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust diode settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Temperature (K): {temperature}</Label>
              <Slider
                min={250}
                max={400}
                step={1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Applied Voltage (V): {voltage.toFixed(2)}</Label>
              <Slider
                min={0}
                max={1.5}
                step={0.01}
                value={[voltage]}
                onValueChange={(value) => setVoltage(value[0])}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Concepts</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Forward bias reduces barrier</li>
                <li>• Reverse bias increases barrier</li>
                <li>• Energy gap affects threshold voltage</li>
                <li>• Temperature affects current</li>
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
          <CardTitle>I-V Characteristics</CardTitle>
          <CardDescription>Current vs Voltage relationship</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="linear">
            <TabsList>
              <TabsTrigger value="linear">Linear Scale</TabsTrigger>
              <TabsTrigger value="log">Log Scale</TabsTrigger>
            </TabsList>
            
            <TabsContent value="linear">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ivData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="voltage" label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="current" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="log">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ivData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="voltage" label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Log Current', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="logCurrent" stroke="#14B8A6" strokeWidth={2} dot={false} />
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
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <h3>P-N Junction Diode</h3>
            <p>
              A P-N junction diode is formed by joining p-type and n-type semiconductors. 
              The energy gap determines the electrical properties of the diode.
            </p>
            <h4>Energy Gap Measurement</h4>
            <p>The energy gap can be determined from the I-V characteristics using:</p>
            <pre className="bg-muted p-2 rounded">Eg = q × Vth</pre>
            <p>where Vth is the threshold voltage and q is the elementary charge.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyGap;
