import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import ajaxMethod from "../../helpers/ajaxMethod";
import spinner from "../../assets/images/spinner.svg";
import styles from "./ReadItemPage.module.sass";

const { REACT_APP_SERVER_HOST } = process.env;

const ReadItemPage = () => {
  const [text, setText] = useState();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { seedKey } = useParams();
  const { appContext, setAppContext } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const url = `${REACT_APP_SERVER_HOST}/api/app/${seedKey}`;
      const { data } = await ajaxMethod(url, "GET");
      if (data.status === "success") {
        setText(data.data.text);
        setTime(data.data.expireAt);
        setLoading(false);
      } else {
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      };
    })();
  }, [seedKey]);
  useEffect(() => {
    if (!time) return;
    if (time <= 0) {
      setTime();
      setText("Text not found");
      return navigate("/");
    };
    const interval = setInterval(() => {
      setTime(time - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  useEffect(() => {
    setAppContext({ ...appContext, nav: navigate });
  }, []);
  const timeLeft = () => {
    if (!time) return;
    const seconds = (Math.floor(time / 1000) % 60).toString().padStart(2, "0");
    const minutes = (Math.floor(time / 1000 / 60) % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  if (loading) {
    return (
      <img src={spinner} className={styles.spinner} alt="spinner loading" />
    );
  } else {
    if (text) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <textarea value={text} readOnly></textarea>
            <div className={styles.buttons}>
              <button onClick={handleCopy}>copy</button>
              <p className={(copied) ? styles.enable : styles.disable}>copied 😉</p>
            </div>
          </div>
          <p>expire at: <span>{timeLeft()}</span></p>
        </div>
      );
    } else {
      return (
        <p className={styles.alert}>Not found 😖</p>
      );
    };
  };
};

export default ReadItemPage;