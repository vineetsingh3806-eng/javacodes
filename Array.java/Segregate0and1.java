public class Segregate0and1{
    public static void main(String[]args){
        int[]arr={1,0,1,1,1,0,0,1};
          //by usingh 2 pointer technique... 
        /* int i=0,j=arr.length-1;
        while(i<j){
            if(arr[i]==0){
                i++;
            }
            else if(arr[j]==1){
                j--;
            } else if(arr[i]==1 && arr[j]==0){
                arr[i]=0;
                arr[j]=1;
                i++;
                j--;
            }
        }
        for(int ele: arr){
            System.out.print(ele +" ");
        }
    }
} */
       //2nd method by using counting of 1 and 0..
int countzeroes=0;
int countones=0;
for(int i=0;i<arr.length;i++){
    if(arr[i]==0){
        countzeroes++;
    } else{
        countones++;
    }
} for(int i=0;i<countzeroes;i++){
   arr[i]=0;
}
for(int i=countzeroes;i<arr.length;i++){
  arr[i]=1;
}
for(int ele: arr){
    System.out.print(ele +" ");
}
    }
}

