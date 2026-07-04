import java.util.Scanner;

public class Floyd {
    public static void main(String[]args){
        Scanner sc= new Scanner(System.in);
         int n=sc.nextInt(); 
         int b=1;
         for(int i= 1; i<=n; i++){
            for(int j=1;j<=i;j++){
                System.out.print(b+ " ");
                b++;
            }
            System.out.println();
         }
}
}
