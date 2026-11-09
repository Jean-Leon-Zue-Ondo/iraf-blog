export interface TrainingProgram {
  id: string;
  title: string;
  level: 'Doctorat' | 'Master' | 'Stage' | 'Formation continue';
  duration: string;
  description: string;
  contactInfo?: string;
}
