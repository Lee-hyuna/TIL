/**
 *
 * https://app.codility.com/programmers/lessons/4-counting_elements/max_counters/
 *
 * 0부터 시작하는 N개의 카운터가 있습니다
 * 카운터는 두 가지의 연산이 가능합니다.
 *
 * 1. 증가(X): 카운터 X가 1씩 증가한다.
 * 2. 최대 카운터 증가: 카운터 최대값으로 모든 카운터 값 설정
 *
 * M개의 정수로 구성된 배열 A가 주어지며 이배열은 연속된 연산을 나타냅니다.
 *
 * - 1 <= X <= N, A[K] = X면 K는 증가(X) 되고,
 * - A[K] = N + 1이면 K는 최대 카운터 증가됩니다.
 *
 * 예를 들어 N = 5, A = [3, 4, 4, 6, 1, 4, 4]일 때, 각 연산 후 카운터의 값은 다음과 같습니다.
 *
 * (0, 0, 1, 0, 0)
 * (0, 0, 1, 1, 0)
 * (0, 0, 1, 2, 0)
 * (2, 2, 2, 2, 2)
 * (3, 2, 2, 2, 2)
 * (3, 2, 2, 3, 2)
 * (3, 2, 2, 4, 2) -> 최종 return 값
 *
 *
 */

function solution(n, a) {

  var lastMax = 0, max = 0;
  var counter = '0'.repeat(n).split('');

  a.forEach(k, i => {

    i = k -  1;

    if (k < n + 1){
      counter[i] = counter[i] < lastMax ? lastMax : counter[i];
      ++counter[i];
      max = max < counter[i] ? counter[i] : max;
    }
    else {
      lastMax = max;
    }

  });

  return counter.map(n => lastMax > n ? lastMax : n * 1);

}