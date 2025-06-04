
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  BookOpen,
  TrendingUp,
  Calendar,
  Play
} from "lucide-react";

const ProgressTracking = () => {
  const courseProgress = [
    {
      subject: "Physics",
      completed: 8,
      total: 12,
      percentage: 67,
      color: "bg-blue-500"
    },
    {
      subject: "Chemistry",
      completed: 5,
      total: 10,
      percentage: 50,
      color: "bg-green-500"
    },
    {
      subject: "Electrical Engineering",
      completed: 6,
      total: 8,
      percentage: 75,
      color: "bg-purple-500"
    },
    {
      subject: "Mathematics",
      completed: 3,
      total: 6,
      percentage: 50,
      color: "bg-orange-500"
    }
  ];

  const weeklyGoals = [
    {
      goal: "Complete 3 Physics experiments",
      progress: 2,
      total: 3,
      deadline: "This Week"
    },
    {
      goal: "Study Circuit Analysis theory",
      progress: 1,
      total: 1,
      deadline: "Today"
    },
    {
      goal: "Review Titration procedures",
      progress: 0,
      total: 1,
      deadline: "Tomorrow"
    }
  ];

  const upcomingExperiments = [
    {
      name: "RC Circuits",
      subject: "Electrical Engineering",
      difficulty: "Intermediate",
      estimatedTime: "30-40 mins",
      dueDate: "2024-06-05"
    },
    {
      name: "Acid-Base Reactions",
      subject: "Chemistry",
      difficulty: "Beginner",
      estimatedTime: "25-35 mins",
      dueDate: "2024-06-06"
    },
    {
      name: "Chemical Kinetics",
      subject: "Chemistry",
      difficulty: "Advanced",
      estimatedTime: "40-50 mins",
      dueDate: "2024-06-07"
    }
  ];

  const learningStreak = 12; // days
  const totalHours = 45.5;
  const averageScore = 89;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-8 w-8 text-lab-blue" />
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{learningStreak} days</div>
            <p className="text-xs text-muted-foreground">Keep it going!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">All experiments</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Your completion status across all subjects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {courseProgress.map((course, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${course.color}`}></div>
                  <span className="font-medium">{course.subject}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {course.completed}/{course.total} experiments
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={course.percentage} className="flex-1" />
                <span className="text-sm font-medium w-12">{course.percentage}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Goals and Upcoming Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Weekly Goals
            </CardTitle>
            <CardDescription>Track your learning objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm">{goal.goal}</span>
                  <Badge variant="outline" className="text-xs">
                    {goal.deadline}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={(goal.progress / goal.total) * 100} className="flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {goal.progress}/{goal.total}
                  </span>
                  {goal.progress === goal.total && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Upcoming Experiments
            </CardTitle>
            <CardDescription>Your next learning activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingExperiments.map((experiment, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{experiment.name}</h4>
                    <p className="text-sm text-muted-foreground">{experiment.subject}</p>
                  </div>
                  <Badge 
                    variant={experiment.difficulty === 'Beginner' ? 'secondary' : 
                            experiment.difficulty === 'Intermediate' ? 'outline' : 'destructive'}
                  >
                    {experiment.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {experiment.estimatedTime}
                  </span>
                  <span>Due: {experiment.dueDate}</span>
                </div>
                <Button size="sm" className="w-full">
                  <Play className="h-3 w-3 mr-1" />
                  Start Experiment
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Learning Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Milestones</CardTitle>
          <CardDescription>Key achievements in your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div className="flex-1">
                <h4 className="font-medium">First Experiment Completed</h4>
                <p className="text-sm text-muted-foreground">Successfully completed Simple Pendulum experiment</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium">10 Experiments Milestone</h4>
                <p className="text-sm text-muted-foreground">Reached 10 completed experiments across all subjects</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
            </div>
            
            <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-gray-400" />
              <div className="flex-1">
                <h4 className="font-medium">Perfect Score Achievement</h4>
                <p className="text-sm text-muted-foreground">Score 100% on any experiment</p>
              </div>
              <Badge variant="outline">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;
