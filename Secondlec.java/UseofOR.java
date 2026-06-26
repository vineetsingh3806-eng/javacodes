
//use of ||...
import java.util.Scanner;
public class UseofOR {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();

        if(x%5==0 || x%3==0){     //use of ||...  //any one condition is true than print...
            System.out.println("number is divisible by 5 or 3");
        } else {
            System.out.println("not divisible by 5 or 3");
        }
    }
}
