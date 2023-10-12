import React from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FaTiktok } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const SocialLinks = ({
  data,
  isHiddenNoSocialLink = false,
  ...props
}: {
  data: any;
  isHiddenNoSocialLink?: boolean;
}) => {
  const resolveTiktok = React.useCallback((tiktokAccountStr: string) => {
    if (!tiktokAccountStr) return "";
    if (tiktokAccountStr.includes("https://")) {
      return tiktokAccountStr;
    }
    if (tiktokAccountStr.startsWith("@")) {
      return `https://tiktok.com/${tiktokAccountStr}`;
    }
    return `https://tiktok.com/@${tiktokAccountStr}`;
  }, []);

  const facebookLink = React.useMemo(
    () =>
      data.facebook
        ? data.facebook.includes("https")
          ? data.facebook
          : `https://fb.com/${data.facebook}`
        : "",
    [data]
  );
  const twitterLink = React.useMemo(
    () =>
      data.twitter
        ? data.twitter.includes("https")
          ? data.twitter
          : `https://twitter.com/${data.twitter}`
        : "",
    [data]
  );

  const tiktokLink = resolveTiktok(data.tiktok);

  if (!facebookLink && !twitterLink && !tiktokLink) {
    return !isHiddenNoSocialLink ? <>-</> : null;
  }

  return (
    <div className="flex items-center justify-end space-x-2 social-links">
      {facebookLink && (
        <Tooltip title="Facebook">
          <a
            href={facebookLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
        </Tooltip>
      )}
      {twitterLink && (
        <Tooltip title="Twitter">
          <a
            href={twitterLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
        </Tooltip>
      )}
      {tiktokLink && (
        <Tooltip title="Tiktok">
          <a
            href={tiktokLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Tiktok"
          >
            <FaTiktok width={24} height={24} className="fill-current" />
          </a>
        </Tooltip>
      )}
    </div>
  );
};

export default React.memo(SocialLinks);
