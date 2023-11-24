export const authConfig = {
    providers:[],  // 認証プロバイダーの設定を配列で定義する
    pages: {
      signIn: "/login",  // サインインページのパスを指定する
    },
    callbacks: {
      authorized({ auth, request }) {  // 認証が許可された場合のコールバック関数を定義する
        const isLoggedIn = auth?.user;  // ユーザーがログインしているかどうかをチェックする
        const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");  // 現在のパスがダッシュボードのパスかどうかをチェックする
        if (isOnDashboard) {  // ダッシュボードのパスの場合
          if (isLoggedIn) return true;  // ユーザーがログインしている場合は認証を許可する
          return false;  // ユーザーがログインしていない場合は認証を拒否する
        } else if (isLoggedIn) {  // ダッシュボードのパスでない場合でユーザーがログインしている場合
          return Response.redirect(new URL("/dashboard", request.nextUrl));  // ダッシュボードへのリダイレクトを行う
        }
        return true;  // ダッシュボードのパスでない場合でユーザーがログインしていない場合は認証を許可する
      },
    },
  };
