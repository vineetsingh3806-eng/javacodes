import java.util.Scanner;

public class Bridge {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n= sc.nextInt();
        for(int i=1;i<=2*n-1;i++){
            System.out.print("* ");   //stars(top most line)...
        }
        System.out.println();

        int nsp=1;
        for(int i=1; i<=n-1;i++){            //bcoz we skip 1st line...
            for(int j=1; j<=n-i;j++){          //eske uper walle line ka comment dekh lo...(thats why we remove -1)..
                System.out.print("* ");   //stars(1st part)...
            } 
            for(int j=1;j<=nsp;j++){
                System.out.print("  ");    //spaces(2nd part)...
            }
            for(int j=1;j<=n-i;j++){           //n+i liya kyuki humne starting line alag se print kri h esliyen int i m bhi n-1 liya h...
                System.out.print("* ");    //stars(3rd part)...
            } 
            System.out.println();
            nsp+=2;
             
        }
}
}
