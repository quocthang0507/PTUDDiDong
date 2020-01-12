package ATM;

public class ATM {

    public static void main(String[] args) {

        View view = new View();
        Controller control = new Controller();
        Model model = new Model();

        model.start();
        view.start();

        // loop until user exist
        boolean repeat = true;
        while (repeat) {
            int action = view.menu();
            String[] data = null;
            if (action == 1)
                data = view.loginForm();
            String message = control.process(model, action, data);
            repeat = view.display(message);
        }
    }
}