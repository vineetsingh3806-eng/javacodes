public class ReverseSorting {
    public static void main(String[]args){
        int[]arr={1,2,3,4,4,6,5,4};
        int n= arr.length;
        for(int i=0;i<n-1;i++){
            for(int j=0;j<n-1-i;j++){
                if(arr[j]<arr[j+1]){
                    int temp=arr[j+1];
                    arr[j+1]=arr[j];
                    arr[j]=temp;
                }
            }
        }
        for(int ele:arr){
            System.out.print(ele + " ");
        }
    }
}
