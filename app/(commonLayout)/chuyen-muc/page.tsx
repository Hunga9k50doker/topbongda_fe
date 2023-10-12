import React from "react";
import { getCategoriesListAPI } from "@/apis/forum_apis";
import { buildFullUrl } from "@/utils";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { CategoryModel } from "@/models/category_model";
import WrapTitle from "@/components/common/WrapTitle";
import CardCategory from "@/components/Cards/CardCategory";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `Chuyên Mục Diễn Đàn - ${BRAND_NAME}`,
  description:
    "Topbongda là nơi hội tụ của những người đam mê bóng đá khắp Việt Nam, đăng ký để tham gia ngay.",
  alternates: {
    canonical: buildFullUrl("/chuyen-muc/"),
  },
};

async function Categories() {
  const catList: CategoryModel[] = await getCategoriesListAPI()
    .then((r) => r.data)
    .catch(() => []);
  if (!catList) return notFound();
  return (
    <div className="container mx-auto pb-12">
      <h1>
        <WrapTitle title="Danh sách chuyên mục diễn đàn" />
      </h1>

      {catList.map((item, key) => (
        <CardCategory key={key} data={item} isShort={false} type="category" />
      ))}
      {catList.length === 0 && (
        <div>
          <em>Chưa có chuyên mục nào.</em>
        </div>
      )}

      <div className="mt-4">
        <h2>
          <WrapTitle title="Vì sao con người phát cuồng vì bóng đá?" />
        </h2>
        <article className="mx-4 text-slate-500">
          <p>
            Bóng đá luôn được biết tới với biệt danh môn thể thao vua do sở hữu
            hàng tỉ tín đồ đam mê, phát cuồng trên thế giới. Một nghiên cứu mới
            đây đã lý giải việc tại sao phần lớn chúng ta lại đam mê bóng đá tới
            vậy.
          </p>
          <p>
            Chuyên gia Steven Almond sau hơn 40 năm nghiên cứu môn thể thao vua
            đã đưa ra kết luận trong cuốn sách của mình “Against Football: One
            Fan’s Reluctant Manifesto” (tạm dịch: Ghét bóng đá: lời tuyên ngôn
            của một fan bất đắc dĩ).
          </p>
          <p>
            Theo ông, bóng đá là môn thể thao cho phép con người tương tác, kết
            nối với nhau khi tham gia. Con người luôn tìm kiếm xã hội mà ở đó
            không có sự đánh giá xuất thân gia đình hay tôn giáo. Bóng đá chính
            là môn thể thao cho phép chúng ta trải nghiệm cảm giác ấy.
          </p>
          <p>
            Sức hấp dẫn của môn thể thao vua còn nằm ở chỗ, luật bóng đá rất
            phức tạp, thay đổi liên tục nên đòi hỏi người chơi phải thích ứng
            nhanh. Ngoài ra, các bước di chuyển trong bóng đá vô cùng đa dạng,
            không cố định hoặc bó hẹp ở một số vị trí nhất định.
          </p>
        </article>
      </div>
    </div>
  );
}

export default Categories;
