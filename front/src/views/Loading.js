import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "25vh",
                }}
            >
                <Spinner
                    animation="grow"
                    variant="primary"
                    style={{
                        width: "10vh",
                        height: "10vh",
                        marginTop: "15vh",
                    }}
                />

                <div
                    style={{
                        margin: "5vh",
                        justifyContent: "center",
                        fontSize: "3.5vh",
                        color: "#6c757d",
                    }}
                >
                    Loading
                </div>
            </div>
        </>
    );
}

export default Loading;
