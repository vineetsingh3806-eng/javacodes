public class selectionsort {
    public static void main(String[]args){
        int[]arr={8,4,1,9,-3,6,5};
        int n=arr.length;
        for(int i=0;i<n-1;i++){          //passes...
            int min=Integer.MAX_VALUE;   //for every pass we count min then we declare min after pass loop..
            int mindex=0;                //index of min by which we swap element...
            for(int j=i;j<n;j++){        //j traverse in array...
                //find minimum..
                if(arr[j]<min){
                    min=arr[j];
                    mindex=j;
                }
            }
            //swap...
            int temp=arr[i];
            arr[i]=arr[mindex];
            arr[mindex]=temp;
        }
        //print the array..
        for(int ele: arr){
            System.out.print(ele+" ");
        }
    }
}
