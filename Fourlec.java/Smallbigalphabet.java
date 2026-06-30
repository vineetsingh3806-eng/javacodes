import java.util.Scanner;
public class Smallbigalphabet {
    public static void main(String[]args){
        Scanner sc= new Scanner(System.in);
        int n= sc.nextInt();
        if(n>26){
            System.out.println("invalid input");
        } else{
            for(int i=1; i<=n;i++){
                for(int j=1; j<=n;j++){
                    if(i%2==0){
                         System.out.print((char)(i+64)+" ");
                    } else{
                        System.out.print((char)(i+96)+" ");
                    }
                }
                System.out.println();
            }
        }
    }
}
