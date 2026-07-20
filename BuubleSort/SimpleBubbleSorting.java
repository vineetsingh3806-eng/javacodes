public class SimpleBubbleSorting {
    public static void main(String[]args){
        int[]arr={5,-2,6,7,2,0,7,2};
        int n=arr.length;
         for(int i=0;i<n-1;i++){         //it shows number of passes...
            for(int j=0;j<n-1-i;j++){   //swapping and checking condition..
                if(arr[j]>=arr[j+1]){   //bubble sort  starts from here..
                    int temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]= temp;
                }                        // ends here...
            }
        }
        // print the array...
        for(int ele:arr){
            System.out.print(ele + " ");
        }
    }
}
