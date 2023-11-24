"use server";
import { connectToDB } from "./utils";
import { User } from "./models";
import { Product } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async(formData) => {
    const { username, email, password, phone, address, isAdmin, isActive } = 
    Object.fromEntries(formData);
    try {
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin,
            isActive
        });
        await newUser.save();
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong!');
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

export const updateUser = async (formData) => {
    const { id, username, email, password, phone, address, isAdmin, isActive } =
      Object.fromEntries(formData);  // フォームデータから各フィールドの値を取得する
    try {
      connectToDB();  // データベースに接続する
      const updateFields = {
        username,
        email,
        password,
        phone,
        address,
        isAdmin,
        isActive,
      };  // 更新するフィールドとその値をオブジェクトにまとめる
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );  // 値が空文字列または未定義のフィールドを削除する
      await User.findByIdAndUpdate(id, updateFields);  // ユーザーを更新する
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update user!");  // ユーザーの更新に失敗した場合にエラーをスローする
    }
    revalidatePath("/dashboard/users");  // パスの再検証を行う
    redirect("/dashboard/users");  // リダイレクトを行う
  };

export const deleteUser = async(formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB();
        await User.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong!');
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}  
  

export const addProduct = async(formData) => {
    const {title, desc, price, stock, color, size} = Object.fromEntries(formData);
    try {
        connectToDB();
        const newProduct = new Product({
            title,
            desc,
            price,
            stock,
            color,
            size,
        });
        await newProduct.save();
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong!');
    }
    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}

export const updateProduct = async (formData) => {
    const { id, title, desc, price, stock, color, size } =
      Object.fromEntries(formData);
  
    try {
      connectToDB();
  
      const updateFields = {
        title,
        desc,
        price,
        stock,
        color,
        size,
      };
  
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );
  
      await Product.findByIdAndUpdate(id, updateFields);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update product!");
    }
  
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  };

export const deleteProduct = async(formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB();
        await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong!');
    }
    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}


export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return err;
  }
};