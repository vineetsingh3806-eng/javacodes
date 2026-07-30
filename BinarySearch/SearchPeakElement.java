public class SearchPeakElement{
    public static void main(String[]args){
       int[]arr={-1,0,1,2,5,6,9,8,6,3};
        int n=arr.length;
        int i=1,j=n-2;  //array always a mountain array...like{-1,0,1,2,5,6,8,6,3} 1st and last ele always not a peak..
        while(i<=j){
            int mid=(i+j)/2;
            if(arr[mid]>arr[mid-1] && arr[mid]>arr[mid+1]){
                System.out.print("peak point is: " +arr[mid]);
                break;
            } else if(arr[mid]<arr[mid+1] && arr[mid]>arr[mid-1]){
                i=mid+1;
            } else if(arr[mid]>arr[mid+1] && arr[mid]<arr[mid-1]){
                j=mid-1;
            }
        }
    }
}