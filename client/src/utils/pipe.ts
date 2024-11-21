type Nullable<T> = T | null | undefined | void;

/**
 * 여러 함수를 순차적으로 실행하는 파이프 함수
 * 각 함수는 이전 함수의 반환값을 입력으로 받음
 * null/undefined/void를 반환하면 이전 값을 유지
 */
export const pipe =
  <T>(...fns: Array<(arg: T) => Nullable<T>>) =>
  (value: T): T =>
    fns.reduce((result, fn) => fn(result) ?? result, value);
