
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Target
} from "lucide-react";

const StudentDashboard = () => {
  // Mock student data - in a real app this would come from a database
  const studentData = {
    personalInfo: {
      name: "Alex Johnson",
      email: "alex.johnson@student.edu",
      phone: "+1 (555) 123-4567",
      studentId: "ST2024001",
      profileImage: "/placeholder.svg"
    },
    education: {
      currentLevel: "Undergraduate",
      major: "Physics",
      minor: "Mathematics",
      university: "Stanford University",
      location: "California, USA",
      gpa: 3.8,
      expectedGraduation: "May 2025",
      enrollmentDate: "September 2021"
    },
    academicProgress: {
      creditsCompleted: 108,
      creditsRequired: 120,
      coursesCompleted: 24,
      currentSemester: "Fall 2024"
    },
    achievements: [
      { name: "Dean's List", date: "Spring 2024", type: "academic" },
      { name: "Physics Excellence Award", date: "Fall 2023", type: "award" },
      { name: "Research Assistant", date: "Summer 2023", type: "research" }
    ],
    skills: [
      { name: "Physics", level: 85 },
      { name: "Mathematics", level: 90 },
      { name: "Laboratory Techniques", level: 75 },
      { name: "Data Analysis", level: 80 },
      { name: "Research Methods", level: 70 }
    ]
  };

  const progressPercentage = (studentData.academicProgress.creditsCompleted / studentData.academicProgress.creditsRequired) * 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="h-8 w-8 text-lab-blue" />
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <strong>Name:</strong> {studentData.personalInfo.name}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <strong>Email:</strong> {studentData.personalInfo.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <strong>Phone:</strong> {studentData.personalInfo.phone}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <strong>Student ID:</strong> {studentData.personalInfo.studentId}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <strong>Location:</strong> {studentData.education.location}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Background */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Educational Background
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{studentData.education.university}</h3>
                <p className="text-muted-foreground">{studentData.education.location}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <strong>Level:</strong> 
                  <Badge variant="secondary">{studentData.education.currentLevel}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <strong>Major:</strong> {studentData.education.major}
                </div>
                <div className="flex items-center gap-2">
                  <strong>Minor:</strong> {studentData.education.minor}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <strong>Enrollment Date:</strong> {studentData.education.enrollmentDate}
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <strong>Expected Graduation:</strong> {studentData.education.expectedGraduation}
              </div>
              <div className="flex items-center gap-2">
                <strong>Current GPA:</strong> 
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {studentData.education.gpa}/4.0
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Academic Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Degree Progress</span>
                <span className="text-sm text-muted-foreground">
                  {studentData.academicProgress.creditsCompleted}/{studentData.academicProgress.creditsRequired} Credits
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-lab-blue">
                  {studentData.academicProgress.coursesCompleted}
                </div>
                <div className="text-sm text-muted-foreground">Courses Completed</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-lab-teal">
                  {studentData.academicProgress.creditsCompleted}
                </div>
                <div className="text-sm text-muted-foreground">Credits Earned</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {studentData.education.gpa}
                </div>
                <div className="text-sm text-muted-foreground">Current GPA</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Awards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements & Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studentData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-muted-foreground">{achievement.date}</div>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {achievement.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills & Competencies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Skills & Competencies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentData.skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
