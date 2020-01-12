package ATM;

import java.util.Scanner;

public class View {

    Scanner sc;

    void start() {
        sc = new Scanner(System.in);
        System.out.println("===== Welcome to ATM Application =====");
    }

    // Menu input
    int menu() {
        System.out.println();
        System.out.println("-------- ATM Application --------");
        System.out.println("1 - Login");
        System.out.println("---------------------------------");
        System.out.print("Select your action: ");
        int action = sc.nextInt();
        return action;
    }

    // Yeu cau nguoi dung nhap ID va PW
    String[] loginForm() {

        System.out.print("Enter your ID: ");
        String id = sc.next();
        System.out.print("Enter your password: ");
        String pw = sc.next();
        // save and return
        String[] data = { id, pw };
        return data;
    }

    // Yeu cau nguoi dung nhap ID va PW
    boolean display(String message) {

        System.out.println();
        System.out.println("Result: " + message);
        System.out.println();
        // yeu cau cong viec
        System.out.print("Continue? (y/n)");
        String choice = sc.next();
        System.out.println();

        if (choice.equalsIgnoreCase("y"))
            return true;

        System.out.println("Goodbye!");
        return false;
    }
}