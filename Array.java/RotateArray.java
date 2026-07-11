
import java.util.Scanner;
public class RotateArray {

    //1st method but we dont use this...
   /* public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int[]arr={1,12,3,4,7};
        int n=arr.length;
        System.out.print("enter d: ");
        int d=sc.nextInt();
         int[]arr2 = new int[n];
        int j=0;
        for(int i=d;i<n;i++){
            arr2[j]=arr[i];
            j++;
        }
        for(int i=0;i<=(d-1);i++){
                arr2[j]=arr[i];
                j++;
        }
        for(int ele:arr2){
            System.out.println(ele+" ");
        }
}
}   */

         //2nd method we use this...
         public static void main(String[]args){
        Scanner sc = new Scanner(System.in);
        int[]arr={6,8,1,2,4};
        int n=arr.length;     //n=5..   
        System.out.print("enter d: ");
        int d=sc.nextInt();
        d=d%n;
         /* int i=0,j=d-1;  */       //no need bcoz humne direct niche declare kr diya...
        reverse(arr,0,d-1);    //humne direct input leliya..(new method)..
        reverse(arr,d,n-1);           //humne method k through direct access liya...
        reverse(arr,0,n-1);
        for(int ele:arr){
            System.out.print(ele +" ");
        }
    }
        //without method bhi krskte thhe  but it is easy with method..

         public static void reverse(int[]arr,int i,int j){
            while(i<j){
            int temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
            i++;
            j--;
            }
        }
    }




