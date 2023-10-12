import { MEDIA_URL, SITE_BASE_URL, STATIC_URL } from "./constants";
import dayjs from "dayjs";
import URI from "urijs";
import TimeAgo from "react-timeago";
import Cookies from "js-cookie";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { toast } from "react-toastify";

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const defaultAvatar = STATIC_URL + "img/default-avatar.jpg";

export const getMediaURL = (urlParts: string) => {
  // khi chạy môi trường thật thì thường dùng CDN với đường dẫn tuyệt đối nên hàm này vô dụng
  if (process.env.NODE_ENV === "production") return urlParts;
  if (!urlParts) return "";
  let u: any = new URI(urlParts);
  if (u.is("relative")) {
    u = u.absoluteTo(MEDIA_URL);
  }
  return u.toString();
};

export function getBase64(img: any, callback: (params: any) => void) {
  const reader = new window.FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const emailPattern =
  /^([\w!#$%&'*+\-/=?^`{|}~]+\.)*[\w!#$%&'*+\-/=?^`{|}~]+@((((([a-z0-9][a-z0-9-]{0,62}[a-z0-9])|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?)$/i;

export const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(emailPattern);
};

export const getFromNowShort = (
  datetimeStr: any,
  showSuffix?: boolean,
  exact?: boolean
) => {
  const strings = {
    prefixAgo: "",
    prefixFromNow: null,
    suffixAgo: "",
    suffixFromNow: "",
    seconds: "mới đây",
    minute: "1 phút",
    minutes: "%d phút",
    hour: "1 giờ",
    hours: "%d giờ",
    day: "1 ngày",
    days: "%d ngày",
    month: "1 tháng",
    months: "%d tháng",
    year: "1 năm",
    years: "%d năm",
    wordSeparator: " ",
  };
  if (showSuffix) {
    strings.suffixAgo = "trước";
    strings.suffixFromNow = "trước";
  }
  if (exact) return dayjs(datetimeStr).format("DD/MM/YYYY");
  const formatter = buildFormatter(strings);
  return <TimeAgo formatter={formatter} date={datetimeStr} />;
};

export const formatDate = (datetimeStr: any, dateOnly?: boolean) => {
  let t = "HH:mm DD/MM/YYYY";
  if (dateOnly) {
    t = "DD/MM/YYYY";
  }
  return dayjs(datetimeStr).format(t);
};

export const getFromNowSmart = (datetimeStr: any, dateOnly?: boolean) => {
  const hoursDiff =
    (dayjs().valueOf() - dayjs(datetimeStr).valueOf()) / 1000 / 3600;
  let t = "HH:mm DD/MM/YYYY";

  if (dateOnly) {
    if (hoursDiff > 24) {
      return (
        <time dateTime={datetimeStr}>{Math.round(hoursDiff / 24)} ngày</time>
      );
    }
    return <time dateTime={datetimeStr}>{Math.round(hoursDiff)} giờ</time>;
  } else {
    if (hoursDiff <= 24) {
      return <time dateTime={datetimeStr}>hôm nay</time>;
    }
    if (hoursDiff <= 48) {
      return <time dateTime={datetimeStr}>hôm qua</time>;
    }
    if (hoursDiff <= 24 * 7) {
      return <time dateTime={datetimeStr}>tuần này</time>;
    }
    if (hoursDiff <= 24 * 14) {
      return <time dateTime={datetimeStr}>tuần trước</time>;
    }
    return <time dateTime={datetimeStr}>{dayjs(datetimeStr).format(t)}</time>;
  }
};

export const buildFullUrl = (path: string, query?: string) => {
  const url = new URI(SITE_BASE_URL);
  if (query) {
    return url.pathname(path).addQuery(query).toString();
  }
  return url.pathname(path).toString();
};

export function numberFormatter(num: any, digits?: any) {
  try {
    if (typeof num === "string") num = parseInt(num);
  } catch (e) {}
  const si = [
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];
  for (const i of si) {
    if (+num >= i.value) {
      return (
        (+num / i.value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + i.symbol
      );
    }
  }
  return isNaN(+num) ? null : num.toString();
}

export const setCookies = (cname: string, cvalue: string, exdays?: number) => {
  Cookies.set(cname, cvalue, { expires: exdays || 70000 });
};

export const getCookies = (cname: string) => {
  return Cookies.get(cname);
};

export const deleteCookies = (cname: string) => {
  Cookies.remove(cname);
};

export const clearAllCookies = () => {
  const cookieNames = Object.keys(Cookies.get());
  cookieNames.forEach((cookieName) => {
    Cookies.remove(cookieName, { path: "/" });
  });
  if (typeof window !== "undefined") localStorage.removeItem("url-search");
};

export const createQueryString = (
  name: string,
  value: string,
  searchParams: any,
  pathName?: string
) => {
  if (!pathName) pathName = window.location.pathname;
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return pathName + "?" + params.toString();
};

export const renderPosition = (position: string) => {
  if (!position) return "_";
  switch (position) {
    case "Attacker":
      return "Tiền đạo";
    case "Midfielder":
      return "Tiền vệ";
    case "Defender":
      return "Hậu vệ";
    case "Goalkeeper":
      return "Thủ môn";
    case "coach":
      return "Huấn luyện viên";
    default:
      return position;
  }
};

export const handleAfterCopy = (title = "Đã sao chép liên kết") => {
  return toast.success(title, { autoClose: 1000 });
};

export const capitalizeFirstLetter = (title: string) => {
  const str = title;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};
