import java.util.Scanner;
   public class Quadrant {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("x:");
        double x = sc.nextDouble();
        System.out.print("y:");
        double y = sc.nextDouble();
        if(x==0 && y==0){
            System.out.println( "it lies in origin");
        } else if (x==0 && y!=0){
            System.out.println("lies on y-axis");
        } else if (y==0 && x!=0){
            System.out.println("lies on x-axis");
        } else if (x>0 && y>0){
            System.out.println("lies in  1st  quadrant");
        } else if (x<0 && y>0){
            System.out.println("lies in 2nd quadrant");
        } else if (x<0 && y<0){
            System.out.println("lies in 3rd quadrant");
        } else if (x>0 && y<0){
            System.out.println("lies in 4th quadrant");
        }
    }
}
 