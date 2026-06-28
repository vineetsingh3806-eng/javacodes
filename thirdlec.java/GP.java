import java.util.Scanner;
public class GP {
    public static void main(String[]args){
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter n:");
    int n=sc.nextInt();
           //print GP(1,2,4,8....)
    int a=1;                    //hum esme D=2 le skte thhe...
    for(int i=1;i<=n;i++){
        System.out.print(a+",");
        a=a*2;                   //d=2 hota toh a=a*d krdete wo bhi sahi hota... 
    }

}
}
