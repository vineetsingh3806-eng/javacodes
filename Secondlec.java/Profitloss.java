
import java.util.Scanner;
public class Profitloss {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter cost price :");
        int cp = sc.nextInt();
        System.out.print("Enter selling price :");
        int sp = sc.nextInt();
        if(sp>cp){
            System.out.println("profit :" + (sp-cp));
        }else if (sp<cp) {
            System.out.println(" loss :" + (cp-sp));
        } else {
            System.out.println("no profit no loss");
        }
    }
}
