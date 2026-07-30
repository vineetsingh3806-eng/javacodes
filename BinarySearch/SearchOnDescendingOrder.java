import java.util.Scanner;
public class SearchOnDescendingOrder {
    public static void main(String[]args){
        int[]arr={11,9,8,7,6,5,4,3,2,1};
        Scanner sc = new Scanner(System.in);
          System.out.print("enter target: ");
        int target=sc.nextInt();
        int i=0,j=arr.length-1;
        while(i<=j){
            int mid=(i+j)/2;
            if(arr[mid]>target){
               i=mid+1;;
            } else if(arr[mid]<target){
               j=mid-1;
            } else if(arr[mid]==target) {
                System.out.print("found at:"+ mid);
                break;
            } else {
                System.out.print("not found");
            }
        }
    }
}
