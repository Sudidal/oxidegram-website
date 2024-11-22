import { useRef, useEffect } from "react";
import classes from "./phone.module.css";

function Phone() {
  const shiftRef = useRef(null);
  const count = useRef(0);

  useEffect(() => {
    if(shiftRef.current) {
      const cur = shiftRef.current.children[count.current];
      cur.style.opacity = 1
    }
    const id = setInterval(() => {
      if (shiftRef.current) {
        const prev = shiftRef.current.children[count.current - 1];
        if (count.current >= shiftRef.current.children.length) {
          count.current = 0;
        }
        const cur = shiftRef.current.children[count.current];
        if (prev) {
          prev.style.opacity = 0;
        }
        cur.style.opacity = 1;
        count.current++;
      }
    }, 4000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <img className={classes.frame} src="/photos/phone.png" alt="" />
      </div>
      <div ref={shiftRef} className={classes.shift}>
        <img src="/photos/screen-1.png" alt="" />
        <img src="/photos/screen-2.png" alt="" />
        <img src="/photos/screen-3.png" alt="" />
        <img src="/photos/screen-4.png" alt="" />
      </div>
    </div>
  );
}

export default Phone;
