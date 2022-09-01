import { Card } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import PageLayout from "../../components/pageLayout/pageLayout";

function Upload() {
    const [video, setVideo] = useState({});

    function save() {
        axios.post(``).then(res => {

        })
    }

    return(
        <PageLayout>
            <Card>

            </Card>
        </PageLayout>
    )
}

export default Upload;