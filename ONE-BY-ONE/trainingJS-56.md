# Training JS #56:

뉴클레오티드는 A,C,G,T 문자로 표현되며, 각 뉴클레오티드는 1,2,3,4의 값을 갖습니다.

DNA 서열은 N개의 뉴클레오티드로 구성된 문자열 S = s[0] ~ s[N-1]로 구성되어 있습니다.

배열 P와 Q에는 M개의 정수로 구성된 M개의 쿼리가 있습니다.
 
K번째(0 <= K <= M)는 S[P[K]] ~ S[Q[K]] 사이의 최소 뉴클레오티드 값을 찾아야 합니다.
 
예를 들어 `S = 'CAGCCTA', P = [2, 5, 0], Q = [4, 5, 6]`일 때,
 
- S[P[0]] ~ S[Q[0]] 사이의 뉴클레오티드는 G, C, C 이므로, 최소 값은 2 입니다.
- S[P[1]] ~ S[Q[1]] 사이의 뉴클레오티드는 T 이므로, 최소 값은 4 입니다.
- S[P[2]] ~ S[Q[2]] 사이의 뉴클레오티드는 모든 뉴클레오티드를 포함하고 있으므로, 최소 값은 1 입니다.
 
따라서 [2, 4, 1] 을 반환합니다.



## My solution

```js
function solution(S, P, Q) {

    var A = [0], C = [0], G = [0];

    S.split('').map((char, i) => {
        var a = A[i], c = C[i], g = G[i];

        switch(char){
            case 'A' : a++; break;
            case 'C' : c++; break;
            case 'G' : g++; break;
        }

        A.push(a);
        C.push(c);
        G.push(g);

    });

    var result = [];

    for (var i = 0; i < P.length; ++i){

        var pi = P[i], qi = Q[i]+1;

        if (A[pi] !== A[qi]){
            result.push(1);
        }
        else if (C[pi] !== C[qi]){
            result.push(2);
        }
        else if (G[pi] !== G[qi]){
            result.push(3);
        }
        else {
            result.push(4);
        }

    }

    return result;
}
```
