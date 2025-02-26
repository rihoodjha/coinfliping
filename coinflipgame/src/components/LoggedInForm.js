import TextField from "@mui/material/TextField";

export default function LogingForm(props) {
  return (
    <div>
      <div>
        <TextField
          id={"player" + props.id + "name"}
          name={"player" + props.id + "name"}
          label={props.label}
          defaultValue={props.name}
          helperText={props.helpertext}
          variant="filled"
          onChange={props.onChange}
          required
        />
      </div>
    </div>
  );
}
