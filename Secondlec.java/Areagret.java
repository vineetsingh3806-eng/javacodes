import java.util.Scanner;
public class Areagret{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter length of rectangle:");
        int l = sc.nextInt();
        System.out.print("Enter breadth of rectangle:");
        int b = sc.nextInt();
        int a = l*b;
        System.out.println("area of rectangle:" + a);
        int p = 2*(l+b);
        System.out.println("perimeter of rectangle:" + p);
         if (a>p){
            System.out.println("area is greater");
         } else {
            System.out.println("area is not greter");
         }
    }
}