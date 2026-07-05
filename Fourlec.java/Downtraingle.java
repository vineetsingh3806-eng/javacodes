import java.util.Scanner;

public class Downtraingle {
     public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();
       
        for(int i=1;i<=n;i++){
            for(int j=1;j<=i;j++){
                System.out.print("  ");        //spaces...
                }
            for(int j=1;j<=n+1-i;j++){               //stars print krta h...
                System.out.print("* ");     
            }
            System.out.println();
        }
    }
}

