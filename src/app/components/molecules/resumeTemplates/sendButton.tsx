import Button from "@mui/material/Button";

interface Props {
  onClick: () => void;
  text?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const SendButton = ({
  onClick,
  text = "Send",
  style = {},
  disabled = false,
}: Props) => {
  return (
    <Button
    color="secondary"
      onClick={onClick}
      style={{
        ...style,
        margin: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
      disabled={disabled}
      size="small"
      variant="outlined"
      
    >
      {text}
    </Button>
  );
};

export default SendButton;
