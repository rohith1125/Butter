#include <iostream>
using namespace std;
 bool isPowerOfTwo(int n) {
        if(n==0)
            return false;
        return(ceil(log2(n))==floor(log2(n)));
    }
int main(){
int n;
  cin>>n;
  cout<<isPowerofTwo(n)<<"\n";
  
}
