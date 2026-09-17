public class MaxCountOfPosNeg {
    public static void main(String[]args){
        int[]arr={-1,-2,-3,0,0,1,2};
        int n=arr.length;
        int i=0;
        int j=n-1;
        int countofpos=0;
        int countofneg=0;
        while(i<=j){
            int mid=(i+j)/2;
            if(arr[mid]>0){
                j=mid; 
            }else if(arr[mid]<0){
                i=mid+1;
            }
        }
        System.out.println("Index of first positive element: " + i);

        while(i<=j){
            int mid=(i+j)/2;
             if(arr[mid]>0){
                j=mid; 
            }else if(arr[mid]<0){
                i=mid+1;
            }
        }
        System.out.println("Index of first positive element: " + j);

        System.out.println(MaxCountOfarr(arr, n));
            }
        }