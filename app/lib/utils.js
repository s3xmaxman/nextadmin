import mongoose, { connection } from "mongoose";


export const connectToDB = async () => {
    try {
        if( connection.isConnected ) {
            return; // もし既にデータベースに接続されている場合は、何もせずに関数を終了します
        }
        const db = await mongoose.connect(process.env.MONGO); // MongoDBデータベースに接続します
        connection.isConnected = db.connections[0].readyState; // データベースの最初の接続の状態を取得し、接続状態を設定します
    } catch (error) {
        console.log(error); // 接続中にエラーが発生した場合、エラーメッセージをコンソールに出力します
    }
}