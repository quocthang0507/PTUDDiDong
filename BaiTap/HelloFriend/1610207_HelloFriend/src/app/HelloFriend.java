package app;

import java.util.Scanner;

/**
 * @author Phan Viet Hoang
 *  La Quốc Thắng
 */

public class HelloFriend {
    public static void main(String args[]) {
        HelloFriend hello = new HelloFriend();
        hello.execute();
    }

    public void execute() {

        String ten;
        double tuoi;
        String gioi_tinh;
        int dien_thoai;

        System.out.println("-------- Hello Friend --------");

        // Allows a person to enter his/her name
        Scanner one = new Scanner(System.in);
        System.out.print("Ten cua ban: ");
        ten = one.next();

        // Allows a person to enter his/her age
        Scanner two = new Scanner(System.in);
        System.out.print("Tuoi cua ban: ");
        tuoi = two.nextDouble();

        // Allows a person to enter his/her gender
        Scanner three = new Scanner(System.in);
        System.out.print("Gioi tinh cua ban: ");
        gioi_tinh = three.next();

        // Allows a person to enter his/her telephone number
        Scanner four = new Scanner(System.in);
        System.out.print("Dien thoai cua ban: ");
        dien_thoai = four.nextInt();

        System.out.println("--------");
        System.out.println("Chao ban " + ten + "!");
        System.out.println("Thong tin cua ban:");
        System.out.println("\tTuoi      : " + tuoi);
        System.out.println("\tGioi tinh : " + gioi_tinh);
        System.out.println("\tDien thoai: " + dien_thoai);
        System.out.println("--------");
        System.out.println("Cam on ban!");

    }
}