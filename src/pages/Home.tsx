import React from "react";
import ExperimentGrid from "../components/home/ExperimentGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlaskConical, BookOpen, Star, History } from "lucide-react";

const MOCK_EXPERIMENTS = [
  {
    id: "simple-pendulum",
    title: "Simple Pendulum",
    description: "Explore the oscillatory motion of a simple pendulum and discover how its period relates to its length.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    category: "Physics",
    difficulty: "beginner" as const,
    time: "15-20 mins",
    popularity: 95
  },
  {
    id: "energy-gap",
    title: "Energy Gap of P-N Junction Diode",
    description: "Measure the energy gap of a P-N junction diode and understand semiconductor principles.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    category: "Physics",
    difficulty: "advanced" as const,
    time: "30-40 mins",
    popularity: 75
  },
  {
    id: "free-fall",
    title: "Free Fall Motion",
    description: "Study the motion of objects falling under the influence of gravity.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    category: "Physics",
    difficulty: "beginner" as const,
    time: "15-20 mins",
    popularity: 90
  },
  {
    id: "projectile",
    title: "Projectile Motion",
    description: "Examine the path of a projectile and explore factors that affect its trajectory.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    category: "Physics",
    difficulty: "intermediate" as const,
    time: "25-30 mins",
    popularity: 85
  },
  {
    id: "diode",
    title: "Diode Characteristics",
    description: "Study the voltage-current characteristics of semiconductor diodes.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80",
    category: "Electrical Engineering",
    difficulty: "intermediate" as const,
    time: "25-35 mins",
    popularity: 80
  },
  {
    id: "circuit",
    title: "Circuit Analysis",
    description: "Verify Ohm's Law and Kirchhoff's Laws through interactive circuit experiments.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    category: "Electrical Engineering",
    difficulty: "beginner" as const,
    time: "20-25 mins",
    popularity: 90
  },
  {
    id: "titration",
    title: "Titration",
    description: "Perform acid-base titrations and determine the concentration of unknown solutions.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80",
    category: "Chemistry",
    difficulty: "intermediate" as const,
    time: "30-40 mins",
    popularity: 75
  }
];

const Home = () => {
  const featuredExperiments = MOCK_EXPERIMENTS.slice(0, 4);
  
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-lab-blue to-lab-teal py-16 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to PractoLabs
            </h1>
            <p className="text-lg mb-8">
              Experience interactive virtual labs designed for STEM education.
              Explore physics, chemistry, electrical engineering, and advanced concepts
              through immersive simulations.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#experiments" 
                className="bg-white text-lab-blue px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                Explore Experiments
              </a>
              <a 
                href="#about" 
                className="bg-transparent border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-opacity-20 bg-pattern"></div>
      </section>

      <section id="experiments">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Explore Experiments</h2>
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Featured</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span>Recent</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Resources</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <ExperimentGrid experiments={MOCK_EXPERIMENTS} />
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            <ExperimentGrid experiments={featuredExperiments} />
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Sign in to see your recent experiments</p>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Physics Fundamentals</h3>
                  <p className="text-muted-foreground">
                    Core concepts and theories in physics to support your experiments.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Electrical Engineering Basics</h3>
                  <p className="text-muted-foreground">
                    Introduction to circuits, components, and electrical principles.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Chemistry Reference</h3>
                  <p className="text-muted-foreground">
                    Chemical reactions, equations, and laboratory techniques.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section id="about" className="bg-muted py-12 -mx-6 px-6 rounded-lg">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">About PractoLabs</h2>
            <p className="text-muted-foreground mb-8">
              PractoLabs is a next-generation virtual lab platform designed to revolutionize STEM education.
              Our interactive simulations provide students with hands-on experience in physics, chemistry,
              electrical engineering, and more - all accessible from any device with an internet connection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-lab-blue/10 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <FlaskConical className="h-8 w-8 text-lab-blue" />
                </div>
                <h3 className="font-semibold mb-2">Interactive Experiments</h3>
                <p className="text-sm text-muted-foreground">
                  Engage with fully interactive 3D simulations of real laboratory experiments.
                </p>
              </div>
              <div>
                <div className="bg-lab-teal/10 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-lab-teal" />
                </div>
                <h3 className="font-semibold mb-2">AI-Enhanced Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Receive personalized guidance and feedback through our AI-powered system.
                </p>
              </div>
              <div>
                <div className="bg-lab-indigo/10 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-lab-indigo" />
                </div>
                <h3 className="font-semibold mb-2">Comprehensive Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Access educational materials, tutorials, and reference guides for each experiment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
