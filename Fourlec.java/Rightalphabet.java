import java.util.Scanner;

public class Rightalphabet {
      public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();
        for(int i=1;i<=n;i++){
              for(int j=1;j<=n-i;j++){       //spaces... +1 esliye htaya kyuki extra hashes print(diagonal)ho rhhe thee..
                System.out.print("  ");
            }
            for(int j=1;j<=i;j++){             //stars print krta h...
                System.out.print((char)(64+i)+" ");
            }
            System.out.println();
        }
}
}
