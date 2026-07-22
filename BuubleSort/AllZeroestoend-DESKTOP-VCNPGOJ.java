public class AllZeroestoend {
    public static void main(String[]args){
        int[]arr={1,2,0,0,3,2,0,1,4,0,7,8};
        //using bubble sort...
        /* int n= arr.length; 
        for(int i=0;i<n-1;i++){    //passes..
            for(int j=0;j<n-1-i;j++){    //traverse in array..
                if(arr[j]==0){
                    int temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }
        for(int ele:arr){
            System.out.print(ele + " ");
        }
    }
} */

     //another method...            without making array bhi krskte h...(copy)
    int[]ans= new int[arr.length];
    int j=0;
    for(int i=0;i<arr.length;i++){
        if(arr[i]!=0){
            ans[j]=arr[i];
            j++;
        }
    }
    for(int i=0;i<ans.length;i++){
       System.out.print(ans[i] + " ");
    }
    }
}
