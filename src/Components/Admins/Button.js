const Button = ({ onclick, setStyle, text }) => {
  return (
    <button onClick={onclick} className={setStyle}>
      {text}
    </button>
  );
};

export default Button;
