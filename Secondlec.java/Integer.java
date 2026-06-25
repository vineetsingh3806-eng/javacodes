import java.util.Scanner;
public class Integer {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number:");
        double x = sc.nextDouble(); //real no...   // x=3.1412...
        int n = (int)x;  //type casting... //n=3...
        if((n-x)==0) {   //3.1412-3=0(it mean it is a integer otherwise not)....
            System.out.println("is a integer");  
        } else{
            System.out.println("not a integer");
        }

    }
}
