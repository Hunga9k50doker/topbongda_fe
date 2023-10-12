import { MetadataRoute } from "next";
import {
  getCompetitionsListAPI,
  getTeamsListAPI,
  getMatchesListAPI,
} from "@/apis/soccer_fetch_apis";
import {
  getCategoriesListAPI,
  getTopicsListAPI,
} from "@/apis/forum_fetch_apis";
import { SITE_BASE_URL } from "@/constants";
import { TeamDataModel } from "@/models/team_model";
import { CompetitionDataModel } from "@/models/competition_model";
import { StoryModel, TagDataModel } from "@/models/new_model";
import { getAllTagsAPI, getStoriesShortListAPI } from "@/apis/news_fetch_apis";
import { CategoryModel } from "@/models/category_model";
import { MatchDetailModel } from "@/models/match_model";
import { COMPETITION_TABS, TEAM_TABS, HOME_TABS } from "@/configs/constants";
type changeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const routes = Object.values(HOME_TABS).map((tab) =>
  tab === HOME_TABS.PHO_BIEN ? "/" : `/${tab}`
);
interface S {
  params: any;
  searchParams: { s: string; q: string; page: number };
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updateAt = new Date().toISOString();
  const daily = "daily" as changeFrequency;
  const weekly = "weekly" as changeFrequency;

  //static routes
  const staticRoutes = routes.map((r) => ({
    url: `${SITE_BASE_URL}${r}`,
    lastModified: updateAt,
    changeFrequency: daily,
    priority: 1,
  }));

  //team routes
  const teams: TeamDataModel = await getTeamsListAPI();
  const teamRoutes = teams.items.map((team) => [
    {
      url: `${SITE_BASE_URL}${team.url}`,
      lastModified: updateAt,
      changeFrequency: weekly,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${team.url}${TEAM_TABS.BAI_VIET}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${team.url}${TEAM_TABS.CAU_THU}`,
      lastModified: updateAt,
      changeFrequency: weekly,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${team.url}${TEAM_TABS.FAN_HAM_MO}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${team.url}${TEAM_TABS.LICH_THI_DAU}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${team.url}${TEAM_TABS.TIN_TUC}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
  ]);

  //competitions routes
  const competitions: CompetitionDataModel = await getCompetitionsListAPI();
  const competitionRoutes = competitions.items.map((competition) => [
    {
      url: `${SITE_BASE_URL}${competition.url}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${competition.url}${COMPETITION_TABS.BAI_VIET}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${competition.url}${COMPETITION_TABS.BANG_XEP_HANG}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${competition.url}${COMPETITION_TABS.TIN_TUC}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${competition.url}${COMPETITION_TABS.TOP_DANH_HIEU}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
    {
      url: `${SITE_BASE_URL}${competition.url}${COMPETITION_TABS.LICH_THI_DAU}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    },
  ]);

  //topic routes
  const topics: TeamDataModel = await getTopicsListAPI();
  const topicRoutes = topics.items.map((topic) => ({
    url: `${SITE_BASE_URL}${topic.url}`,
    lastModified: updateAt,
    changeFrequency: daily,
    priority: 0.7,
  }));

  //story routes
  const stories: StoryModel = await getStoriesShortListAPI();
  const storyRoutes = stories.items.map((story) => ({
    url: `${SITE_BASE_URL}${story.url}`,
    lastModified: updateAt,
    changeFrequency: daily,
    priority: 0.7,
  }));

  //category routes
  const categories: CategoryModel[] = await getCategoriesListAPI();
  const categoryRoutes = categories.map((category) => ({
    url: `${SITE_BASE_URL}${category.url}`,
    lastModified: updateAt,
    changeFrequency: daily,
    priority: 0.7,
  }));

  //match routes
  const matchs: any = await getMatchesListAPI();
  const matchRoutes = matchs.data.map((items: any) =>
    items[2].map((item: MatchDetailModel) => ({
      url: `${SITE_BASE_URL}${item.url}`,
      lastModified: updateAt,
      changeFrequency: daily,
      priority: 0.7,
    }))
  );

  //tags routes
  const tags: TagDataModel = await getAllTagsAPI();
  const tagRoutes = tags.items.map((tag) => ({
    url: `${SITE_BASE_URL}${tag.url}`,
    lastModified: updateAt,
    changeFrequency: daily,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...teamRoutes.flat(Infinity),
    ...competitionRoutes.flat(Infinity),
    ...topicRoutes,
    ...storyRoutes,
    ...categoryRoutes,
    ...matchRoutes.flat(Infinity),
    ...tagRoutes,
  ];
}
