"use client";
import React, { useCallback } from "react";
import { getCalendarMatchesAPI, getMatchesListAPI } from "@/apis/soccer_apis";
import { TopicHeadlineModel } from "@/models/topic_model";
import { MatchDataModel } from "@/models/match_model";
import { useRouter, usePathname } from "next/navigation";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import loadingSlice from "@/reducers/loadingSlice";
import { useDebounce, useLocalStorage } from "react-use";
import { SOCCER_API_GET_CALENDAR_MATCHES } from "@/configs/endpoints/soccer_endpoints";
import useSWR, { useSWRConfig } from "swr";
interface MatchScheduleProps {
  matchesData: MatchDataModel<any>;
  topicHeadlines: TopicHeadlineModel[];
  searchParameters: any;
  children: React.ReactNode;
}

type TypeFilter =
  | "today"
  | "majorLeagues"
  | "team"
  | "competition"
  | "calendar"
  | "status";
interface QueryProps {
  "hom-nay"?: string;
  gl?: string;
  db?: string;
  "giai-dau"?: string;
  dt?: string;
  status?: string;
}

interface MatchScheduleProviderProps {
  dataBanner: any;
  query: QueryProps;
  open: boolean;
  isMajorLeagues: boolean;
  isToday: boolean;
  loadingMore: boolean;
  hasNext: boolean;
  items: MatchDataModel<any>["data"];
  topicHeadlines: TopicHeadlineModel[];
  searchParameters: QueryProps;
  selectedTeam: any;
  selectedCompetition: any;
  eventsCalendar: any[];
  isLoadingCalender: boolean;
  status: string;
  setMonth: (valueType: any) => void;
  toggleDrawer: (valueType?: boolean) => void;
  renderFilter: (valueType: string) => string;
  handleLoadMore: () => void;
  handleClear: (valueType: string) => void;
  handleUpdateFilter: (type: TypeFilter, item: any) => void;
  handleFilter: (value: any) => void;
}

export const MatchScheduleContext =
  React.createContext<MatchScheduleProviderProps>({
    dataBanner: [],
    query: {},
    open: false,
    isMajorLeagues: false,
    isToday: false,
    loadingMore: false,
    hasNext: false,
    items: [],
    topicHeadlines: [],
    searchParameters: {},
    selectedTeam: null,
    selectedCompetition: null,
    eventsCalendar: [],
    isLoadingCalender: false,
    status: "",
    setMonth: () => {},
    handleLoadMore: () => {},
    toggleDrawer: () => {},
    renderFilter: () => "",
    handleClear: () => {},
    handleUpdateFilter: () => {},
    handleFilter: () => {},
  });

function MatchScheduleProvider({
  children,
  matchesData,
  topicHeadlines,
  searchParameters,
}: MatchScheduleProps) {
  const { mutate } = useSWRConfig();
  const dispath = useDispatch();
  const router = useRouter();
  const [stoVal, setStoVal] = useLocalStorage<any>("filter", "");
  const [query, setQuery] = React.useState<QueryProps>(searchParameters);
  const pathName = usePathname();
  const dataBanner = matchesData.data?.slice(0, 4) || [];
  const [open, setOpen] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [items, setItems] = React.useState<MatchDataModel<any>["data"]>(
    matchesData.data
  );
  const [month, setMonth] = React.useState<any>(null);
  const [eventsCalendar, setEventsCalendar] = React.useState([]);
  const [isToday, setIsToday] = React.useState(query["hom-nay"] === "yes");
  const [status, setStatus] = React.useState(query.status || "NS");
  const [isMajorLeagues, setIsMajorLeagues] = React.useState(
    query.gl === "yes"
  );
  const [hasNext, setHasNext] = React.useState(matchesData.hasNext);
  const [currentPage, setCurrentPage] = React.useState(matchesData.current);
  const [selectedTeam, setSelectedTeam] = React.useState<any>(null);
  const [selectedCompetition, setSelectedCompetition] =
    React.useState<any>(null);
  const [isLoadingCalender, setIsLoadingCalender] = React.useState(false);

  const formatData = React.useCallback((data: any = []) => {
    const result = data.map((item: any) => ({
      ...item,
      title: `${item.title} T`,
    }));
    return result;
  }, []);

  const handleLoadMore = useCallback(() => {
    setLoadingMore(true);
    getMatchesListAPI({ ...query, page: currentPage + 1 })
      .then((r) => {
        const d = r.data;
        setItems([...items, ...d.data]);
        setCurrentPage(d.current);
        setHasNext(d.hasNext);
      })
      .catch((e) => {})
      .finally(() => {
        setLoadingMore(false);
      });
  }, [currentPage]);

  const toggleDrawer = (isOpen?: boolean) => {
    if (isOpen === false) return setOpen(false);
    setOpen(!open);
  };

  // start event filter
  const handleUpdateFilter = React.useCallback(
    (type: TypeFilter, item: any) => {
      switch (type) {
        case "competition":
          setSelectedCompetition(item);
          if (item) {
            query["giai-dau"] = item.slug;
          } else {
            delete query["giai-dau"];
          }
          break;
        case "team":
          setSelectedTeam(item);
          if (item) {
            query.db = item.code;
          } else {
            delete query.db;
          }
          break;
        case "today":
          setIsToday(item);
          if (item) {
            handleClearCalendar();
            query["hom-nay"] = "yes";
          } else {
            delete query["hom-nay"];
          }
          break;
        case "majorLeagues":
          setIsMajorLeagues(item);
          if (item) {
            query.gl = "yes";
          } else {
            delete query.gl;
          }
          break;
        case "status":
          setStatus(item);
          if (item) {
            query.status = item;
          } else {
            delete query.status;
          }
          break;
        default:
          return;
      }
    },
    [query]
  );

  const handleClearToday = useCallback(() => {
    delete query["hom-nay"];
    const newQueryStr = queryString.stringify(query);
    router.push(`${pathName}?${newQueryStr}`);
  }, []);

  const handleClearMajorLeagues = useCallback(() => {
    delete query.gl;
    const newQueryStr = queryString.stringify(query);
    router.push(`${pathName}?${newQueryStr}`);
  }, []);

  const handleClearTeamFilter = React.useCallback(() => {
    setSelectedTeam(null);
    delete query.db;
    const newQueryStr = queryString.stringify(query);
    router.push(`${pathName}?${newQueryStr}`);
  }, []);

  const handleClearCompetitionFilter = React.useCallback(() => {
    setSelectedCompetition(null);
    delete query["giai-dau"];
    const newQueryStr = queryString.stringify(query);
    router.push(`${pathName}?${newQueryStr}`);
  }, []);

  const handleClearCalendar = React.useCallback(() => {
    delete query.dt;
    const newQueryStr = queryString.stringify(query);
    router.push(`${pathName}?${newQueryStr}`);
  }, []);

  const handleClearStatus = React.useCallback(() => {
    delete query.status;
    const newQueryStr = queryString.stringify(query);
    router.push(`${pathName}?${newQueryStr}`);
  }, []);

  const handleClear = (item: any) => {
    dispath(loadingSlice.actions.updateLoading(true));
    switch (item) {
      case "gl":
        handleClearMajorLeagues();
        break;
      case "hom-nay":
        handleClearToday();
        break;
      case "db":
        handleClearTeamFilter();
        break;
      case "giai-dau":
        handleClearCompetitionFilter();
        break;
      case "dt":
        handleClearCalendar();
      case "status":
        handleClearStatus();
        break;
      case "all":
        router.push(pathName);
        break;
      default:
        return;
    }
  };

  const renderFilter = (item: string) => {
    switch (item) {
      case "gl":
        return "Giải lớn";
      case "hom-nay":
        return "Hôm nay";
      case "db":
        return "Đội bóng";
      case "giai-dau":
        return "Giải đấu";
      case "dt":
        return "Theo ngày";
      case "status":
        return "Trạng thái";
      default:
        return item;
    }
  };

  const handleFilter = () => {
    setStoVal({ team: selectedTeam, competition: selectedCompetition });
    dispath(loadingSlice.actions.updateLoading(true));
    const newQueryStr = queryString.stringify(query);
    router.push(`${pathName}?${newQueryStr}`);
  };
  // end event filter

  useSWR(
    SOCCER_API_GET_CALENDAR_MATCHES,
    () => {
      setIsLoadingCalender(true);
      const p = {
        start: month.startStr,
        end: month.endStr,
      };
      getCalendarMatchesAPI(p)
        .then((r) => {
          const newData = formatData(r.data);
          setEventsCalendar(newData);
        })
        .catch((e) => {
          setIsLoadingCalender(false);
        })
        .finally(() => {
          setIsLoadingCalender(false);
        });
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  React.useEffect(() => {
    dispath(loadingSlice.actions.updateLoading(false));
    setQuery(queryString.parse(location.search));
  }, [searchParameters]);

  React.useEffect(() => {
    setItems(matchesData.data);
  }, [matchesData]);

  React.useEffect(() => {
    if (query.db === stoVal?.team?.code) setSelectedTeam(stoVal?.team);
    if (query["giai-dau"] === stoVal?.competition?.slug)
      setSelectedCompetition(stoVal?.competition);
  }, []);

  React.useEffect(() => {
    if (month) mutate(SOCCER_API_GET_CALENDAR_MATCHES);
  }, [month]);

  useDebounce(() => {
    if (query?.dt) {
      const x = document.querySelector(`td[data-date="${query.dt}"]`);
      if (x) {
        x.classList.add("bg-green-400");
      }
    }
  }, 1000);

  return (
    <MatchScheduleContext.Provider
      value={{
        dataBanner,
        query,
        open,
        isMajorLeagues,
        isToday,
        status,
        loadingMore,
        hasNext,
        items,
        topicHeadlines,
        searchParameters,
        selectedTeam,
        selectedCompetition,
        eventsCalendar,
        isLoadingCalender,
        setMonth,
        handleLoadMore,
        toggleDrawer,
        renderFilter,
        handleClear,
        handleUpdateFilter,
        handleFilter,
      }}
    >
      {children}
    </MatchScheduleContext.Provider>
  );
}

export default React.memo(MatchScheduleProvider);
