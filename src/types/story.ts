export interface StoryRequest {
  childName: string;
  childAge: number;
  daytimeBehavior: string;
  worldTheme?: string;
}

export interface GeneratedStory {
  id: string;
  createdAt: string;
  childName: string;
  childAge: number;
  daytimeBehavior: string;
  worldTheme: string;
  title: string;
  paragraphs: [string, string, string, string];
  closingLine: string;
  magicalObject: string;
  metaphorNote: string;
  worldTitle: string;
  nameCount: number;
  formattedText: string;
}

export interface StoryPreset {
  id: string;
  label: string;
  childName: string;
  childAge: number;
  daytimeBehavior: string;
  worldTheme: string;
}
