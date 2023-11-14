import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";
import img5 from "../../assets/images/img5.png";
import styles from "./Resume.module.sass";

const Resume = ({ setOpen }) => {
  return (
    <div className={styles.container}>
      <div onClick={() => setOpen(false)} className={styles.shadow}></div>
      <div onClick={() => setOpen(false)} className={styles.bar}>
        <p>about</p>
      </div>
      <div className={styles.content}>
        <div className={styles.scroll}>
          <p>Hello! Welcome to the web application that will allow you to save text and links temporarily with just 3 keywords or seeds!</p>
          <p>This application is very easy to use, but at the same time, it is useful and powerful.</p>
          <p><span>Here are the instructions for use:</span></p>
          <p><span>Step 1:</span> Enter the text or link that you want to save in the text box that appears on the application's main screen.</p>
          <img src={img1} alt="input text" />
          <p><span>Step 2:</span> Click on the "Save" button to save the text or link.</p>
          <img src={img2} alt="save" />
          <p><span>Step 3:</span> The application will provide you with three keywords or seeds so that you can retrieve the text or link later. Make sure to write down or memorize these keywords or seeds as they are necessary to retrieve the text or link.</p>
          <img src={img3} alt="seed keys" />
          <p><span>Step 4:</span> Now you can close the application or switch devices. The text or link will be stored temporarily for 10 minutes and then will be permanently deleted.</p>
          <img src={img4} alt="timer" />
          <p><span>Step 5:</span> To retrieve the text or link, access the application's website again and enter the three keywords or seeds that were provided to you when you saved the text or link. Click on the "Open" button and the text or link will be displayed on the screen.</p>
          <img src={img5} alt="seed inputs" />
          <p>We hope that these instructions are clear and help you to use the application.</p>
          <p>Remember that this application is an easy and quick solution to save text or links temporarily and to access them from any device with an internet connection.</p>
          <p>Enjoy the application!</p>
        </div>
      </div>
    </div>
  );
};

export default Resume;
