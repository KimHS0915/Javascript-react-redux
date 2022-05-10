import { useEffect, useState } from "react";
import styles from "./Quotes.module.css";

const Quotes = () => {
  const QUOTE_API = process.env.REACT_APP_QUOTE_API;
  const [author, setAuthor] = useState();
  const [content, setContent] = useState();
  const getQuote = async () => {
    const response = await fetch(QUOTE_API);
    const json = await response.json();
    setAuthor(json.author);
    setContent(json.content);
  };
  useEffect(() => {
    getQuote();
  }, []);
  return (
    <div className={styles.quote}>
      <p>
        <span className={styles.content}>{content}</span>
        <span className={styles.author}> - {author}</span>
      </p>
    </div>
  );
};

export default Quotes;
