import { useEffect, useState } from "react";

const CoinTracker = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [info, setInfo] = useState([]);
  const onChangeMoney = (event) => {
    if (!event.target.value) {
      return setMoney(0);
    }
    setMoney(event.target.value);
  };
  const onChangeCoinInfo = (event) => {
    setInfo(event.target.value.split(","));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=20")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coin Tracker {loading ? "" : `(${coins.length} coins)`}</h1>
      <div>
        <input value={money} id="USD" type="number" onChange={onChangeMoney} />
        <label htmlFor="USD">USD</label>
        <span>
          {info[1] ? ` : ${money / parseFloat(info[1])} ${info[0]}` : null}
        </span>
      </div>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeCoinInfo}>
          <option>Select</option>
          {coins.map((coin, index) => (
            <option key={index} value={[coin.symbol, coin.quotes.USD.price]}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CoinTracker;
