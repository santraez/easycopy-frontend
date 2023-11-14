import { useState } from "react";
import AppRouter from "../../routes/AppRouter";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SideButton } from "../../components/SideButton";
import { About } from "../../components/About";
import { Resume } from "../../components/Resume";
import useScreenSize from "../../hooks/useScreenSize";
import styles from "./HomePage.module.sass";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const { width } = useScreenSize();
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SideButton />
        <div className={styles.content}>
          <Header />
          <AppRouter />
          {(width >= 480) && <Footer />}
        </div>
        {(width >= 480) && <About setOpen={setOpen} />}
      </div>
      {(width < 480) && <Footer />}
      {(width < 480) && <About setOpen={setOpen} />}
      {(open) && <div className={styles.shadow}></div>}
      {
        (open) && (
          <div className={styles.resume}>
            <Resume setOpen={setOpen} />
          </div>
        )
      }
    </div>
  );
};

export default HomePage;