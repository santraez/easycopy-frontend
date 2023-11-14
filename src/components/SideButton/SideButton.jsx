import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./SideButton.module.sass";

const SideButton = () => {
  const { appContext, setAppContext } = useAppContext();
  const { nav } = appContext;
  const [currentPath, setCurrentPath] = useState();
  const [selected, setSelected] = useState();
  useEffect(() => {
    const updateCurrentPath = () => setCurrentPath(window.location.pathname);
    updateCurrentPath();
    window.addEventListener("popstate", updateCurrentPath);
    return () => {
      window.removeEventListener("popstate", updateCurrentPath);
    };
  }, [window.location.pathname]);
  useEffect(() => {
    if (currentPath === "/") {
      setSelected("open");
    } else if (currentPath === "/save") {
      setSelected("save");
    } else {
      setSelected("open");
    };
  }, [currentPath]);
  const handleOpen = () => {
    nav("/");
  };
  const handleSave = () => {
    setAppContext({ ...appContext, seedState: false });
    nav("/save");
  };
  return (
    <div className={styles.container}>
      <div
        onClick={handleOpen}    
        className={(selected === "open") ? styles.enable : styles.disable}
      >
        <p>open</p>
      </div>
      <div
        onClick={handleSave}
        className={(selected === "save") ? styles.enable : styles.disable}
      >
        <p>save</p>
      </div>
      {/* <div style={{ justifyContent: (selected === "open") ? "flex-start" : "flex-end" }} className={styles.toggle}>
        <div className={styles.circle}></div>
      </div> */}
    </div>
  );
};

export default SideButton;
