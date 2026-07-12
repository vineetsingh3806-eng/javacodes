import java.util.ArrayList;
public class ArrayListBasics {
    public static void main(String[]args){
        ArrayList<Integer> arr = new ArrayList<>();
        //initializing the value..
        arr.add(21);
        arr.add(45);
        arr.add(12);
        arr.add(32);
        arr.add(44);

        // change the value..
        arr.set(3,90);     //we we write index no. where we have to change then we put the value...
        arr.set(4,999);

        //print individual element..
        arr.get(3);
        arr.get(1);

        //we take size inn arraylist instead of length if needed..
        int n=arr.size();

        //print the array..
        System.out.print(arr);  //1st way

        for(int ele:arr){          //for each loop method..  
            System.out.print(ele + " ");
        }

        for(int i=0;i<n;i++){
            System.out.print(arr.get[i]);
        }
    }
}


