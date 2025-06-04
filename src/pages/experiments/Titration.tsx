
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

const Titration = () => {
  const [volume, setVolume] = useState(0); // mL of titrant added
  const [concentration, setConcentration] = useState(0.1); // M concentration
  const [analyte, setAnalyte] = useState(25); // mL of analyte
  const [isRunning, setIsRunning] = useState(false);
  const [showEquivalence, setShowEquivalence] = useState(true);
  
  // Calculate pH during titration (simplified strong acid-strong base)
  const calculatePH = (volumeAdded: number) => {
    const molesBase = (volumeAdded / 1000) * concentration;
    const molesAcid = (analyte / 1000) * 0.1; // Assume 0.1M acid
    const totalVolume = (analyte + volumeAdded) / 1000;
    
    if (molesBase < molesAcid) {
      // Excess acid
      const excessAcid = (molesAcid - molesBase) / totalVolume;
      return -Math.log10(excessAcid);
    } else if (molesBase > molesAcid) {
      // Excess base
      const excessBase = (molesBase - molesAcid) / totalVolume;
      const pOH = -Math.log10(excessBase);
      return 14 - pOH;
    } else {
      // Equivalence point
      return 7;
    }
  };
  
  const equivalenceVolume = (analyte * 0.1) / concentration;
  const currentPH = calculatePH(volume);
  
  const generateTitrationData = () => {
    const data = [];
    for (let v = 0; v <= equivalenceVolume * 2; v += 0.5) {
      data.push({
        volume: parseFloat(v.toFixed(1)),
        pH: parseFloat(calculatePH(v).toFixed(2))
      });
    }
    return data;
  };
  
  const titrationData = generateTitrationData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Titration</h1>
        <p className="text-muted-foreground mt-2">
          Perform acid-base titrations and determine the concentration of unknown solutions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Titration Setup</CardTitle>
            <CardDescription>
              Interactive acid-base titration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-gradient-to-b from-blue-100 to-white rounded-lg relative border">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-32 bg-gray-300 rounded-t-full relative">
                    <div className="absolute bottom-0 w-full bg-blue-400 rounded-b-full" style={{height: `${Math.min(volume / equivalenceVolume * 100, 100)}%`}}></div>
                  </div>
                  <p className="text-xs text-center mt-1">Burette</p>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-24 bg-gray-200 rounded-full relative">
                    <div className="absolute bottom-0 w-full bg-pink-300 rounded-b-full" style={{height: '60%'}}></div>
                  </div>
                  <p className="text-xs text-center mt-1">Conical Flask</p>
                </div>
                <div className="absolute bottom-4 right-4 text-center">
                  <p className="text-sm font-semibold">pH: {currentPH.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Volume: {volume.toFixed(1)} mL</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => setIsRunning(!isRunning)}>
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => setVolume(0)}>
                  <Undo className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="show-equiv" checked={showEquivalence} onCheckedChange={setShowEquivalence} />
                <Label htmlFor="show-equiv">Show Equivalence Point</Label>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Data
              </Button>
            </div>
            
            {showEquivalence && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Equivalence Point:</strong> {equivalenceVolume.toFixed(1)} mL
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  At equivalence point: moles acid = moles base
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust titration settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Volume Added (mL): {volume.toFixed(1)}</Label>
              <Slider
                min={0}
                max={equivalenceVolume * 2}
                step={0.1}
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Titrant Concentration (M): {concentration.toFixed(2)}</Label>
              <Slider
                min={0.01}
                max={1.0}
                step={0.01}
                value={[concentration]}
                onValueChange={(value) => setConcentration(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Analyte Volume (mL): {analyte}</Label>
              <Slider
                min={10}
                max={50}
                step={1}
                value={[analyte]}
                onValueChange={(value) => setAnalyte(value[0])}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Calculations</h3>
              <div className="text-xs space-y-1">
                <p>Current pH: {currentPH.toFixed(2)}</p>
                <p>Equivalence point: {equivalenceVolume.toFixed(1)} mL</p>
                <p>% Neutralized: {((volume / equivalenceVolume) * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Points</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Sharp pH change at equivalence</li>
                <li>• Indicator color change</li>
                <li>• Stoichiometric calculations</li>
                <li>• Buffer regions</li>
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
          <CardTitle>Titration Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={titrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="volume" 
                  label={{ value: 'Volume of Titrant (mL)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  domain={[0, 14]}
                  label={{ value: 'pH', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="pH" 
                  stroke="#0EA5E9" 
                  strokeWidth={3} 
                  dot={false}
                  name="pH"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Titration;
