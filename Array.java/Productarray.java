import java.util.Scanner;
public class Productarray {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int p=1;
        int n=sc.nextInt();
        //size..
        int[]arr=new int[n];
        //initialize values...
        System.out.print("enter array element");
        for(int i=0; i<n; i++){
            arr[i]=sc.nextInt();
        }
        //print product..
        for(int i=0;i<n;i++){
            p *= arr[i];
        }
        System.out.print(p+" ");
    }
}
