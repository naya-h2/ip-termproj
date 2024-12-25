import { Fragment, useState } from "react";
import Input from "../../components/Input";

const PLACE_LIST = [
  "공식 홈페이지",
  "쿠팡",
  "올리브영",
  "무신사 뷰티",
  "지그재그",
  "에이블리",
];

function PostPage() {
  const [cnt, setCnt] = useState([]);

  const handleAddClick = () => {
    setCnt((prev) => [...prev, cnt.length > 0 ? cnt[cnt.length - 1] + 1 : 1]);
  };

  const handleDelClick = (key) => {
    setCnt((prev) => prev.filter((item) => item !== key));
  };

  return (
    <form className="mb-24">
      <h1 className="mt-6 text-20 font-bold">데이터 등록</h1>
      <p className="text-gray-500 text-12 mb-7">
        * 표시는 필수 입력 사항입니다.
      </p>
      <Input
        label={"상품명 *"}
        placeholder="상품명 입력 (ex. 더 쥬시 래스팅 틴트)"
        required
      />
      {cnt.map((item, idx) => (
        <Fragment key={item}>
          <div className="flex justify-between items-center border-t border-gray-300 mt-5 pt-3 mb-3">
            <div>판매 정보 {item}</div>
            <p
              onClick={() => handleDelClick(item)}
              className="text-red-600 text-14 underline cursor-pointer hover:text-red-600/70"
            >
              삭제하기
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label>판매처 *</label>
              <select className="h-[44px] rounded-md border border-gray-200 focus:outline-none px-2">
                {PLACE_LIST.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <Input
              label={"가격 *"}
              placeholder="12900"
              type="number"
              required
            />
            <Input
              label={"판매 링크 *"}
              placeholder="상품 판매 링크 입력"
              type="url"
              required
            />
            <Input
              label={"상품 이미지 링크"}
              placeholder="상품 이미지 링크 입력(선택)"
            />
          </div>
        </Fragment>
      ))}
      <div
        onClick={handleAddClick}
        className="text-14 text-pink-main underline cursor-pointer text-center mt-6"
      >
        판매 정보 추가
      </div>
      <button className="w-full mt-10">등록하기</button>
    </form>
  );
}

export default PostPage;
