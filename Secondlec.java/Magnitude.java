
import java.util.Scanner;
public class Magnitude {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
         double x = sc.nextDouble();
         if (x>0 && x<69){
            System.out.println("the magnitude is smaller than 69");
         } else if ((-x)<69){
            System.out.println("the magnitude is smaller than 69");
         } else {
            System.out.println("not smaller than 69");
         }
    }
}
