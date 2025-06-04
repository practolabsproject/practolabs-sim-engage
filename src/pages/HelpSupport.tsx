
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, 
  Search, 
  Mail, 
  Phone, 
  MessageCircle,
  FileText,
  Video,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const HelpSupport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How do I start an experiment?",
      answer: "To start an experiment, navigate to the experiment page from the sidebar or home page, then click the 'Play' button. Make sure to read the theory section first for better understanding."
    },
    {
      id: 2,
      question: "Can I save my experiment progress?",
      answer: "Yes, your progress is automatically saved. You can resume any experiment from where you left off by returning to the experiment page."
    },
    {
      id: 3,
      question: "How do I download experiment data?",
      answer: "Each experiment has a 'Download Data' button that allows you to export your results in CSV format for further analysis."
    },
    {
      id: 4,
      question: "What browsers are supported?",
      answer: "PractoLabs works best on Chrome, Firefox, Safari, and Edge. Make sure you have the latest version for optimal performance."
    },
    {
      id: 5,
      question: "How can I track my learning progress?",
      answer: "Visit the Progress Tracking page from the sidebar to see your completion status, learning streak, and upcoming experiments."
    },
    {
      id: 6,
      question: "Are there keyboard shortcuts available?",
      answer: "Yes! Press 'Space' to play/pause simulations, 'R' to reset parameters, and 'D' to download data in most experiments."
    }
  ];

  const tutorials = [
    {
      title: "Getting Started with PractoLabs",
      description: "Learn the basics of navigating and using the platform",
      type: "Video",
      duration: "5 mins",
      icon: Video
    },
    {
      title: "Understanding Experiment Parameters",
      description: "How to adjust settings and interpret results",
      type: "Guide",
      duration: "8 mins",
      icon: FileText
    },
    {
      title: "Using the Physics Simulations",
      description: "Complete walkthrough of physics experiments",
      type: "Video",
      duration: "12 mins",
      icon: Video
    },
    {
      title: "Chemistry Lab Safety",
      description: "Important safety guidelines for virtual experiments",
      type: "Guide",
      duration: "6 mins",
      icon: FileText
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-8 w-8 text-lab-blue" />
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-12 w-12 text-lab-blue mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get instant help from our support team
            </p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 text-lab-teal mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send us your questions via email
            </p>
            <Button variant="outline" className="w-full">Send Email</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 text-lab-indigo mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Call us for immediate assistance
            </p>
            <Button variant="outline" className="w-full">Call Now</Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="faq">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg">
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50"
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="p-4 pt-0 text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials & Guides</CardTitle>
              <CardDescription>Step-by-step instructions to help you get the most out of PractoLabs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <tutorial.icon className="h-8 w-8 text-lab-blue mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{tutorial.type}</Badge>
                              <span className="text-xs text-muted-foreground">
                                {tutorial.duration}
                              </span>
                            </div>
                            <Button size="sm">
                              {tutorial.type === 'Video' ? 'Watch' : 'Read'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Email Support</div>
                    <div className="text-sm text-muted-foreground">support@practolabs.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-muted-foreground">+1 (555) 123-LABS</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-muted-foreground">Available 24/7</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="font-medium mb-2">Office Hours</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Monday - Friday: 9:00 AM - 6:00 PM EST</div>
                    <div>Saturday: 10:00 AM - 4:00 PM EST</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input placeholder="Email Address" type="email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your message..." rows={4} />
                  <Button className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Feedback</CardTitle>
              <CardDescription>Help us improve PractoLabs with your suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    How would you rate your overall experience?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button key={rating} variant="outline" size="sm">
                        ⭐ {rating}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    What feature would you like to see improved?
                  </label>
                  <Input placeholder="e.g., Experiment simulations, User interface..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Additional Comments
                  </label>
                  <Textarea 
                    placeholder="Tell us more about your experience..." 
                    rows={4} 
                  />
                </div>
                <Button className="w-full">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupport;
