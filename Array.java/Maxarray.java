import java.util.Scanner;
public class Maxarray {
    public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        System.out.print("enter the size: ");
        int n= sc.nextInt();
        int[]arr=new int[n];
        System.out.print("enter the array elements: ");
        for(int i=0;i<n;i++){
            arr[i]=sc.nextInt();
        }
        int max=arr[0];
        //print maximum element...
        for(int i=0;i<n;i++){
            if(arr[i]>max){
                max=arr[i];
            }
        }
        System.out.print("the maximum element is: "+max);
    }
}
