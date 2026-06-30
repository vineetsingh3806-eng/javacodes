import java.util.Scanner;
public class Pattern {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter rows :");
        int rows=sc.nextInt();
        System.out.print("enter columns :");
        int cols=sc.nextInt();
        for(int i=1;i<=rows;i++){           //kitni lines(rows) hogi...
            for(int j=1;j<=cols;j++){       //har lin m kitna print hoga(columns)... 
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
