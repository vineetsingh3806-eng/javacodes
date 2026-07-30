
       //binary search of 1st occurence...
      
import java.util.Scanner;
public class FirstOccurense {
    public static void main(String[]args){
        int[]arr={1,1,2,2,2,3,4,5,5,5,6,7,8,11};
        Scanner sc = new Scanner(System.in);
        System.out.print("enter the target: ");
         int target = sc.nextInt();
         int n=arr.length;
        int index=-1;
        int i=0,j=n-1;
        while(i<=j){
           int mid=(i+j)/2;
            if(arr[mid]==target){
                index=mid;
                j=mid-1;
            }else if(arr[mid]>target){
                j=mid-1;
            } else{
                i=mid+1;
            }
        }
        System.out.print(index);
    }
}
