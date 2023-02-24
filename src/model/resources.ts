export type Metadata = string | number | boolean | undefined;

export interface Resource {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  url: string;
  complexity: string; //'easy' | 'medium' | 'hard' | 'god';
  tags: string[];
  metadata: { [key: string]: Metadata };
}
