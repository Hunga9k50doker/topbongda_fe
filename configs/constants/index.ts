export const HOME_TABS = {
  PHO_BIEN: "pho-bien",
  BAI_MOI: "bai-moi",
  SAP_DIEN_RA: "lich-thi-dau",
  CHUYEN_MUC: "chuyen-muc",
  CAC_DOI_BONG_NOI_TIENG: "doi-bong",
  TOP_THANH_VIEN_TUAN_NAY: "top-thanh-vien-tuan-nay",
  TIN_BONG_DA: "tin-bong-da",
  GIAI_DAU: "gai-dau",
  DOI_BONG: "doi-bong",
  DANH_SACH_THANH_VIEN: "thanh-vien/danh-sach",
  CHU_DE: "chu-de",
};

export const TEAM_TABS = {
  TONG_QUAN: "tong-quan",
  LICH_THI_DAU: "lich-thi-dau",
  CAU_THU: "cau-thu",
  FAN_HAM_MO: "fans",
  BAI_VIET: "bai-viet",
  TIN_TUC: "tin-tuc",
};

export const COMPETITION_TABS = {
  TONG_QUAN: "tong-quan",
  LICH_THI_DAU: "lich-thi-dau",
  BANG_XEP_HANG: "bang-xep-hang",
  TOP_DANH_HIEU: "top-danh-hieu",
  BAI_VIET: "bai-viet",
  TIN_TUC: "tin-tuc",
};

export const ACCOUNT_TABS = {
  TONG_QUAN: "tong-quan",
  BAI_VIET: "bai-viet",
  THEO_DOI: "theo-doi",
  BO_SU_TAP: "bo-su-tap",
  DU_DOAN: "du-doan",
  LICH_SU_TICH_LUY: "lich-su-tich-luy",
  CAP_DO: "cap-do",
  CAI_DAT: "cai-dat",
};

export const USER_TABS = {
  TONG_QUAN: "tong-quan",
  BAI_VIET: "bai-viet",
  BAO_CAO: "bao-cao",
};

export const MATCH_STATUS = {
  TBD: { key: "TBD", title: "Chưa có giờ đá" },
  NS: { key: "NS", title: "Sắp đá" },
  "1H": { key: "1H", title: "Hiệp 1" },
  HT: { key: "HT", title: "Hết hiệp 1" },
  "2H": { key: "2H", title: "Hiệp 2" },
  ET: { key: "ET", title: "Bù giờ" },
  BT: { key: "BT", title: "Giờ nghỉ" },
  P: { key: "P", title: "Đá phạt đền" },
  SUSP: { key: "SUSP", title: "Đã bị dừng" },
  INT: { key: "INT", title: "Gián đoạn vài phút" },
  FT: { key: "FT", title: "Kết thúc" },
  AET: { key: "AET", title: "Kết thúc sau hiệp phụ" },
  PEN: { key: "PEN", title: "Kết thúc sau penalty" },
  PST: { key: "PST", title: "Trận tạm hoãn" },
  CANC: { key: "CANC", title: "Trận bị bỏ" },
  ABD: { key: "ABD", title: "Abandoned" },
  AWD: { key: "AWD", title: "Technical Loss" },
  WO: { key: "WO", title: "Đối thủ bỏ cuộc" },
  LIVE: { key: "LIVE", title: "Đang đá" },
};

export const MATCH_STATUS_UPCOMING = ["NS", "TBD"];
export const MATCH_STATUS_OTHER = ["SUSP", "CANC", "ABD", "AWD", "PST", "INT"];
export const MATCH_STATUS_INCOMING = [
  "1H",
  "2H",
  "ET",
  "P",
  "LIVE",
  "HT",
  "BT",
];
export const MATCH_STATUS_FINISH = ["FT", "AET", "PEN", "WO"];
