package ATM;

public class Controller {

    String process(Model model, int action, String[] data) {

        String message;
        switch (action) {
        case 1:
            // Goi ham login in Model
            String id = data[0];
            String pw = data[1];
            boolean ok = model.login(id, pw);
            message = (ok) ? "Login is ok" : "Login fail";
            break;
        default:
            message = "Invalid operation";
            break;
        }
        return message;
    }

}