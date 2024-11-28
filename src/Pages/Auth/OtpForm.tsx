import React, { useRef, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "./OtpForm.css"; // Assuming you save the CSS separately in OtpForm.css
import { useSnackbar } from "../EnqueSnackebar_Comp/snackebar";
import { useNavigate } from "react-router-dom"; // For navigation

const OtpForm = (email: { email: string }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");

  const HandleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!/^[0-9]*$/.test(value)) return;

      setOtp((prevOtp) => {
        const newOtp = prevOtp.split("");
        newOtp[index] = value;
        return newOtp.join("");
      });

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };

  const handlePaste = (e: any) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("Text");

    setOtp(pastedData);

    inputRefs.current[Number(pastedData.length)].focus();
  };

  const handleSubmitOtp = async () => {
    if (otp.length === 4) {
      try {
        const res = await axios.post("https://shoptank-backend.onrender.com/validate-otp", {
          email: email.email,
          otp,
        });
        if (res.status === 200) {
          showSnackbar("OTP Validated Successfully !! Login To Continue");
          setTimeout(() => {
            navigate("/login"); // Redirect to the login page
          }, 3000);
        }
      } catch (error) {
        console.error(error);
        showSnackbar("Invalid OTP");
      }
    }
  };

  return (
    <div className="otpContainer">
      <div className="otp-Form">
        <span className="mainHeading">Enter OTP</span>
        <p className="otpSubheading">
          We have sent a verification code to your Email Address :{" "}
          <h6>{email.email}</h6>
        </p>
        <div className="inputContainer">
          <form autoComplete="off">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 4,
                gap: 2,
              }}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  className="otp-input"
                  variant="outlined"
                  value={otp[index] || ""}
                  onChange={HandleInputChange(index)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                    },
                  }}
                  onPaste={handlePaste}
                />
              ))}
            </Box>

            <Button
              fullWidth
              size="large"
              onClick={handleSubmitOtp}
              variant="contained"
              sx={{ marginBottom: 7 }}
            >
              Verify Email
            </Button>
          </form>
        </div>
        <p className="resendNote">
          Didn't receive the code?{" "}
          <button className="resendBtn">Resend Code</button>
        </p>
      </div>
    </div>
  );
};

export default OtpForm;
