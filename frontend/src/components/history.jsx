import Header from "./header";

function History({theme,setTheme}){
    return(
        <div className="history">
            <Header theme={theme} setTheme={setTheme} />
        </div>
    );
}

export default History