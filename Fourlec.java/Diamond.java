import java.util.Scanner;
public class Diamond {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n= sc.nextInt();
        int nsp=n-1;
        int nst=1;

        //this print upper part...
        for(int i=1; i<=n;i++){
            for(int j=1; j<=nsp;j++){
                System.out.print("  ");      //spaces..
            }
            for(int j=1; j<=nst; j++){
                System.out.print("* ");    //stars...
            }
            System.out.println();
            nsp--;
            nst+=2;
        }
         //this print lower part...
         nsp=1;
         nst=2*n-3;
         for(int i=1;i<=n-1;i++){             //see clearfully in lower pattern their are n-1 lines(i)...
             for(int j=1;j<=nsp;j++){     //spaces...
                System.out.print("  ");
            }     
            for(int j=1;j<=nst;j++){          //stars...
                System.out.print("* ");
            }
            System.out.println();
            nsp++;
            nst-=2;
        }
    }
}
