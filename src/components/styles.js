import { makeStyles } from "@material-ui/core";
const styles = makeStyles({
  frag: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    position: "relative",
  },
  formControl: {
    position: "relative",
    height: "30rem",
    width: "20rem",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "4rem",
    marginBottom: "auto",
    color: "#E4E6EB",
  },
  container: {
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",

    background: "#242526",
    borderRadius: "2rem",
    height: "35rem",
    width: "20rem",
    margin: "auto",
    marginTop: "5rem",
  },
  fieldRow: {
    display: "flex",
    margin: ".4em",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    display: "flex",
    fontSize: "40px",
    marginRight: "10px",
    color: "#E4E6EB",
  },
  fields: {
    marginTop: "4rem",
    marginBottom: "1rem",
  },
  registerFields: {
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  btn: {
    margin: "auto",
    width: "50%",
    borderRadius: "5rem",
    "&:hover": {
      backgroundColor: "#3A3B3C",
    },
    color: "#E4E6EB",
  },
  errors: {
    textAlign: "center",
    color: "#dc3545",
  },
  textField: {
    color: "#E4E6EB",
  },
});
export default styles;
