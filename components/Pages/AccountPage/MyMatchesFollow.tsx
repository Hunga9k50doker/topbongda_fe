import React from "react";
import NoData from "@/components/common/NoData";
import useSWR from "swr";
import { USER_API_LIST_FOLOW_MATCH } from "@/configs/endpoints/user_endpoints";
import { getListFollowMatchAPI } from "@/apis/user_apis";
import MatchItem from "@/components/Soccer/MatchItem";
import { CardItemLoader } from "@/loaders";
import { followMatchAPI } from "@/apis/user_apis";
import { updateFollowMatchs } from "@/reducers/userSlice";
import { toast } from "react-toastify";
import { RootState, store } from "@/store";
import { MatchDetailModel } from "@/models/match_model";
import { useSelector } from "react-redux";
import { updateLoading } from "@/reducers/loadingSlice";

const MyMatchesFollow = () => {
  const { followMatches } = useSelector(
    (state: RootState) => state.userStore.data
  );

  const { isLoading } = useSWR(
    USER_API_LIST_FOLOW_MATCH,
    () => {
      if (followMatches.length > 0) return followMatches;
      store.dispatch(updateLoading(true));
      getListFollowMatchAPI({
        hl: "yes",
      })
        .then((r) => {
          store.dispatch(updateFollowMatchs(r.data.data));
          return r.data.data;
        })
        .catch((error) => {
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        })
        .finally(() => {
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        });
    },
    {
      revalidateOnFocus: false,
    }
  );

  const onCancelFollowMatch = (item: MatchDetailModel) => {
    followMatchAPI({
      match_code: item.code,
      is_remove: "yes",
    })
      .then((r) => {
        if (r.data.ok) {
          const newResult = followMatches.filter(
            (match: any) => match.matchCode !== item.code
          );
          store.dispatch(updateFollowMatchs(newResult));
        }
        return toast.success(r.data.msg);
      })
      .catch((e) => {});
  };

  return (
    <div>
      {isLoading && <CardItemLoader />}
      {!isLoading && followMatches.length === 0 && (
        <NoData title="Bạn chưa theo dõi trận đấu nào" />
      )}
      {followMatches.length > 0 &&
        followMatches.map((item: any, key) => (
          <MatchItem
            style={styles}
            onCancelFollowMatch={onCancelFollowMatch}
            showLeagueName={true}
            viewFollow={true}
            viewStatus={true}
            matchItem={item.match}
            key={key}
          />
        ))}
    </div>
  );
};

export default React.memo(MyMatchesFollow);

const styles = {
  "& img": {
    width: "24px",
    height: "24px",
  },
  "& h4": {
    fontSize: "16px",
  },
  "& .ant-tag": {
    padding: "0 2px",
    width: "fit-content",
    fontSize: 10,
    fontWeight: 700,
    lineHeight: "16px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiTypography-body1": {
    fontSize: "12px",
  },
};
