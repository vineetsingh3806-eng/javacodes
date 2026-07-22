import java.util.ArrayList;

public class CommonElement {
    public static void main(String[]args){
        int[]a={1,1,2,3,3,4};
        int[]b={2,2,3,4,5,6,7};
        int i=0,j=0; 
        int k=0;
        // Create an ArrayList of Strings named ans
        ArrayList<Integer> ans = new ArrayList<>();
        while (i< a.length && j< b.length) {
                if(a[i]==b[j]){
                    ans.add(a[i]);
                    k++;
                    i++;
                    j++;
                } else if(a[i]<b[j]){
                    i++;
                } else if(a[i]>b[j]){
                    j++;
                }
        }
        for(int ele:ans){
            System.out.print(ele+" ");
        }
    }
}
