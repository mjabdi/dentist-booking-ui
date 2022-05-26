import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GlobalState from "./GlobalState";
import PaymentForm from "./PaymentForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import dateformat from "dateformat";
import { Backdrop } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Stripe from "./StripeContainer";
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "justify",
  },

  FormTitle: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
    minWidth: "320px"
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  boxTitle: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "10px",
    top: -20,
    left: 10,
    color: theme.palette.primary.main,
    fontWeight: "500",
  },

  boxTime: {
    backgroundColor: "#fff",
    border: `1px solid #ddd`,
    borderRadius: "5px",
    color: "#333",
    padding: "30px 5px",
    textAlign: "left",
    marginTop: "20px",
    position: "relative",
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },

  infoBox: {
    width: "100%",
    textAlign: "left",
    fontSize: "0.9rem",
    fontWeight: "500",
    padding:"5px 20px",
    borderRadius:"8px",
    border: "1px solid #eee",
    backgroundColor: "#008571",
    color:"#fff"
  },

}));

export default function SinglePayForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [loaded, setLoaded] = React.useState(false);
  const [submiting, setSubmitting] = React.useState(false);

  const [personInfo, setPersonInfo] = React.useState(null);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPersonInfo();
  }, []);

  const loadPersonInfo = () => {
    let referrer = window.location.pathname;
    if (referrer && referrer.startsWith("/id")) {
      referrer = "/";
    }

    setPersonInfo({...state.booking});
    setLoaded(true)
  };


  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>


      <Typography
        className={classes.pageTitle}
        variant="h6"
        gutterBottom
        style={{ marginBottom: "30px" }}
      >
        Pay Deposit - £50.00
      </Typography>

      {(!loaded || !personInfo) && (
        <React.Fragment>
          {" "}
          <CircularProgress color="primary" />
        </React.Fragment>
      )}

      {personInfo && (
        <div hidden={!loaded}>

          <div>

            <Alert severity="info" style={{marginBottom:"15px", fontSize:"0.95rem" ,lineHeight:"1.5rem", textAlign:"justify"}}>
              This is the deposit to secure your appointment, you can cancel anytime up-to 2 business days notice  of your appointment

            </Alert>

          </div>
          
          <div className={classes.infoBox}>
            <p> Hello <strong>{`${state.booking.fullname.toUpperCase()},`} </strong></p>
            <p> Please pay the £50 deposit to secure your appointment with the Dental Clinic.</p>

          </div>

          <div className={classes.boxTime}>
          <div className={classes.boxTitle}>Card Info</div>

            <Stripe/>
          </div>

        
        </div>
      )}

      <Backdrop className={classes.backdrop} open={submiting}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
          <Grid item>
            <span style={{ textAlign: "center", color: "#fff" }}>
              {" "}
              Please wait ...{" "}
            </span>
          </Grid>
        </Grid>
      </Backdrop>

      </Paper>
      </main>
    </React.Fragment>
  );
}
