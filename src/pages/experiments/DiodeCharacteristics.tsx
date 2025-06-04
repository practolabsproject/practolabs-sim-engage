
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

const DiodeCharacteristics = () => {
  const [voltage, setVoltage] = useState(0.7); // Volts
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [isRunning, setIsRunning] = useState(false);
  const [showForward, setShowForward] = useState(true);
  const [showReverse, setShowReverse] = useState(true);
  
  const generateDiodeData = () => {
    const data = [];
    // Forward bias data
    for (let v = 0; v <= 1.0; v += 0.01) {
      const current = v > 0.6 ? Math.exp((v - 0.7) * 38.7) * 1e-12 : 1e-12;
      data.push({
        voltage: parseFloat(v.toFixed(2)),
        current: current,
        type: 'forward'
      });
    }
    // Reverse bias data
    for (let v = -5; v <= 0; v += 0.1) {
      data.push({
        voltage: parseFloat(v.toFixed(1)),
        current: -1e-9, // Reverse saturation current
        type: 'reverse'
      });
    }
    return data;
  };
  
  const diodeData = generateDiodeData();
  const forwardData = diodeData.filter(d => d.voltage >= 0);
  const reverseData = diodeData.filter(d => d.voltage < 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Diode Characteristics</h1>
        <p className="text-muted-foreground mt-2">
          Study the voltage-current characteristics of semiconductor diodes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Diode Circuit</CardTitle>
            <CardDescription>
              Interactive diode characteristic measurement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center border">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                      V = {voltage.toFixed(2)}V
                    </div>
                    <div className="w-8 h-8 border-2 border-gray-400 transform rotate-45 relative">
                      <div className="absolute inset-0 bg-red-500 clip-triangle-left"></div>
                      <div className="absolute inset-0 bg-gray-300 clip-triangle-right"></div>
                    </div>
                    <div className="w-16 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                      I
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Diode Test Circuit</p>
                  <p className="text-lg font-semibold">
                    Current: {voltage > 0.6 ? ((Math.exp((voltage - 0.7) * 38.7) * 1e-12) * 1e6).toFixed(2) + ' μA' : '0 A'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => setVoltage(0.7)}>
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch id="show-forward" checked={showForward} onCheckedChange={setShowForward} />
                  <Label htmlFor="show-forward">Forward</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="show-reverse" checked={showReverse} onCheckedChange={setShowReverse} />
                  <Label htmlFor="show-reverse">Reverse</Label>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust measurement settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Applied Voltage (V): {voltage.toFixed(2)}</Label>
              <Slider
                min={-5}
                max={1.0}
                step={0.01}
                value={[voltage]}
                onValueChange={(value) => setVoltage(value[0])}
              />
            </div>
            
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
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Diode Properties</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Forward voltage: ~0.7V (Si)</li>
                <li>• Exponential I-V relationship</li>
                <li>• Temperature dependent</li>
                <li>• Reverse breakdown voltage</li>
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
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="voltage" 
                  domain={[-5, 1]}
                  label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip />
                <Legend />
                {showForward && (
                  <Line 
                    data={forwardData}
                    type="monotone" 
                    dataKey="current" 
                    stroke="#0EA5E9" 
                    strokeWidth={2} 
                    dot={false}
                    name="Forward Bias"
                  />
                )}
                {showReverse && (
                  <Line 
                    data={reverseData}
                    type="monotone" 
                    dataKey="current" 
                    stroke="#EF4444" 
                    strokeWidth={2} 
                    dot={false}
                    name="Reverse Bias"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiodeCharacteristics;
