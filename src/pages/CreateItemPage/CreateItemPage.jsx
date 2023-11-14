import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import ajaxMethod from "../../helpers/ajaxMethod";
import spinner from "../../assets/images/spinner.svg";
import styles from "./CreateItemPage.module.sass";

const { REACT_APP_SERVER_HOST } = process.env;

const CreateItemPage = () => {
  const [seed, setSeed] = useState();
  const [time, setTime] = useState();
  const [border, setBorder] = useState(false);
  const [loading, setLoading] = useState(false);
  const { appContext, setAppContext } = useAppContext();
  const { seedState } = appContext;
  const navigate = useNavigate();
  useEffect(() => {
    if (!time) return;
    if (time <= 0) {
      setAppContext({ ...appContext, seedState: false });
      setSeed();
      setTime();
      return;
    };
    const interval = setInterval(() => {
      setTime(time - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  useEffect(() => {
    setAppContext({ ...appContext, nav: navigate });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${REACT_APP_SERVER_HOST}/api/app`
    const text = e.target.text.value;
    if (!text) {
      setTimeout(() => setBorder(false), 300);
      setTimeout(() => setBorder(true), 200);
      setTimeout(() => setBorder(false), 100);
      return setBorder(true);
    };
    setLoading(true);
    const { data } = await ajaxMethod(url, "POST", { text: text });
    if (data.status === "success") {
      setSeed(data.data);
      setTime(data.data.expireAt);
      setLoading(false);
      setAppContext({ ...appContext, seedState: true });
    } else {
      setLoading(false);
    };
  };
  const timeLeft = () => {
    const seconds = (Math.floor(time / 1000) % 60).toString().padStart(2, "0");
    const minutes = Math.floor(time / 1000 / 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  if (seedState) {
    return (
      <form className={styles.container}>
        <div className={styles.inputs}>
          <input type="text" id="seed1" defaultValue={seed.seed1[0]} readOnly />
          <span>{seed.seed1[1]}</span>
        </div>
        <div className={styles.inputs}>
          <input type="text" id="seed2" defaultValue={seed.seed2[0]} readOnly />
          <span>{seed.seed2[1]}</span>
        </div>
        <div className={styles.inputs}>
          <input type="text" id="seed3" defaultValue={seed.seed3[0]} readOnly />
          <span>{seed.seed3[1]}</span>
        </div>
        <p className={styles.text}>recovery seeds</p>
        <input className={styles.button} type="text" value={timeLeft()} onMouseDown={(e) => e.preventDefault()} readOnly />
      </form>
    );
  } else {
    if (loading) {
      return (
        <img src={spinner} className={styles.spinner} alt="spinner loading" />
      );
    } else {
      return (
        <form
          onSubmit={handleSubmit}
          className={styles.containerForm}
        >
          <textarea
            id="text"
            onFocus={() => setBorder(true)}
            onBlur={() => setBorder(false)}
            style={{
              border: (border) ? "3px solid #027ABD" : "none",
              padding: (border) ? "34px 39px" : "37px 42px",
              boxShadow: (border) ? "0px 0px 10px #027ABD" : "none"
            }}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="write a text to save"
          />
          <input type="submit" value="save" />
        </form>
      );
    };
  };
};

export default CreateItemPage;