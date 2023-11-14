import styles from "./About.module.sass";

const About = ({ setOpen }) => {
  return (
    <div onClick={() => setOpen(true)} className={styles.container}>
      <p>about</p>
    </div>
  );
};

export default About;
