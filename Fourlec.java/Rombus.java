import java.util.Scanner;
public class Rombus {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();
        for(int i=1;i<=n;i++){
                for(int j=1;j<=n-i;j++){
                System.out.print("  ");        //spaces...
                }
            for(int j=1;j<=n;j++){               //stars print krta h...
                System.out.print("* ");     
            }
            System.out.println();
        }
    }
}
