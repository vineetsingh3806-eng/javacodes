import java.util.Scanner;

public class Input {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Taking integer input
        System.out.print("Enter an integer: ");
        int num = sc.nextInt();
        // Taking string input
        System.out.print("Enter your name: ");
        String name = sc.next();

        // Displaying output
        System.out.println("You entered number: " + num);
        System.out.println("Your name is: " + name);

        sc.close();
    }
}

