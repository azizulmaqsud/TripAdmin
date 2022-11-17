import { Box, Button, CircularProgress, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, setVerifyItem, verifyUser } from '../redux/users/usersSlice';
import userImage from "./../assets/images/user.png";
import ViewModal from '../components/common/ViewModal';
import ResetPassword from '../components/ResetPassword';




const VerifyButton = ({ isLoading, children, disabled, verifyHandler }) => {
    return (
        <Box sx={{ position: "relative" }}>
            <Button
                onClick={verifyHandler}
                disabled={disabled}
                sx={{ textTransform: "capitalize", color: "error.main", '&:disabled': { color: "success.main" } }}
            >
                {children}
            </Button>
            {isLoading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: "success.main",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        mt: -1,
                        ml: '-12px',
                    }}
                />
            )}
        </Box>
    )
}

const imageBoxStyle = {
    display: "flex", flexDirection: "column", alignItems: "center", '& img': { width: "100%" }
}


const VerificationBox = ({ isVerifying, currentItem, verificationField, isVerified, email, img }) => {
    const dispatch = useDispatch();
    const verifyHandler = (email, verification, status) => {
        dispatch(verifyUser({ email, verification: { [verification]: status === "verified" } }));
        dispatch(setVerifyItem(verification));
    }
    return (
        <Box sx={imageBoxStyle}>
            <ViewModal action={<img src={img} alt="" />} >
                <Box sx={{ textAlign: "center", pb: 3, '& img': { minHeight: 250, border: "1px solid #ddd", mb: 3 } }}>
                    <img src={img} alt="" />
                    <VerifyButton
                        verifyHandler={() => verifyHandler(email, verificationField, isVerified ? "unverified" : "verified")}
                        isLoading={isVerifying && currentItem === verificationField}>
                        {isVerified ? "Unverified" : "Verify"}
                    </VerifyButton>
                </Box>

            </ViewModal>
            {
                isVerified ?
                    <VerifyButton disabled={true}>
                        Verified
                    </VerifyButton> :
                    <Box sx={{ height: 40 }}></Box>
            }

        </Box>
    )
}




const UserDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { userDetails: user, isLoading } = useSelector(state => state.users);
    const { isVerifying, currentItem } = useSelector(state => state.users.verification);
    const {
        firstName,
        lastName,
        gender,
        dobDay,
        dobMonth,
        dobYear,
        email,
        phoneNumber,
        numberICPassport,
        country,
        verified,
        ic1verified,
        ic2verified,
        dl1verified,
        dl2verified,
        selfieVerified
    } = user || {};

    const fields = {
        "First Name:": firstName,
        "Last Name:": lastName,
        "Gender:": gender,
        "Birthday:": dobDay + "/" + dobMonth + "/" + dobYear,
        "Email:": email,
        "Phone No:": phoneNumber,
        "IC/Passport:": numberICPassport,
        "Country:": country,
        "License No:": "",
        "License Type:": "",
        "Joined Date:": "",
        "Verified:": verified ? "Yes" : "No"
    }

    useEffect(() => {
        dispatch(fetchUserDetails(id));
    }, [id, dispatch]);


    return (
        <>
            {
                isLoading ? <Preloader /> :
                    <>
                        <Paper sx={{ mt: 5, px: 3, py: 2 }} elevation={0}>
                            <Typography variant='h6' color="primary">General Information:</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={1}>
                                {
                                    Object.keys(fields).map(field => (
                                        <Fragment key={field}>
                                            <Grid item md={3} xs={4}>
                                                <Typography><strong>{field}</strong> </Typography>
                                            </Grid>
                                            <Grid item md={9} xs={8}>
                                                <Typography>{fields[field] || "N/A"} </Typography>
                                            </Grid>
                                        </Fragment>
                                    ))
                                }
                            </Grid>
                        </Paper>
                        <Paper sx={{ mt: 3, mb: 5, px: 3, py: 2 }} elevation={0}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant='h6' color="primary">User Documents:</Typography>
                                <ViewModal sx={{ maxWidth: 600 }} title="Reset Password" action={<Button variant='contained' sx={{ color: "#fff", boxShadow: "none" }}>Reset Password</Button>}>
                                    <ResetPassword email={email} />
                                </ViewModal>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={3}>
                                <Grid item md={4} xs={12}>
                                    <Paper variant='outlined' sx={{ p: 2 }}>
                                        <Typography sx={{ textAlign: "center", fontSize: 18 }}>IC/ Passport</Typography>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <VerificationBox
                                                    isVerified={ic1verified}
                                                    isVerifying={isVerifying}
                                                    currentItem={currentItem}
                                                    verificationField="ic1verified"
                                                    img={userImage}
                                                    email={email}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <VerificationBox
                                                    isVerified={ic2verified}
                                                    isVerifying={isVerifying}
                                                    currentItem={currentItem}
                                                    verificationField="ic2verified"
                                                    img={userImage}
                                                    email={email}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Paper variant='outlined' sx={{ p: 2 }}>
                                        <Typography sx={{ textAlign: "center", fontSize: 18 }}>Driver's Licence</Typography>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <VerificationBox
                                                    isVerified={dl1verified}
                                                    isVerifying={isVerifying}
                                                    currentItem={currentItem}
                                                    verificationField="dl1verified"
                                                    img={userImage}
                                                    email={email}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <VerificationBox
                                                    isVerified={dl2verified}
                                                    isVerifying={isVerifying}
                                                    currentItem={currentItem}
                                                    verificationField="dl2verified"
                                                    img={userImage}
                                                    email={email}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <Paper variant='outlined' sx={{ p: 2 }}>
                                        <Typography sx={{ textAlign: "center", fontSize: 18 }}>Selfie</Typography>
                                        <Grid container justifyContent="center" spacing={1}>
                                            <Grid item xs={6}>
                                                <VerificationBox
                                                    isVerified={selfieVerified}
                                                    isVerifying={isVerifying}
                                                    currentItem={currentItem}
                                                    verificationField="selfieVerified"
                                                    img={userImage}
                                                    email={email}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
            }

        </>
    );
};

export default UserDetails;