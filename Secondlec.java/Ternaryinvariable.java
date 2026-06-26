import java.util.Scanner;
public class Ternaryinvariable {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        int x = (n>=0)? 100:0;  //usually ternary operator use if we have to put a value in variable...
        System.out.println(x);
    }
}
