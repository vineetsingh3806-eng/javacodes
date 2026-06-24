
import java.util.Scanner;
public class Simpleintrest {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter principal - ");
        double p = sc.nextDouble();
        System.out.print("Enter rate - ");
        double r = sc.nextDouble();
        System.out.print("Enter time - ");
        double t = sc.nextDouble();
        double SI = p*r*t/100;               
        System.out.println(SI);      //p*r*t/100 direct esse bhi likh skte thhe es line m..
    }
}
