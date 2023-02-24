import { Resource, Metadata } from './resources';

export interface Topic {
  id: number;
  name: string;
  level: number;
  shortDescription: string;
  description: string;
  type: string; //'theory' | 'handson';
  tags: string[];
  metadata: { [key: string]: Metadata };
  resources: Resource[];
}
