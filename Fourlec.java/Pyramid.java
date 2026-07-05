import java.util.Scanner;
public class Pyramid {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int n=sc.nextInt();

        //1st method...  by variable..
        int nst=1;
        int nsp=n-1;
      for(int i=1;i<=n;i++){
        for(int j=1;j<=nsp;j++){        //nsp(space)...  
            System.out.print("  ");
        }
          for(int j=1;j<=nst;j++){         //nst(star)...
            System.out.print("* ");
          }
           System.out.println();
        nsp--;
        nst+=2;
    }
}
}
          //2nd method..
      /*   for(int i=1;i<=n;i++){
              for(int j=1;j<=n-i;j++){          //last linr m space nhi dena esliye(n=i)...
                System.out.print("  ");      //spaces...
            }
            for(int j=1;j<=2*i-1;j++){          //odd print krna h esliye 2*n-1...
                System.out.print("* "); }    //stars...
            
            System.out.println();
        }
    }
}
 */