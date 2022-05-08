import { useEffect, useState } from "react";

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
    <div>
      <p>
        {content} - {author}
      </p>
    </div>
  );
};

export default Quotes;
