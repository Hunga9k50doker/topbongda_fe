import React from "react";
import NoData from "@/components/common/NoData";
import { USER_API_LIST_FOLOW_TEAM } from "@/configs/endpoints/user_endpoints";
import useSWR from "swr";
import { followTeamAPI, getListFollowTeamAPI } from "@/apis/user_apis";
import CardTeam from "@/components/Cards/CardTeam";
import { CardItemLoader } from "@/loaders";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { updateFollowTeams } from "@/reducers/userSlice";
import { TeamModel } from "@/models/team_model";
import { toast } from "react-toastify";

const MyTeamsFollow = () => {
  const { followTeams } = useSelector(
    (state: RootState) => state.userStore.data
  );
  const { isLoading } = useSWR(
    USER_API_LIST_FOLOW_TEAM,
    () => {
      if (followTeams.length > 0) return followTeams;
      getListFollowTeamAPI({
        hl: "yes",
      })
        .then((r) => {
          store.dispatch(updateFollowTeams(r.data.data));
          return r.data.data;
        })
        .catch((error) => {});
    },
    {
      revalidateOnFocus: false,
    }
  );

  const onCancelFollowTeam = (item: TeamModel) => {
    followTeamAPI({
      team_code: item.code,
      is_remove: "yes",
    })
      .then((r) => {
        if (r.data.ok) {
          const newResult = followTeams.filter(
            (team: any) => team.teamCode !== item.code
          );
          store.dispatch(updateFollowTeams(newResult));
        }
        return toast.success(r.data.msg);
      })
      .catch((e) => {});
  };

  return (
    <div>
      {isLoading && <CardItemLoader />}
      {!isLoading && followTeams.length === 0 && (
        <NoData title="Bạn chưa theo dõi đội bóng nào" />
      )}
      {followTeams.length > 0 &&
        followTeams.map((team: any, key) => (
          <CardTeam
            style={styles}
            data={team.team}
            key={key}
            viewFollow={true}
            onCancelFollowTeam={onCancelFollowTeam}
          />
        ))}
    </div>
  );
};

export default React.memo(MyTeamsFollow);

const styles = {
  "& img": {
    width: "24px",
    height: "24px",
  },
};
