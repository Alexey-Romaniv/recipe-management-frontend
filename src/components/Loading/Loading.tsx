import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

export const Loading = () => {
    return <Backdrop open={true} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}} onClick={e => e.stopPropagation()}>
        <CircularProgress size={100} color="primary"/>
    </Backdrop>
}