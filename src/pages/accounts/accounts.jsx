import { useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer.jsx";
import classes from "./accounts.module.css";

function Accounts() {
  const shiftRef = useRef(null);
  const count = useRef(0);

  useEffect(() => {
    if (shiftRef.current) {
      const cur = shiftRef.current.children[count.current];
      cur.style.opacity = 1;
      count.current++;
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
      count.current = 0;
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div className={classes.left}>
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
        <div className={classes.right}>
          <Outlet />
          <div className={classes.download}>
            Get the app.
            <div className={classes.icons}>
              <img src="/icons/appStore.png" alt="" />
              <img src="/icons/googlePlay.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Accounts;
