import { Hero } from "@/components/home/hero";
import { ProjectsSection } from "@/components/home/projects-section";

import { latestProjects, trendingProjects } from "@/shared/mocks/projects";

export default async function HomePage() {
  return (
    <div className="space-y-12">
      <Hero />

      <ProjectsSection
        title="Trending projects"
        description="See what the community is creating"
        projects={trendingProjects}
      />

      <ProjectsSection
        title="Latest projects"
        description="Fresh inspiration from the community"
        projects={latestProjects}
        showViewAll
      />
    </div>
  );
}
