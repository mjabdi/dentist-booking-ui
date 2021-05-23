import "./App.css";
import Checkout from "./checkout";
import WelcomeForm from "./WelcomeForm";
import AgreementForm from "./AgreementForm";
import GlobalState from "./GlobalState";
import React, { useEffect } from "react";
import BookService from "./services/BookService";
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";
import PaymentAlreadyDone from "./PaymentAlreadyDone";
import SinglePayForm from "./SinglePayForm";
import PaymentSuccessForm from "./PaymentSuccessForm";

const getPathId = () => {
  let urlElements = window.location.pathname.split("/");
  if (urlElements.length === 4) {
    if (urlElements[2].startsWith("pay")){
      return urlElements[3]
    } 
  }
  return null;
};

function App() {
  const [state, setState] = React.useState({
    activeStep: 0,
    bookingDate: null,
    persons: [],
  });

  useEffect(() => {
    const bookingId = getPathId();
    if (bookingId) {
      BookService.getBookingById(bookingId)
        .then((res) => {
          if (res) {
            const booking = res.data;
            setState((state) => ({...state, booking: booking, loaded: true }));
          }
        })
        .catch((err) => {
          setState((state) => ({...state, booking: null, loaded: true }));
          console.error(err);
        });
    }
  }, []);

  return (
    <GlobalState.Provider value={[state, setState]}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <div className="App">

          {!getPathId() && (
            <Checkout />
          )}

          {getPathId() && !state.loaded && (
            <div> loading... </div>
          )}

          {getPathId() && state.loaded && state.booking && !state.booking.paymentInfo && !state.paymentSuccess && (
            <SinglePayForm/>
          )}

          {getPathId() && state.loaded && state.booking && !state.booking.paymentInfo && state.paymentSuccess && (
            <PaymentSuccessForm/>
          )}


          {getPathId() && state.loaded && state.booking && state.booking.paymentInfo && (
            <PaymentAlreadyDone/>
          )}


          {getPathId() && state.loaded && !state.booking && (
            <div> Invalid or Expired Link! </div>
          )}
          
        </div>
      </MuiThemeProvider>
    </GlobalState.Provider>
  );
}

export default App;
