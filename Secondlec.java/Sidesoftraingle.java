
import java.util.Scanner;
public class Sidesoftraingle {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter 1st side of traingle:");
        int x = sc.nextInt();
        System.out.print("Enter 2nd side of traingle:");
        int y = sc.nextInt();
        System.out.print("Enter 3rd side of traingle:");
        int z = sc.nextInt();
                                             //a+b>c  (rule of trainglr)...
        if((x+y)>z && (y+z)>x && (z+x)>y){   // all condition has to be true...
            System.out.println("these are the sides of traingle");
        } else {
            System.out.println("these are not the sides of traingle");
        }
    }
    
}
