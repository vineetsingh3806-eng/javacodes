public class anothermethodsorting{
    public static void main(String[]args){
        int[]arr={1,2,4,5,6,-2,3,3};
        int n=arr.length;
        
        for(int i=0;i<n-1;i++){     //no. of passes..
            int count = 0;
            for(int j=0;j<n-1-i;j++){
                if(arr[j]>=arr[j+1]){
                    int temp= arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                    count++;
                }
            }
            if(count==0){
                System.out.println("array is sorted");
                break;
            }
        }
        for(int ele:arr){
            System.out.print(ele+" ");
        }
    }
}