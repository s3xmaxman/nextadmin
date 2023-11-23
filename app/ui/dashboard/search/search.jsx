"use client";
import { usePathname, useSearchParams,useRouter  } from 'next/navigation';
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const pathname = usePathname()  // 現在のパス名を取得する
  const {replace} = useRouter()  // ページ遷移を行うための関数を取得する
  const searchParams = useSearchParams()  // 現在のURLのクエリパラメータを取得する
  
  const handleSearch = useDebouncedCallback((e) => {  // デバウンスされたコールバック関数を定義する
    const params = new URLSearchParams(searchParams);  // URLSearchParamsオブジェクトを作成し、現在のクエリパラメータをセットする
    params.set("page", 1);  // "page"というキーに値1をセットする
    if (e.target.value) {  // イベントのターゲットの値が存在する場合
      e.target.value.length > 2 && params.set("q", e.target.value);  // ターゲットの値の長さが2より大きい場合、"q"というキーに検索値をセットする
    } else {  // イベントのターゲットの値が存在しない場合
      params.delete("q");  // "q"というキーのクエリパラメータを削除する
    }
    replace(`${pathname}?${params}`);  // 現在のパス名と新しいクエリパラメータを組み合わせて、ページ遷移する
  }, 300);
  

  return (
    <div className={styles.container}>
      <MdSearch />
      <input type="text" placeholder={placeholder} className={styles.input} onChange={handleSearch} />
    </div>
  )
}

export default Search