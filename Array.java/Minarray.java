import java.util.Scanner;
public class Minarray{
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter the size: ");
        int n = sc.nextInt();
        int[]arr=new int[n];
        // initialization of array elements...
        System.out.print("enter the array elements: ");
        for(int i=0;i<n;i++){
            arr[i]=sc.nextInt();
        } int min=arr[0];
        //print minimum element...
        for(int i=0;i<n;i++){
            if(arr[i]<min){
                min=arr[i];
            }        
        }
        System.out.println("the minimum element is: "+min);
    }
}