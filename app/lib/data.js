import { User } from "./models"
import { Product } from "./models";
import { connectToDB } from "./utils";


export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");  // 正規表現オブジェクトを作成し、検索クエリをセットする
    const limitPage = 2;  // 1ページあたりのユーザー数の制限を定義する
    try {
        connectToDB();  // データベースに接続する
        const count = await User.find({ username: { $regex: regex }}).count();  // 正規表現に一致するユーザーの数を取得する
        const users = await User.find({ username: { $regex: regex }}).limit(limitPage).skip((page - 1) * limitPage);  // 正規表現に一致するユーザーを取得する
        return {
            users,
            count
        };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");  // ユーザーの取得に失敗した場合にエラーをスローする
    }
}

export const fetchUser = async (id) => {
    try {
        connectToDB();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user"); 
    }
}


export const fetchProducts = async (q, page) => {
    const regex = new RegExp(q, "i");  // 正規表現オブジェクトを作成し、検索クエリをセットする
    const ITEM_PER_PAGE = 2;  // 1ページあたりの商品数を定義する
    try {
        connectToDB();  // データベースに接続する
        const count = await Product.find({ title: { $regex: regex } }).count();  // 正規表現に一致する商品の数を取得する
        const products = await Product.find({ title: { $regex: regex } })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));  // 正規表現に一致する商品を取得する
        return { count, products };
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch products!");  // 商品の取得に失敗した場合にエラーをスローする
    }
};

export const fetchProduct = async (id) => {
    try {
        connectToDB();
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch product"); 
    }
}