import Navigation from "../Navigation/Navigation";

function ErrorPage() {
    return (
        <>
            <Navigation title="Stock"></Navigation>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "6rem",
                }}
            >
                Error 404! Page not found
            </div>
        </>
    );
}

export default ErrorPage;
