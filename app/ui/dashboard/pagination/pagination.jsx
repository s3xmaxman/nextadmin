"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
const searchParams = useSearchParams();  // 現在のURLのクエリパラメータを取得する
  const { replace } = useRouter();  // ページ遷移を行うための関数を取得する
  const pathname = usePathname();  // 現在のパス名を取得する

  const page = searchParams.get("page") || 1;  // クエリパラメータから"page"というキーの値を取得し、存在しない場合は1をデフォルトとする
  const params = new URLSearchParams(searchParams);  // URLSearchParamsオブジェクトを作成し、現在のクエリパラメータをセットする
  const ITEM_PER_PAGE = 2;  // 1ページあたりのアイテム数を定義する
  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;  // 前のページが存在するかどうかを判定する
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;  // 次のページが存在するかどうかを判定する
  
  const handleChangePage = (type) => {  // ページ変更のハンドラー関数を定義する
    type === "prev"  // typeが"prev"の場合
      ? params.set("page", parseInt(page) - 1)  // "page"というキーの値を現在のページから1減らす
      : params.set("page", parseInt(page) + 1);  // typeが"prev"でない場合は、"page"というキーの値を現在のページから1増やす
    replace(`${pathname}?${params}`);  // 現在のパス名と新しいクエリパラメータを組み合わせて、ページ遷移する
  };


  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;