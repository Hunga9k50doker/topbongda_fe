import React from "react";
import CustomLink from "@/components/common/CustomLink";

function AboutWebsiteFoot() {
  return (
    <section className="mt-8">
      <h2 className="heading-font font-bold text-xl mb-2">Topbongda là gì?</h2>
      <p className="text-sm mb-2 text-gray-600">
        Topbongda là cộng đồng các fan hâm mộ bóng đá Việt Nam. Đây là nơi kết
        nối những con người có cùng đam mê với trái bóng tròn. Dù bạn đang ở độ
        tuổi nào, học ở đâu, làm gì, website cũng sẽ trở thành cầu nối để kết
        bạn, chia sẻ niềm vui trong cuộc sống.
      </p>
      <p className="text-sm text-gray-600">
        Website liên tục cập nhật{" "}
        <CustomLink href="/lich-thi-dau/" className="link">
          lịch thi đấu bóng đá
        </CustomLink>
        , bảng xếp hạng các giải đấu và tin bóng đá nóng hổi hàng ngày. Hãy
        thường xuyên ghé thăm Topbongda để nhận được những điều thú vị nhất về
        môn thể thao vua nhé!
      </p>
    </section>
  );
}

export default AboutWebsiteFoot;
