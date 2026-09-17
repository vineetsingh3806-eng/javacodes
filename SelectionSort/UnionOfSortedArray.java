public class UnionOfSortedArray {
    public static void main(String[]args){
        int[]a={1,2,3,4,5};
        int[]b={1,2,3,6,7};
        int i=0,j=0,k=0;
        ArrayList<Integer> ans = new ArrayList<>();
        while(i<a.length && j<b.length){
            if(a[i]==b[j]){
                ans.add(a[i]);
                i++;
                j++;
            } else if(a[i]<b[j]){
                ans.add(a[i]);
                i++;
            } else if(a[i]>b[j]){
                ans.add(b[j]);
                j++;
            } 
        }
        while(i<a.length){
            ans.add(a[i]);
            i++;
        } while(j<b.length){
            ans.add(b[j]);
            j++;
        }
    }
}
