import React from "react";
import { getFeaturedMatchesAPI } from "@/apis/soccer_apis";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { NewLoader } from "@/loaders";
import { MatchDetailModel } from "@/models/match_model";
import MatchItem from "@/components/Soccer/MatchItem";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

interface FeaturedMatchItemsProps {
  inView: any;
}

function FeaturedMatchItems({ inView, ...props }: FeaturedMatchItemsProps) {
  const [items, setItems] = React.useState<MatchDetailModel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isLoaded = React.useRef(false);

  React.useEffect(() => {
    if (inView && !isLoaded.current) {
      getFeaturedMatchesAPI()
        .then((r) => {
          setItems(r.data);
        })
        .finally(() => {
          setLoading(false);
          isLoaded.current = true;
        });
    }
  }, [inView]);

  if (items.length === 0) {
    return (
      <div className="my-4 text-center text-xs">
        Không có trận đấu nổi bật nào.
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <NewLoader />
      ) : (
        items?.map((item) => <FeaturedMatchItem key={item.code} item={item} />)
      )}
    </>
  );
}

export default FeaturedMatchItems;

function FeaturedMatchItem({ item, ...props }: { item: any }) {
  return (
    <Card>
      <MatchItem matchItem={item} viewStatus={true} />
      <Divider className="border-gray-200/10" />
      <div className="px-4 py-2">
        <EmojiEventsOutlinedIcon fontSize="small" className="text-yellow-500" />
        <span className="uppercase text-xs">{item.competitionName}</span>
      </div>
    </Card>
  );
}
