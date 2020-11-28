import { useEffect, useRef } from "react";

export default function usePrevious(value: any) {
  const ref = useRef();
  // console.log(ref)
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}