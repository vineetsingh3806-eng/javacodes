import java.util.Scanner;

public class Reversetraingle {
     public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter n:");
        int n=sc.nextInt();
        int a=n;
      /*   for(int i=1; i<=n;i++){
            for(int j=1;j<=n+1-i;j++){
                System.out.print("* ");
            }System.out.println();
        }  */

            //2nd method...
          for(int i=1; i<=n;i++){
            for(int j=1;j<=a;j++){
                System.out.print("* ");
            } a--;
            System.out.println();
        } 
}
}
