
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface ExperimentProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  time: string;
  popularity?: number;
}

const DifficultyBadge = ({ difficulty }: { difficulty: ExperimentProps["difficulty"] }) => {
  const colors = {
    beginner: "bg-green-100 text-green-800 hover:bg-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    advanced: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  return (
    <Badge variant="outline" className={colors[difficulty]}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
};

const ExperimentCard = ({
  id,
  title,
  description,
  image,
  category,
  difficulty,
  time,
}: ExperimentProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[16/9] relative bg-muted">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <DifficultyBadge difficulty={difficulty} />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{time}</span>
        <Button asChild size="sm" variant="ghost" className="gap-1">
          <Link to={`/experiment/${id}`}>
            Start Experiment
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExperimentCard;
