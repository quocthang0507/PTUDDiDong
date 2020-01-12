package ATM;

public class Account {
    private String id;
    private String pw;

    public Account(String id, String pw) {
        this.id = id;
        this.pw = pw;
    }

    public boolean checkLogin(String id, String pw) {
        // Kiem tra login voi tai khoan nay
        return id.equals(this.id) && pw.equals(this.pw);
    }

}