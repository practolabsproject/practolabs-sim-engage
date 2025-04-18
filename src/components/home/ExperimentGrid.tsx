
import React from "react";
import ExperimentCard, { ExperimentProps } from "./ExperimentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ExperimentGridProps {
  experiments: ExperimentProps[];
  filter?: string;
}

const ExperimentGrid = ({ experiments, filter }: ExperimentGridProps) => {
  const [category, setCategory] = React.useState<string>("all");
  const [difficulty, setDifficulty] = React.useState<string>("all");
  const [sort, setSort] = React.useState<string>("popular");

  // Apply filters and sorting
  const filteredExperiments = experiments
    .filter((exp) => category === "all" || exp.category === category)
    .filter((exp) => difficulty === "all" || exp.difficulty === difficulty)
    .sort((a, b) => {
      if (sort === "popular") {
        return (b.popularity || 0) - (a.popularity || 0);
      } else if (sort === "a-z") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Extract unique categories
  const categories = ["all", ...new Set(experiments.map((exp) => exp.category))];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Available Experiments</h1>
          <p className="text-muted-foreground">
            {filteredExperiments.length} experiments available
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger id="category" className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select 
              value={difficulty} 
              onValueChange={setDifficulty}
            >
              <SelectTrigger id="difficulty" className="w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="sort">Sort By</Label>
            <Select 
              value={sort} 
              onValueChange={setSort}
            >
              <SelectTrigger id="sort" className="w-[150px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="a-z">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredExperiments.map((experiment) => (
          <ExperimentCard key={experiment.id} {...experiment} />
        ))}
      </div>
    </div>
  );
};

export default ExperimentGrid;
