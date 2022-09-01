import { KeyboardBackspace } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageLayout from "../../components/pageLayout/pageLayout";

function OpenVideo() {
    const [video, setVideo] = useState({});

    useEffect(() => {

    }, [])

    return (
        <PageLayout>
            <Button
                component='a'
                href='/videos'
                startIcon={<KeyboardBackspace />}
            >
                back to vidoes
            </Button>
        </PageLayout>
    )

}

export default OpenVideo;