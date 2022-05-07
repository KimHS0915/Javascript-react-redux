import { useEffect, useState } from "react";

const Quotes = () => {
  const [author, setAuthor] = useState();
  const [content, setContent] = useState();
  const getQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
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
