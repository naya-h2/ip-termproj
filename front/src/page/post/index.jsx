import { Fragment, useEffect, useState } from "react";
import Input from "../../components/Input";
import { instance } from "../../axios";
import { Helmet } from "react-helmet-async";

const PLACE_LIST = [
  "공식 홈페이지",
  "쿠팡",
  "올리브영",
  "무신사 뷰티",
  "지그재그",
  "에이블리",
];

function PostPage() {
  const [cnt, setCnt] = useState([1]);
  const [keyword, setKeyword] = useState("");

  const handleAddClick = () => {
    setCnt((prev) => [...prev, cnt.length > 0 ? cnt[cnt.length - 1] + 1 : 1]);
  };

  const handleDelClick = (key) => {
    setCnt((prev) => prev.filter((item) => item !== key));
  };

  const postData = async (item, data) => {
    try {
      const res = await instance.post("/cosmetic", data);
      if (res.status === 201) {
        handleDelClick(item);
        setKeyword(data.name);
      }
    } catch (err) {
      alert(
        `[판매 정보 ${item}] 데이터를 등록하는 데 오류가 발생하였습니다.\n에러 메세지: ${err.response.data.error}`
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (cnt.length == 0) return alert("판매 정보를 1개 이상 등록해야 합니다.");

    const elem = e.target.elements;
    const name = elem["상품명 *"].value;

    try {
      const datas = cnt.map((item, idx) => {
        let data;
        if (cnt.length > 1) {
          data = {
            name,
            place: elem["판매처 *"][idx].value,
            price: elem["가격 *"][idx].value,
            url: elem["판매 링크 *"][idx].value,
            imgUrl: elem["상품 이미지 주소"][idx].value,
          };
        } else {
          data = {
            name,
            place: elem["판매처 *"].value,
            price: elem["가격 *"].value,
            url: elem["판매 링크 *"].value,
            imgUrl: elem["상품 이미지 주소"].value,
          };
        }
        if (data.price < 0) alert("판매 가격은 0보다 커야 합니다.");

        postData(item, data);
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (cnt.length === 0) {
      alert("상품 등록에 모두 성공하였습니다.");
      window.location.href = `/result/${keyword}`;
    }
  }, [cnt]);

  return (
    <>
      <Helmet>
        <title>데이터 등록</title>
      </Helmet>
      <form className="mb-24" onSubmit={handleFormSubmit}>
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
              {idx !== 0 && (
                <p
                  onClick={() => handleDelClick(item)}
                  className="text-red-600 text-14 underline cursor-pointer hover:text-red-600/70"
                >
                  삭제하기
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label>판매처 *</label>
                <select
                  name="판매처 *"
                  className="h-[44px] rounded-md border border-gray-200 focus:outline-none px-2 text-14"
                >
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
                label={"상품 이미지 주소"}
                placeholder="상품 이미지 주소 입력(선택)"
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
    </>
  );
}

export default PostPage;
