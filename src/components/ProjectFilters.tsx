import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  technologies: string[];
  type: 'BI' | 'ML' | 'Analytics' | 'Engineering';
  status: 'Concluído' | 'Em desenvolvimento' | 'Planejado';
  githubLink?: string;
  mediumLink?: string;
  year: number;
}

interface ProjectFiltersProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ projects, onFilterChange }) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  // Extract unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  // Apply technology filter
  const filteredProjects = useMemo(() => {
    if (selectedTechnologies.length === 0) {
      return projects;
    }
    
    return projects.filter(project => 
      selectedTechnologies.some(tech => project.technologies.includes(tech))
    );
  }, [projects, selectedTechnologies]);

  // Update parent component when filters change
  React.useEffect(() => {
    onFilterChange(filteredProjects);
  }, [filteredProjects, onFilterChange]);

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearAllFilters = () => {
    setSelectedTechnologies([]);
  };

  const hasActiveFilters = selectedTechnologies.length > 0;

  return (
    <div className="space-y-6 mb-8">
      {/* Technology Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-data-blue headline">
            <Filter className="inline h-5 w-5 mr-2" />
            Filtrar por Tecnologias
          </h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-destructive hover:text-destructive"
            >
              Limpar filtros
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          {allTechnologies.map(tech => (
            <Badge
              key={tech}
              variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 text-sm px-4 py-2 ${
                selectedTechnologies.includes(tech) 
                  ? 'bg-data-blue text-white border-data-blue hover:bg-data-cyan' 
                  : 'hover:border-data-blue hover:text-data-blue border-muted-foreground/30'
              }`}
              onClick={() => toggleTechnology(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center p-4 bg-muted/30 rounded-lg">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {selectedTechnologies.map(tech => (
            <Badge key={tech} variant="secondary" className="gap-1 bg-data-blue/10 text-data-blue border-data-blue/30">
              {tech}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => toggleTechnology(tech)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground text-center">
        {filteredProjects.length} de {projects.length} projetos encontrados
      </div>
    </div>
  );
};

export default ProjectFilters; 