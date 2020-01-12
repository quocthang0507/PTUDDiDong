package ATM;

public class Model {
    Account acc;

    void start() {
        // Tạo tài khoản mặc định
        acc = new Account("thang", "123");
    }

    boolean login(String id, String pw) {
        return acc.checkLogin(id, pw);
    }

}