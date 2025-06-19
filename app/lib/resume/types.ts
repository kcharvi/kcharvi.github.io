export interface Position {
  title: string;
  description: string[];
}

export interface Experience {
  company: string;
  period: string;
  positions: Position[];
  certificates?: {
    name: string;
    url: string;
  }[];
  images?: string[];
}

export interface ResumeData {
  experiences: Experience[];
  avatarUrl: string;
}
