
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  Activity
} from "lucide-react";

const Analytics = () => {
  const performanceData = [
    { month: 'Jan', physics: 85, chemistry: 78, electrical: 90 },
    { month: 'Feb', physics: 88, chemistry: 82, electrical: 92 },
    { month: 'Mar', physics: 92, chemistry: 85, electrical: 94 },
    { month: 'Apr', physics: 89, chemistry: 88, electrical: 96 },
    { month: 'May', physics: 94, chemistry: 90, electrical: 98 },
    { month: 'Jun', physics: 96, chemistry: 93, electrical: 99 }
  ];

  const timeSpentData = [
    { experiment: 'Simple Pendulum', time: 25 },
    { experiment: 'Circuit Analysis', time: 45 },
    { experiment: 'Titration', time: 35 },
    { experiment: 'Free Fall', time: 20 },
    { experiment: 'Diode Characteristics', time: 40 }
  ];

  const subjectDistribution = [
    { name: 'Physics', value: 40, color: '#0EA5E9' },
    { name: 'Chemistry', value: 25, color: '#14B8A6' },
    { name: 'Electrical Engineering', value: 30, color: '#8B5CF6' },
    { name: 'Mathematics', value: 5, color: '#F59E0B' }
  ];

  const recentActivities = [
    { experiment: 'Simple Pendulum', score: 95, date: '2024-06-03', status: 'completed' },
    { experiment: 'Circuit Analysis', score: 88, date: '2024-06-02', status: 'completed' },
    { experiment: 'Titration', score: 92, date: '2024-06-01', status: 'completed' },
    { experiment: 'Free Fall', score: 85, date: '2024-05-31', status: 'completed' },
    { experiment: 'Diode Characteristics', score: 90, date: '2024-05-30', status: 'completed' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart className="h-8 w-8 text-lab-blue" />
        <h1 className="text-3xl font-bold">Learning Analytics</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
            <Progress value={89} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experiments Done</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your performance across different subjects over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="physics" stroke="#0EA5E9" strokeWidth={2} name="Physics" />
                    <Line type="monotone" dataKey="chemistry" stroke="#14B8A6" strokeWidth={2} name="Chemistry" />
                    <Line type="monotone" dataKey="electrical" stroke="#8B5CF6" strokeWidth={2} name="Electrical Eng." />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Spent on Experiments</CardTitle>
                <CardDescription>Average time spent on each experiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeSpentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="experiment" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="time" fill="#0EA5E9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest experiment completions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-lab-blue" />
                        <div>
                          <div className="font-medium">{activity.experiment}</div>
                          <div className="text-sm text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {activity.score}%
                        </Badge>
                        <Badge variant="secondary">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Time allocation across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your current standing in each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectDistribution.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {85 + index * 3}%
                        </span>
                      </div>
                      <Progress value={85 + index * 3} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Physics Master</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete 10 physics experiments
                </p>
                <Badge className="bg-yellow-100 text-yellow-800">Earned</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Circuit Expert</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Score 90+ on circuit experiments
                </p>
                <Badge className="bg-blue-100 text-blue-800">Earned</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Lab Safety Pro</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete safety training
                </p>
                <Badge className="bg-green-100 text-green-800">Earned</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Chemistry Champion</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete 15 chemistry experiments
                </p>
                <Badge variant="outline">In Progress (8/15)</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Perfect Score</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Score 100% on any experiment
                </p>
                <Badge variant="outline">Locked</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Research Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete advanced experiments
                </p>
                <Badge variant="outline">Locked</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
