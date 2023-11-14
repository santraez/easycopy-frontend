import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import seedList from "./seeds.json";
import styles from "./StartItemPage.module.sass";

const StartItemPage = () => {
  const [seedFound, setSeedFound] = useState({ seed1: "🌱", seed2: "🌱", seed3: "🌱"});
  const [seed1, setSeed1] = useState("");
  const [seed2, setSeed2] = useState("");
  const [seed3, setSeed3] = useState("");
  const [border, setBorder] = useState({ seed1: false, seed2: false, seed3: false });
  const { appContext, setAppContext } = useAppContext();
  const navigate = useNavigate();
  const { seeds } = seedList
  useEffect(() => {
    setAppContext({ ...appContext, nav: navigate });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const seed1 = event.target.seed1.value;
    const seed2 = event.target.seed2.value;
    const seed3 = event.target.seed3.value;
    const seedKey = seed1 + seed2 + seed3;
    if (seed1 && seed2 && seed3 && seedFound.seed1 !== "🌱" && seedFound.seed1 !== "" && seedFound.seed2 !== "🌱" && seedFound.seed2 !== "" && seedFound.seed3 !== "🌱" && seedFound.seed3 !== "") {
      navigate(`/open/${seedKey}`);
    } else {
      setTimeout(() => setBorder({ seed1: false, seed2: false, seed3: false }), 300);
      setTimeout(() => {
        setBorder({
          seed1: (seedFound.seed1 === "🌱" || seedFound.seed1 === "") ? true : false,
          seed2: (seedFound.seed2 === "🌱" || seedFound.seed2 === "") ? true : false,
          seed3: (seedFound.seed3 === "🌱" || seedFound.seed3 === "") ? true : false,
        });
      }, 200);
      setTimeout(() => setBorder({ seed1: false, seed2: false, seed3: false }), 100);
      return setBorder({
        seed1: (seedFound.seed1 === "🌱" || seedFound.seed1 === "") ? true : false,
        seed2: (seedFound.seed2 === "🌱" || seedFound.seed2 === "") ? true : false,
        seed3: (seedFound.seed3 === "🌱" || seedFound.seed3 === "") ? true : false,
      });
    };
  };
  const handleSeed1 = (e) => {
    const value = e.target.value.toLowerCase().trim().replace(/\s+/g, "");
    setSeed1(value);
    const found = seeds.find((item) => item[0] === value);
    if (found) {
      return setSeedFound({ ...seedFound, seed1: [found[1]] });
    };
    return setSeedFound({ ...seedFound, seed1: ""});
  }

  const handleSeed2 = (e) => {
    const value = e.target.value.toLowerCase().trim().replace(/\s+/g, "");
    setSeed2(value);
    const found = seeds.find((item) => item[0] === value);
    if (found) {
      return setSeedFound({ ...seedFound, seed2: [found[1]] });
    };
    return setSeedFound({ ...seedFound, seed2: ""});
  }

  const handleSeed3 = (e) => {
    const value = e.target.value.toLowerCase().trim().replace(/\s+/g, "");
    setSeed3(value);
    const found = seeds.find((item) => item[0] === value);
    if (found) {
      return setSeedFound({ ...seedFound, seed3: [found[1]] });
    };
    return setSeedFound({ ...seedFound, seed3: ""});
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div
        onFocus={() => setBorder({ ...border, seed1: true})}
        onBlur={() => {
          setBorder({ seed1: false, seed2: false, seed3: false });
          if (seedFound.seed1 === "" && seed1 === "") {
            setSeedFound({ ...seedFound, seed1: "🌱" });
          };
        }}
        style={{
          border: (border.seed1) ? "2px solid #D907FB" : "none",
          padding: (border.seed1) ? "0 23px" : "0 25px",
          boxShadow: (border.seed1) ? "0 0 5px #D907FB" : "none"
        }}
        className={styles.inputs}
      >
        <input
          type="text"
          id="seed1"
          onChange={handleSeed1}
          value={seed1}
          maxLength="10"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          placeholder="seed 1"
        />
        <span>{seedFound.seed1}</span>
      </div>
      <div
        onFocus={() => setBorder({ ...border, seed2: true})}
        onBlur={() => {
          setBorder({ seed1: false, seed2: false, seed3: false });
          if (seedFound.seed2 === "" && seed2 === "") {
            setSeedFound({ ...seedFound, seed2: "🌱" });
          };
        }}
        style={{
          border: (border.seed2) ? "2px solid #D907FB" : "none",
          padding: (border.seed2) ? "0 23px" : "0 25px",
          boxShadow: (border.seed2) ? "0 0 5px #D907FB" : "none"
        }}
        className={styles.inputs}
      >
        <input
          type="text"
          id="seed2"
          onChange={handleSeed2}
          value={seed2}
          maxLength="10"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          placeholder="seed 2"
        />
        <span>{seedFound.seed2}</span>
      </div>
      <div
        onFocus={() => setBorder({ ...border, seed3: true})}
        onBlur={() => {
          setBorder({ seed1: false, seed2: false, seed3: false });
          if (seedFound.seed3 === "" && seed3 === "") {
            setSeedFound({ ...seedFound, seed3: "🌱" });
          };
        }}
        style={{
          border: (border.seed3) ? "2px solid #D907FB" : "none",
          padding: (border.seed3) ? "0 23px" : "0 25px",
          boxShadow: (border.seed3) ? "0 0 5px #D907FB" : "none"
        }}
        className={styles.inputs}
      >
        <input
          type="text"
          id="seed3"
          onChange={handleSeed3}
          value={seed3}
          maxLength="10"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          placeholder="seed 3"
        />
        <span>{seedFound.seed3}</span>
      </div>
      <p className={styles.text}>write without accents</p>
      <input className={styles.button} type="submit" value="open" />
    </form>
  );
};

export default StartItemPage;