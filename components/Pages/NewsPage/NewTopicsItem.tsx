import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CustomLink from "@/components/common/CustomLink";
import { numberFormatter } from "@/utils";
import { Divider } from "@mui/material";

export default function NewTopicsItem({ item, ...props }: { item: any }) {
  return (
    <div className="related-post-item" id={`id_topic_${item.code}`}>
      <CustomLink
        prefetch={false}
        href={item.url}
        className="block px-4 py-2 hover:bg-gray-200/20 active:bg-gray-200/40 text-sm"
      >
        <div>
          <small>@{item.username}</small>
        </div>
        <h3 className="font-bold">{item.getTitle}</h3>
        <div className="flex items-center space-x-1 text-gray-400 text-xs">
          <span>{item.publishedAtVerbose}</span>
          {item.numComments > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                <QuestionAnswerOutlinedIcon sx={{ width: 14, height: 14 }} />
                <span>{numberFormatter(item.numComments)}</span>
              </span>
            </>
          )}
          {item.numLikes > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                <ThumbUpOutlinedIcon sx={{ width: 14, height: 14 }} />
                <span>{numberFormatter(item.numLikes)}</span>
              </span>
            </>
          )}
        </div>
      </CustomLink>
      <Divider />
    </div>
  );
}
