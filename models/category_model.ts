export interface CategoryModel {
  desc: string;
  descShort: string;
  id: number;
  name: string;
  numComments: number;
  numTopics: number;
  url: string;
  numStories: number;
  numMembers: number;
}

export interface CategoryDataModel {
  current: number;
  numPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  items: CategoryModel[];
}
