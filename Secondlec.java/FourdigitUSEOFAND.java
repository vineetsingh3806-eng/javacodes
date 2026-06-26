// //use of &&...
import java.util.Scanner;
public class FourdigitUSEOFAND {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        if(n>999 && n<10000){      //use of &&...  //if both are right then print...
           System.out.println("it is a 4 digit number");
        } else {
            System.out.println("not a 4 digit number");
        }
    }
}
