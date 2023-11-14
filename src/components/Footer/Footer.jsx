import styles from "./Footer.module.sass";

const Footer = () => {
  const update = new Date().getFullYear();
  
  return (
    <div className={styles.container}>
      <p>
        <span>&copy;</span>
        {` Copyright ${update} `}
      </p>
    </div>
  );
};

export default Footer;