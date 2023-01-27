import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GlobalState from './GlobalState';
import PersonsBox from './PersonsBox';
import AntiBodyComponent from './AntiBodyComponent';

const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: "justify",
    },

    FormTitle:
    {
      marginTop : "20px",
      marginBottom : "20px",
    },

    packageBox:{
      backgroundColor :  "#fff",
      border: "1px solid #999",
      color: "#555",
      fontWeight: "500",
      fontSize: "1.1rem",
      borderRadius: "4px",
      width: "100%",
      padding: "20px",
      cursor: "pointer",
      transition: "all 0.1s ease-in-out",
      "&:hover": {
        backgroundColor : theme.palette.primary.light,     
      },
    },

    packageBoxDisabled:{
      backgroundColor :  "#fff",
      border: "1px solid #999",
      opacity: "0.7",
      color: "#555",
      fontWeight: "500",
      fontSize: "1.1rem",
      borderRadius: "4px",
      width: "100%",
      padding: "20px",
      cursor: "not-allowed",
      transition: "all 0.1s ease-in-out",
    },


    packageBoxSelected:{
      backgroundColor:  theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.light}`,
      fontWeight: "500",
      fontSize: "1.1rem",
      borderRadius: "4px",
      width: "100%",
      padding: "20px",
      color: "#fff",
      cursor: "pointer",
    },

    pageTitle:{
      color : theme.palette.primary.main,
      marginBottom: "15px"
    }

  }));

  const Packages = [
    // {packageName: 'Enlighten home teeth whitening - £395', isLimited: true},
    {packageName: `Enlighten home and in office teeth whitening`, isLimited: true},
    // {packageName: `In office/laser teeth whitening`, isSpecial: true},
    {packageName: `Invisalign consultation`},
    {packageName: `Emergency Dental Appointment`},    
    {packageName: `Other Treatments`}
  ]

export default function PackageForm() {
    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);

    const [notes, setNotes] = React.useState(state.notes ?? '');

    const notesChanged = (event) =>
    {
        setNotes(event.target.value);
        setState(state => ({...state, notes : event.target.value }));
        setState(state => ({...state, notesError : false }));
    }
    
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    

    const packageClicked = (item) =>
    {
      if (item.packageName === state.package)
      {
        setState({...state, package : "Consultation"});
      }else
      {
        setState({...state, package : item.packageName});
      }
    
    }

  return (
    <React.Fragment>
      <Typography className={classes.pageTitle} variant="h6" gutterBottom>
        Choose your Service
      </Typography>

      <Grid
        container
        spacing={1}
        alignItems="baseline"
        style={{ marginTop: "10px" }}
      >
        {Packages.map((item) => (
          <Grid item xs={12}>
            <div
              className={
                item.packageName === state.package
                  ? classes.packageBoxSelected
                  : item.isSpecial
                  ? classes.packageBoxDisabled
                  : classes.packageBox
              }
              onClick={() => {
                if (!item.isSpecial) {
                  packageClicked(item);
                }
              }}
            >
              {item.packageName}
              {item.isLimited && (
                <div style={{ display: "inline-block", marginLeft: "10px" }}>
                  <span> - </span>
                  {/* <span style={{textDecoration: "line-through", paddingRight:"5px"}}>£695</span> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#ff0000",
                      fontSize: "1.2em",
                    }}
                  >
                    £395
                  </span>
                </div>
              )}
              {item.isLimited && (
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    marginTop: "5px",
                    borderRadius: "10px",
                    backgroundColor: "#eee",
                    color: "#000",
                    fontWeight: "700",
                    padding: "5px",
                    fontSize: "0.7em",
                    border: "1px dotted #ddd",
                  }}
                >
                  Limited Time (First 100 Patients)
                </div>
              )}
              {item.isSpecial && (
                <div style={{ display: "inline-block", marginLeft: "10px" }}>
                  <span> - </span>
                  {/* <span style={{textDecoration: "line-through", paddingRight:"5px"}}>£695</span> */}
                  <span
                    style={{
                      fontWeight: "700",
                      color: "#ff0000",
                      fontSize: "1.2em",
                    }}
                  >
                    £195
                  </span>
                </div>
              )}
              {item.isSpecial && (
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    marginTop: "5px",
                    borderRadius: "5px 30px 30px 5px",
                    backgroundColor: "#dbfff8",
                    color: "#004a3b",
                    fontWeight: "700",
                    padding: "5px 8px",
                    fontSize: "0.85em",
                    border: "1px dotted #00bf99",
                  }}
                >
                  Special Offer
                </div>
              )}
              {item.isSpecial && (
                <div
                  style={{
                    display: "block",
                    marginTop: "5px",
                    borderRadius: "5px",
                    backgroundColor: "orange",
                    color: "#000",
                    fontWeight: "500",
                    padding: "5px 8px",
                    fontSize: "0.85em",
                    border: "1px dotted #eee",
                  }}
                >
                  To book an appointment for this offer please call us at <strong style={{textDecoration:"underline"}}>02071830357</strong>
                </div>
              )}
              
            </div>
          </Grid>
        ))}

        <Grid item xs={12}>
          <TextField
            style={{ marginTop: "10px" }}
            id="notes"
            error={state.notesError}
            fullWidth
            required={state.package === "Other Treatments"}
            label="Others"
            value={notes}
            onChange={notesChanged}
            multiline
            rows={4}
            placeholder="please enter your note here..."
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

